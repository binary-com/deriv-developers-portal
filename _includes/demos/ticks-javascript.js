/*
 * This is an example of using JavaScript with NodeJS to collect ticks for your trading app using Deriv's API.
 * To run this example using NodeJS
 * - Ensure you have NodeJs installed (https://nodejs.org/).
 * - Save this script to a directory on your computer as `ticks.js`.
 * - Run `npm install ws` to install the websocket library.
 * - Edit the example and change the app_id (Replace with your app_id or leave as 1089 for testing).
 * - Then run `node ticks.js`.
 */

const WebSocket = require('ws');
var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');

ws.onopen = function (evt) {
    ws.send(JSON.stringify({ ticks: 'R_100' }));
};

ws.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    console.log('Ticks update: %o', data);
};