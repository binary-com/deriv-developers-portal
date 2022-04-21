/*
 * This is an example of using JavaScript with NodeJS to view contract proposals via the Deriv/Binary API.
 * This is a simple example where we do not check first if the user has the
 * symbol available. To check this you would use the active_symbols call.
 * To run this example using NodeJS
 * - Ensure you have NodeJs installed (https://nodejs.org/).
 * - Save this script to a directory on your computer as `proposal.js`.
 * - Run `npm install ws` to install the websocket library.
 * - Edit the example and change the app_id and the API token. 
 * - Then run `node proposal.js`.
 * 
 */
const WebSocket = require('ws');
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=' + app_id);

ws.onopen = function (evt) {
    ws.send(JSON.stringify({
        "proposal": 1,
        "subscribe": 1,
        "amount": 10,
        "basis": "payout",
        "contract_type": "CALL",
        "currency": "USD",
        "duration": 1,
        "duration_unit": "m",
        "symbol": "R_100",
        "barrier": "+0.1"
    }));
};

ws.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    // console.log('Response: %o', data); // Uncomment this to see full response data. 
    if (data.error !== undefined) {
        console.log("Error: %s", data.error.message);
        ws.close();
    } else if (data.msg_type == 'proposal') {
        console.log("Details: %s", data.proposal.longcode);
        console.log("Ask Price: %s", data.proposal.display_value);
        console.log("Payout: %s", data.proposal.payout);
        console.log("Spot: %s", data.proposal.spot);
    }
};