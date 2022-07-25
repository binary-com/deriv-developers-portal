const url = new URL(window.location.href);
const bc = new BroadcastChannel("auth");
const token1 = url.searchParams.get("token1");
const login_button = document.querySelector("#loginButton");
const authorized_message = document.querySelector("#authorized");
const unauthorized_message = document.querySelector("#unauthorized");
const contracts_for_symbol_button = document.querySelector(
  "#contractsForSymbol"
);
const updateElementStyles = () => {
  login_button.style.display = "none";
  authorized_message.style.display = "inline-block";
  unauthorized_message.style.display = "none";
  contracts_for_symbol_button.style.opacity = "1";
  contracts_for_symbol_button.style.pointerEvents = "auto";
  contracts_for_symbol_button.style.cursor = "pointer";
};

const buttonResponse = () => {
  window.open(
    "https://oauth.deriv.com/oauth2/authorize?app_id=32421&l=EN&brand=deriv",
    "newwindow",
    "width=320,height=800"
  );
};

login_button.addEventListener("click", buttonResponse);

window.onload = () => {
  const localstore_token = localStorage.getItem("token1");
  if (localstore_token.length >= 0) {
    updateElementStyles();
  }
};

bc.onmessage = function (event) {
  if (event.data.token1) {
    bc.postMessage("close");
    localStorage.setItem("token1", event.data.token1);
  }
  if (event.data === "close") {
    bc.postMessage("login_success");
    window.close();
  }
  if (event.data === "login_success") {
    updateElementStyles();
  }
};

if (token1) {
  bc.postMessage({ token1 });
}
