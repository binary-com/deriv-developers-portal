# This is an example of using Python to get a ticks via the Deriv/Binary API.
# The example uses the websocket-client library.
# To run this example
# - Ensure you have Python installed (https://www.python.org/).
# - Copy and save this as a file to a new directory as `ticks.py`.
# - Run `pip install websocket-client`.
# - Edit the example and change the app_id and the API token.
# - Then run `python ticks.py`.
# Note that on some OS's the python command will be python3 and pip will be pip3.

import websocket
import json

# You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
app_id = '1089'  # Replace with your app_id.

def on_open(ws):
    json_data = json.dumps({"ticks": "R_100"})
    ws.send(json_data)

def on_message(ws, message):
    data = json.loads(message)
    print('Data: %s' % message)

if __name__ == "__main__":
    apiUrl = "wss://ws.binaryws.com/websockets/v3?app_id="+app_id
    ws = websocket.WebSocketApp(apiUrl, on_message=on_message, on_open=on_open)
    ws.run_forever()