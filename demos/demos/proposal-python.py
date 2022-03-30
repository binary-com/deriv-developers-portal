# This is an example of using Python to get a contract proposal via the Deriv/Binary API.
# The example uses the websocket-client library.
# To run this example
# - Ensure you have Python installed (https://www.python.org/).
# - Copy and save this as a file to a new directory as `proposal.py`.
# - Run `pip install websocket-client`.
# - Edit the example and change the app_id and the API token.
# - Then run `python proposal.py`.
# Note that on some OS's the python command will be python3 and pip will be pip3.

import websocket
import json

# You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
app_id = '1089'  # Replace with your app_id.

def on_open(ws):
    json_data = json.dumps({"proposal": 1,
     "amount": 100, "barrier": "+0.1", "basis": "payout", "contract_type": "CALL", "currency": "USD", "duration": 60, "duration_unit": "s", "symbol": "R_100" , "subscribe":1})
    ws.send(json_data)

def on_message(ws, message):
    data = json.loads(message)
    # print('Data: %s' % message) # Uncomment this line to see all response data.
    if 'error' in data.keys():
        print('Error Happened: %s' % message)
    elif data["msg_type"] == 'proposal':
        print ("Contract : %s " % data['proposal']['longcode']);    
        print ("Price : %s " % data['proposal']['display_value']);    
        print ("Payout : %s " % data['proposal']['payout']);    
        print ("Spot: %s " % data['proposal']['spot']);

if __name__ == "__main__":
    apiUrl = "wss://ws.binaryws.com/websockets/v3?app_id="+app_id
    ws = websocket.WebSocketApp(apiUrl, on_message=on_message, on_open=on_open)
    ws.run_forever()