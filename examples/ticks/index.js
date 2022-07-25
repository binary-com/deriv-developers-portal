import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api";
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(
  `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);
const api = new DerivAPIBasic({ connection });

const tickResponse = (res) => {
  const data = JSON.parse(res.data);
  console.log(data.tick);

  // After 15 seconds, will stop tick response.
  setTimeout(async () => {
    connection.removeEventListener("message", tickResponse, false);
    await api.disconnect();
  }, 15000);
};

const ticks = async () => {
  await api.ticks("R_100");
  connection.addEventListener("message", tickResponse);
};

const button = document.getElementById("ticks");
button.addEventListener("click", ticks);
