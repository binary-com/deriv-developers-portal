var DEFAULT_APP_ID = 11780;
var DEFAULT_API_URL = "frontend.binaryws.com";
var DEFAULT_LANGUAGE = "EN";
var DEFAULT_BRAND = "deriv";
var VALID_LABELS = ["beta", "deprecated"];
var CODE_SAMPLES = ["ticks", "balance", "proposal", "buy-contract", "keep-alive"];

var api;
var $console;
var anchor_shift = 100;


// SLIDER

var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

function slide(wrapper, items, prev, next) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
  
  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded');
  
  // Mouse events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);
  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
      }
    };
    
    allowShift = false;
  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    
    allowShift = true;
  }
}
function runSliderOnHomepage() {
  if (window.location.pathname === "/") {
    slide(slider, sliderItems, prev, next);
  }
}

runSliderOnHomepage()

// Add paths with same names as keys for fallback
require.config({
  baseUrl: getBaseUrl(),
  path: {
    "/docson/docson": "/docson/docson.js",
    "/lib/binary-live-api": "/lib/binary-live-api.js",
    "/lib/handlebars": "/lib/handlebars.min.js",
    "/lib/highlight": "/lib/highlight.min.js",
    "/lib/jquery": "/lib/jquery.js",
    "/lib/jsonpointer": "/lib/jsonpointer.js",
    "/lib/marked": "/lib/marked.min.js",
    "/lib/rainbow": "/lib/rainbow.min.js",
    "/lib/select2.min": "/lib/select2.min.js",
    "/lib/traverse": "/lib/traverse.min.js",
  },
});

require(["/lib/jquery.js"], function () {
  require(["/docson/docson.js", "/lib/select2.min.js"], init);
});

function init(docson) {
  $console = $("#playground-console");

  docson.templateBaseUrl = "/docson";

  $("[data-schema]").each(function () {
    var $this = $(this);
    loadAndDisplaySchema($this, $this.attr("data-schema"));
  });

  addEventListeners();
  endpointNotification();
  initEndpoint();
  CODE_SAMPLES.forEach(el=> showDemoForLanguage("javascript", el));
  updateApiDisplayed();
  $("#api-token").val(sessionStorage.getItem("token"));
  $("#playground").addClass(localStorage.getItem("console.theme"));
}

// -------------------------------
// ===== Connection Handling =====
// -------------------------------
function initConnection(language) {
  if (api && api.disconnect) {
    api.disconnect();
  }

  var LiveApi = window["binary-live-api"].LiveApi;
  api = new LiveApi({
    apiUrl: "wss://" + getServerUrl() + "/websockets/v3",
    language: getLanguage(),
    appId: getAppId(),
    brand: getBrand(),
  });

  api.socket.onopen = function (e) {
    api.onOpen.apply(api, e);
  };

  api.socket.onclose = function (e) {
    console.log("connection closed."); // intended to help developers, not debugging
  };

  api.events.on("*", incomingMessageHandler);
}

function sendRequest(json) {
  if (!api) {
    initConnection();
  }

  var lang = getLanguage();
  if (api.language !== lang) {
    api.changeLanguage(lang);
  }

  if (
    api.socket.readyState === api.socket.CLOSED ||
    api.socket.readyState === api.socket.CLOSING
  ) {
    api.connect();
  }

  api.sendRaw(json);
}

function incomingMessageHandler(json) {
  var authorizationError = !!(
      json.error && json.error.code === "AuthorizationRequired"
    ),
    prettyJson = getFormattedJsonStr(json);
  console.log(json); // intended to help developers, not for debugging, do not remove
  $(".progress").remove();
  appendToConsoleAndScrollIntoView(prettyJson);
  $("#unauthorized-error").toggle(authorizationError);
  if (!json.error) handleApplicationsResponse(json);
}

// --------------------------
// ===== API Playground =====
// --------------------------
function updateApiDisplayed() {
  $('.sidebar-left a[href="' + window.location.pathname + '"]')
    .parent()
    .addClass("selected");
  var $apiCallSelector = $("#api-call-selector");
  if ($apiCallSelector.length === 0) return;

  var apiToDisplay = getCurrentApi();
  if (apiToDisplay) {
    $apiCallSelector.val(apiToDisplay).change();
  }
}

