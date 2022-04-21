/*
 * This is an example of using JavaScript with NodeJS to buy a contract via the Deriv/Binary API.
 * This is a simple example where we do not check first if the user has the 
 * symbol available to buy. To check this you would use the active_symbols call.
 * To run this example using NodeJS
 * - Ensure you have NodeJs installed (https://nodejs.org/).
 * - Save this script to a directory on your computer as `buy_contract.js`.
 * - Run `npm install ws` to install the websocket library.
 * - Edit the example and change the app_id and the API token. 
 * - Then run `node buy_contract.js`.
 * 
 * The api token should be from the same account that the contract is to be purchased for.
 */
const WebSocket = require('ws');

// You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.

const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=' + app_id);

// You can get your token here https://app.deriv.com/account/api-token. 
const token = ''; // Replace with your API token.

ws.onopen = function (evt) {
    ws.send(JSON.stringify({ "authorize": token })) // First send an authorize call.
};

ws.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    // console.log('Response: %o', data); // Uncomment this to see full response data. 
    if (data.error !== undefined) {
        console.log(data.error.message);
        ws.close();
    } else if (data.msg_type == 'authorize') {
        /*
        * Since we can not ensure calls to websocket are made in order we must wait for 
        * the response to the authorize call before sending the buy request. 
        */
        ws.send(JSON.stringify({
            "buy": 1,
            "subscribe": 1,
            "price": 10,
            "parameters": { "amount": 10, "basis": "stake", "contract_type": "CALL", "currency": "USD", "duration": 1, "duration_unit": "m", "symbol": "R_10" }
        }));
    } else if (data.msg_type == 'buy') { // Our buy request was successful let's print the results. 
        console.log("Contract Id " + data.buy.contract_id + "\n");
        console.log("Details " + data.buy.longcode + "\n");
    } else if (data.msg_type == 'proposal_open_contract') { // Because we subscribed to the buy request we will receive updates on our open contract. 
        var isSold = data.proposal_open_contract.is_sold;
        if (isSold) { // If `isSold` is true it means our contract has finished and we can see if we won or not.
            console.log("Contract " + data.proposal_open_contract.status + "\n");
            console.log("Profit " + data.proposal_open_contract.profit + "\n");
            ws.close();
        } else { // We can track the status of our contract as updates to the spot price occur. 
            var currentSpot = data.proposal_open_contract.current_spot;
            var entrySpot = 0;
            if (typeof (data.proposal_open_contract.entry_tick) != 'undefined') {
                entrySpot = data.proposal_open_contract.entry_tick;
            }
            console.log("Entry spot " + entrySpot + "\n");
            console.log("Current spot " + currentSpot + "\n");
            console.log("Difference " + (currentSpot - entrySpot) + "\n");
        }
    }
};