# This is an example of using Python to buy a contract via the Deriv/Binary API.
# This is a simple example of buying a contract where we do not check first if the user has the
# symbol available to buy. To check this you would use the active_symbols call.
# The example uses the websocket-client library.
# To run this example
# - Ensure you have Python installed (https://www.python.org/).
# - Copy and save this as a file to a new directory as `buy_contract.py`.
# - Run `pip install websocket-client`.
# - Edit the example and change the app_id and the API token.
# - Then run `python buy_contract.py`.
# Note that on some OS's the python command will be python3 and pip will be pip3.

import websocket
import json

# You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
app_id = '1089'  # Replace with your app_id.

# You can get your token here https://app.deriv.com/account/api-token.
# Replace with a token from the account that you wish to buy the contract for.
token = ''

def on_open(ws):
    json_data = json.dumps({'authorize': token})
    ws.send(json_data)

def on_message(ws, message):
    data = json.loads(message)
    #print('Data: %s' % message) # Uncomment this line to see all response data.
    if 'error' in data.keys():
        print('Error Happened: %s' % message)
        # With Websockets we can not control the order things are processed in so we need
        # to ensure that we have received a response to authorize before we continue.
    elif data["msg_type"] == 'authorize':
        print("Authorized OK, so now buy Contract")
        json_data1 = json.dumps({"buy": 1, "subscribe": 1, "price": 10, "parameters": {
                                "amount": 10, "basis": "stake", "contract_type": "CALL", "currency": "USD", "duration": 1, "duration_unit": "m", "symbol": "R_10"}})
        ws.send(json_data1)

    # Our buy request was successful let's print the results.
    elif data["msg_type"] == 'buy':
        print("contract Id  %s " %  data["buy"]["contract_id"] )
        print("Details %s " % data["buy"]["longcode"] )
    
    # Because we subscribed to the buy request we will receive updates on our open contract.
    elif data["msg_type"] == 'proposal_open_contract':
      isSold = bool(data["proposal_open_contract"]["is_sold"])
      # If `isSold` is true it means our contract has finished and we can see if we won or not.
      if isSold:
          print("Contract %s " % data["proposal_open_contract"]["status"] )
          print("Profit %s " %  data["proposal_open_contract"]["profit"] )
          ws.close()
      else:  # We can track the status of our contract as updates to the spot price occur.
          currentSpot = data["proposal_open_contract"]["current_spot"]
          entrySpot = 0
          if data["proposal_open_contract"]["entry_tick"] != None:
              entrySpot = data["proposal_open_contract"]["entry_tick"]
          
          print ("Entry spot %s" % entrySpot )
          print ("Current spot %s" % currentSpot )
          print ("Difference %s" % (currentSpot - entrySpot) )
           
if __name__ == "__main__":
    apiUrl = "wss://ws.binaryws.com/websockets/v3?app_id="+app_id
    ws = websocket.WebSocketApp(apiUrl, on_message=on_message, on_open=on_open)
    ws.run_forever()