function getCurrentApi() {
  var apiPageStrIdx = window.location.href.indexOf("/#");

  if (!~apiPageStrIdx) return "";

  return window.location.href.substr(apiPageStrIdx + 2);
}

function updatePlaygroundWithRequestAndResponse() {
  try {
    var json = JSON.parse($("#playground-request").val());
  } catch (err) {
    alert("Invalid JSON!");
    return;
  }

  appendToConsoleAndScrollIntoView(
    '<pre class="req">' +
      jsonToPretty(json) +
      "</pre>" +
      '<div class="progress"></div>'
  );
  sendRequest(json);
}

function getJsonPaths(method_name) {
  url_path = getBaseUrl() + "config/v3/" + method_name + "/";
  return {
    send: url_path + "send.json",
    receive: url_path + "receive.json",
    example: url_path + "example.json",
  };
}

function jsonToPretty(json, offset) {
  var spaces = function (n) {
    return new Array(n + 1).join(" ");
  };

  var span = function (val, className) {
    return '<span class="' + className + '">' + escapeHtml(val) + "</span>";
  };

  var valToStr = function (val, offset) {
    if (typeof val === "string") {
      return span('"' + val + '"', "string");
    } else if (typeof val === "number") {
      return span(val, "number");
    } else if (Array.isArray(val)) {
      var elements = val
        .map(function (val) {
          return spaces(offset + 2) + valToStr(val, offset + 2);
        })
        .join(",\n");
      return "[\n" + elements + "\n" + spaces(offset) + "]";
    } else if (typeof val === "boolean") {
      return span(val, "boolean");
    } else {
      return objToStr(val, offset);
    }
  };

  var propsToStr = function (obj, offset) {
    var keyStr = Object.keys(obj).map(function (key) {
      return (
        spaces(offset) +
        span('"' + key + '"', "key") +
        ": " +
        valToStr(obj[key], offset)
      );
    });
    return keyStr.join(",\n");
  };

  var objToStr = function (obj, offset) {
    if (!obj || Object.keys(obj).length === 0) return "{}";
    return "{\n" + propsToStr(obj, offset + 2) + "\n" + spaces(offset) + "}";
  };

  return objToStr(json, offset || 0);
}

function getFormattedJsonStr(json) {
  if (typeof json === "string") {
    json = JSON.parse(json);
  }
  return (
    (json.error ? '<pre class="error">' : "<pre>") +
    jsonToPretty(json) +
    "</pre>"
  );
}

function sortRequiredFirst(schema, method_name) {
  if ((schema.required || []).length) {
    var req_obj = {};

    // Method name first, then Required properties
    if (schema.properties[method_name]) {
      req_obj[method_name] = schema.properties[method_name];
    }

    schema.required
      .filter(function (prop) {
        return prop !== method_name;
      })
      .sort(function (a, b) {
        return a.localeCompare(b);
      })
      .forEach(function (prop) {
        req_obj[prop] = schema.properties[prop];
      });

    schema.properties = Object.assign(req_obj, schema.properties);
  }
}

function loadAndDisplaySchema($node, schema_url, method_name, required_first) {
  $.get(schema_url, function (schema) {
    if (required_first) sortRequiredFirst(schema, method_name);

    docson.doc($node, schema, null, getBaseUrl());

    setTimeout(function () {
      $node.removeClass("labeled " + VALID_LABELS.join(" "));
      var label = VALID_LABELS.find(function (lbl) {
        return schema[lbl];
      });
      if (label) {
        $node.addClass("labeled " + label);
      }

      linkToCallName();
    }, 100);
  });
}

function loadAndEditJson($node, jsonUrl) {
  $.get(jsonUrl, function (exampleJson) {
    $node.val(JSON.stringify(exampleJson, null, 2));
  });
}

function customMatcher(params, data) {
  var search_term = (params.term || "").trim();

  if (!search_term) {
    return data;
  }

  if (typeof data.children === "undefined") {
    return null;
  }

  var regexp = new RegExp(search_term, "i");
  var filtered_children = data.children.filter(function (child) {
    return regexp.test([child.text, child.id]);
  });

  if (filtered_children.length) {
    var modified_data = $.extend({}, data, true);
    modified_data.children = filtered_children;
    return modified_data;
  }

  return null;
}

