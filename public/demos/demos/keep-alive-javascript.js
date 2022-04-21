/*
 * This is an example of using JavaScript with NodeJS to create a proposal subscription and prevent it from timing out.  
 * A ping will be sent via websocket to the server every 30 seconds. 
 * This approach can be used for all subscriptions to prevent timeout.
 * To run this example using NodeJS
 * - Ensure you have NodeJs installed (https://nodejs.org/).
 * - Save this script to a directory on your computer as `proposal_keep_alive.js`.
 * - Run `npm install ws` to install the websocket library.
 * - Edit the example and change the app_id and the API token. 
 * - Then run `node proposal_keep_alive.js`.
 * 
 * The api token should be from the same account that the contract is to be purchased for.
 */
const WebSocket = require('ws');

// You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
const app_id = 1089; // Replace with your app_id.
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
    /*
    * Send a ping ever 30 seconds to keep the connection alive, needs to use the same 
    * websocket connection as the one you want to maintain.
    */
    setInterval(ping, 30000);
};
ws.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    // console.log('Response: %o', data); // Uncomment this to see full response data. 
    if (data.error !== undefined) {
        console.log("Error: %s ", data.error.message);
        ws.close();
    } else if (data.msg_type == 'proposal') { 
        console.log("Details: %s", data.proposal.longcode);
        console.log("Ask Price: %s", data.proposal.display_value);
        console.log("Payout: %s", data.proposal.payout);
        console.log("Spot: %s", data.proposal.spot);
    } else if (data.msg_type == 'ping') {
        console.log("ping");
    }
};
function ping() { ws.send(JSON.stringify({ "ping": 1 })) }