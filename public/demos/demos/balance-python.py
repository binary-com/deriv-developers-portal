#
# This is an example of using Python to get an account balance from the Deriv/Binary API.
# The example uses the websocket-client library.
# To run this example
# - Ensure you have Python installed (https://www.python.org/).
# - Copy and save this as a file to a new directory as `account_balance.py`.
# - Run `pip install websocket-client`.
# - Edit the example and change the app_id and the API token.
# - Then run `python account_balance.py`.
# The API token should be from the same account that the balance is to be obtained from.
# Note that on some OS's the python command will be python3 and pip will be pip3.

import websocket
import json

# You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
app_id = '1089'  # Replace with your app_id.

# You can get your token here https://app.deriv.com/account/api-token.
# Replace with a token from the account that you wish to get the balance from.
token = ''

def on_open(ws):
    json_data = json.dumps({'authorize': token})
    ws.send(json_data)

def on_message(ws, message):
    data = json.loads(message)
    # print('Data: %s' % message) # Uncomment this line to see all response data.
    if 'error' in data.keys():
        print('Error Happened: %s' % message)
    # With Websockets we can not control the order things are processed in so we need
    # to ensure that we have received a response to authorize before we continue.
    elif data["msg_type"] == 'authorize':
        print("Authorized OK, so now get balance")
        json_data1 = json.dumps({'balance': 1, 'subscribe': 1})
        ws.send(json_data1)
    # Because we subscribed we will continue to receive Balance updates when it changes.
    elif data["msg_type"] == 'balance':
        print('balance: %s' % data['balance']['balance'])
    else:
        print('unrecognized data: %s')

if __name__ == "__main__":
    apiUrl = "wss://ws.binaryws.com/websockets/v3?app_id="+app_id
    ws = websocket.WebSocketApp(apiUrl, on_message=on_message, on_open=on_open)
    ws.run_forever()