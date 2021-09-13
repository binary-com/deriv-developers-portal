/*
 * This is an example of using JavaScript with NodeJS to subscribe to balance of an account. 
 * To run this example using NodeJS
 * - Ensure you have NodeJs installed (https://nodejs.org/).
 * - Save this script to a directory on your computer as `account_balance.js`.
 * - Run `npm install ws` to install the websocket library.
 * - Edit the example and change the app_id and the API token. 
 * - Then run `node account_balance.js`.
 * 
 * The api token should be from the same account that the balance is to be checked for.
 */
const WebSocket = require('ws');

// You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
const app_id = 1089; // Replace with your app_id.
const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=' + app_id);

// You can get your token here https://app.deriv.com/account/api-token. 
const token = ''; // Replace with your API token.

ws.onopen = function (evt) {
    ws.send(JSON.stringify({ "authorize": token })) // First send an authorize call.
};

ws.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    // console.log('Response: %o', data); // Uncomment to see the full JSON response.
    if (data.error !== undefined) {
        console.log('Error : %o', data.error.message);
    } else if (data.msg_type == 'authorize') {
        /*
        * Since we can not ensure calls to websocket are made in order we must wait for 
        * the response to the authorize call before sending the balance request. 
        * 
        * We subscribe to balance updates so any updates to balance will be received.
        * If you perform a trade while this script is running you should see updates 
        * to the balance printed.  
        */
        ws.send(JSON.stringify({ "balance": 1, "subscribe": 1 }))
    } else if (data.msg_type == 'balance') {
        console.log('Current Balance: %o', data.balance.balance);
    } else {
        console.log('Unknown Response %o', data);
    }
};