# This is an example of using Python to get a contract proposal  and keep the connection alive via the Deriv/Binary API.
# Link is kept alive by sending a ping every 30 seconds.
# The example uses the websockets library.
# Note that the websockets library is more sophisticated than the websocket library used in the other examples. 
# This is required so that we can get access to asyncio loop.  
# To run this example
# - Ensure you have Python installed https://www.python.org/.
# - Copy and save this as a file to a new directory as `proposal_keep_alive.py`.
# - Run `pip install websockets`.
# - Edit the example and change the app_id and the API token.
# - Then run `python proposal_keep_alive.py`.
# Note that on some OS's the python command will be python3 and pip will be pip3.

import websockets
import json
import asyncio

# You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
app_id = '1089'  # Replace with your app_id.

async def connect():
    uri = "wss://ws.binaryws.com/websockets/v3?app_id="+app_id

    async with websockets.connect(uri) as websocket:
        
        loop.create_task(ping(websocket))

        json_data = json.dumps({"proposal": 1,
       "amount": 100, "barrier": "+0.1", "basis": "payout", "contract_type": "CALL", "currency": "USD", "duration": 60, "duration_unit": "s", "symbol": "R_100" , "subscribe":1})
        await websocket.send(json_data)

        async for message in websocket: 
                data = json.loads(message)
                # print('Data: %s' % message) # Uncomment this line to see all response data.
                if 'error' in data.keys():
                    print('Error Happened: %s' % message)
                elif data["msg_type"] == 'proposal':
                    print ("Contract : %s " % data['proposal']['longcode']);    
                    print ("Price : %s " % data['proposal']['display_value']);    
                    print ("Payout : %s " % data['proposal']['payout']);    
                    print ("Spot: %s " % data['proposal']['spot']);

async def ping(ws):
    json_data = json.dumps({"ping": 1})
    while 1:
        await ws.send(json_data)
        await asyncio.sleep(30)

loop = asyncio.get_event_loop()
loop.create_task(connect())
loop.run_forever()