function linkToCallName() {
  $(".docson .desc code").each(function () {
    var value = $(this).text();
    if ($('#api-call-selector option[value="' + value + '"]').length) {
      $(this).replaceWith(
        $("<a/>", { href: "#" + value, html: $(this)[0].outerHTML })
      );
    }
  });
}

// --------------------
// ===== Endpoint =====
// --------------------
function initEndpoint() {
  if (!/\/endpoint/i.test(window.location.href)) return;

  showEndpointParams();
  setEndpointValues();

  $("#endpoint_btn-set").on("click", function (e) {
    e.preventDefault();
    setEndpointValues();
  });

  $("#endpoint_btn-reset").on("click", setEndpoint);
}

function addEndpointAPIEventListeners() {
  api.socket.onopen = function (e) {
    $("#endpoint_connecting").hide();
    $("#endpoint_api-url").html(api.socket.url);
    $("#endpoint_connected").show();
    api.disconnect(); // because connected only for testing the new endpoint, the connection is not used here
  };

  api.socket.onerror = function () {
    $("#endpoint_connecting").hide();
    $("#endpoint_error").show();
    api = undefined;
  };
}

function showEndpointParams() {
  $("#endpoint_txt-url").val(getServerUrl());
  $("#endpoint_txt-appid").val(getAppId());
  $("#endpoint_ddl-brand").val(getBrand());
}

function setEndpointValues() {
  setEndpoint(
    $("#endpoint_txt-url").val(),
    $("#endpoint_txt-appid").val(),
    $("#endpoint_ddl-brand").val()
  );
}

function setEndpoint(server_url, app_id, brand) {
  $("#endpoint_connecting").show();
  $("#endpoint_connected").hide();
  $("#endpoint_error").hide();

  if (server_url && app_id) {
    localStorage.setItem("config.server_url", server_url);
    localStorage.setItem("config.app_id", app_id);
    localStorage.setItem("config.brand", brand);
  } else {
    localStorage.removeItem("config.server_url");
    localStorage.removeItem("config.app_id");
    localStorage.removeItem("config.brand");
  }

  showEndpointParams();
  endpointNotification();
  initConnection();
  addEndpointAPIEventListeners();
}

// -----------------------------
// ===== General Functions =====
// -----------------------------
function isLocal(url) {
  return /\/\/(localhost|127\.0\.0\.1)/.test(url);
}

function isProduction(url) {
  return (
    url &&
    (/(api\.deriv\.com|binary\.sx)/i.test(url) ||
      /(staging-api\.deriv\.com)/i.test(url))
  );
}


function getBaseUrl(url) {
  url = url || document.location.href;
  return (
    (isProduction(url) || isLocal(url) ? "" : "/" + url.split("/")[3]) + "/"
  );
}

function getServerUrl() {
  return window.localStorage.getItem("config.server_url") || DEFAULT_API_URL;
}

function getAppId() {
  return window.localStorage.getItem("config.app_id") || DEFAULT_APP_ID;
}

function getBrand() {
  return window.localStorage.getItem("config.brand") || DEFAULT_BRAND;
}

function getLanguage() {
  return $("#api-language-selector").val() || DEFAULT_LANGUAGE;
}

function escapeHtml(unsafe) {
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function trim(str) {
  return (str || "").trim();
}

function endpointNotification() {
  var end_note = document.getElementById("end-note");
  if (end_note) {
    var server = getServerUrl();
    var brand = getBrand();
    if (server !== DEFAULT_API_URL || brand !== DEFAULT_BRAND) {
      end_note.innerHTML =
        'The server <a href="/endpoint/">endpoint</a> is: ' +
        server +
        " (Brand: " +
        brand +
        ")";
      end_note.classList.remove("invisible");
    } else {
      end_note.innerHTML = "";
      end_note.classList.add("invisible");
    }
  }
}

function scrollConsoleToBottom() {
  $console.stop(false, true);
  $console.animate(
    {
      scrollTop: $console[0].scrollHeight,
    },
    500
  );
}

function consoleShouldScroll() {
  return (
    Math.abs(
      $console[0].scrollHeight - $console.scrollTop() - $console.outerHeight()
    ) > 10
  );
}

function appendToConsoleAndScrollIntoView(html) {
  $console.stop(false, true);

  setTimeout(function () {
    $console.append(html);
    $("#toggle-theme").show();

    if (consoleShouldScroll()) {
      scrollConsoleToBottom();
      setTimeout(function () {
        if (consoleShouldScroll()) {
          $console.animate(
            {
              scrollTop: $console[0].scrollHeight,
            },
            500
          );
        }
      }, 1500);
    }
  }, 0);
}

function showDemoForLanguage(lang, category) {
  $(`[data-${category}]`).hide();
  $(`[data-${category}="` + lang + '"]').show();
}

function toggleTheme() {
  $playground = $("#playground");
  $playground.toggleClass("light");
  localStorage.setItem(
    "console.theme",
    $playground.hasClass("light") ? "light" : "dark"
  );
}

function onAnchorClick() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - anchor_shift);
  }
}

function addEventListeners() {
  $("#api-call-selector")
    .select2({
      matcher: customMatcher,
    })
    .on("change", function (e) {
      var method_name = $("#api-call-selector").val();
      var json_paths = getJsonPaths(method_name);

      loadAndDisplaySchema(
        $("#playground-req-schema"),
        json_paths.send,
        method_name,
        true
      );
      loadAndDisplaySchema(
        $("#playground-res-schema"),
        json_paths.receive,
        method_name,
        false
      );
      loadAndEditJson($("#playground-request"), json_paths.example);

      window.location.hash = method_name;
    });

  $("#playground-send-btn").on("click", function () {
    updatePlaygroundWithRequestAndResponse();
  });

  $("#playground-reset-btn").on("click", function () {
    $console.html("");
    $("#toggle-theme").hide();
    if (api) {
      api.disconnect(); // the connection will be re-opened on demand
    }
  });

  $("#api-token").on("change", function () {
    sessionStorage.setItem("token", $(this).val());
  });

  CODE_SAMPLES.forEach(el => $(`#demo-${el}`).on("change", function () {
    showDemoForLanguage($(this).val(), el);
  }));
  
  $("#mobile-page-selector")
    .val(document.location.pathname)
    .on("change", function (event) {
      if (!event.originalEvent) return;
      window.location.href = $(this).val();
    });

  $("#send-auth-manually-btn").on("click", function () {
    var token = sessionStorage.getItem("token");
    authReqStr = JSON.stringify(
      {
        authorize: token || "",
      },
      null,
      2
    );

    var $playgroundRequest = $("#playground-request");
    var lastContents = $playgroundRequest.val();
    $playgroundRequest.val(authReqStr);
    if (token) {
      $("#playground-send-btn").click();
      $playgroundRequest.val(lastContents);
    } else {
      window.location.hash = "authorize";
      $playgroundRequest.focus();
    }
  });

  $("#scroll-to-bottom-btn").on("click", scrollConsoleToBottom);

  $console.on("scroll", function () {
    var shouldShow = consoleShouldScroll() && !$console.is(":animated");
    $("#scroll-to-bottom-btn").toggle(shouldShow);
  });

  $("#toggle-theme").on("click", toggleTheme);

  $(window).on("hashchange", updateApiDisplayed);
  
  $(document).on('click', 'a[href^="#"]', () => {
    window.setTimeout(() => {
      onAnchorClick();
    }, 0);
  });
}

// Creating custom checkbox.
const all_main_checkboxes = document.querySelectorAll("input[type='checkbox']");
all_main_checkboxes.forEach(checkbox => {
  const custom_checkbox = document.createElement("span");
  const check_icon = document.createElement("img");

  custom_checkbox.className = "custom-checkbox";
  custom_checkbox.id = checkbox.id;
  
  custom_checkbox.appendChild(check_icon);
  checkbox.after(custom_checkbox);

  custom_checkbox.addEventListener("click", (event) => {
    const main_checkbox = document.querySelector(`input#${event.target.id}`);
    const is_checked = main_checkbox.hasAttribute("checked");
    if (!is_checked && event.target.id === checkbox.id) {
      // check
      main_checkbox.setAttribute("checked", "");
      custom_checkbox.classList.add("active-checkbox");
    } else {
      // uncheck
      main_checkbox.removeAttribute("checked");
      custom_checkbox.classList.remove("active-checkbox");
    }
  });
});
