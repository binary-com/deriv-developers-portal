using System;
using System.Text;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading;
using System.Net;
using Newtonsoft.Json.Linq;
/*
 * This is an example of using C# to buy a contract.
 * This is a simple script as it does not check if the account has access to the
 * asset before placing the trade. You can use `asset_index` call https://developers.deriv.com/playground/#asset_index to check this.
 * The example was originally written in dotnet version 5.0.  
 * It uses the Newtonsoft Json.net Library https://www.newtonsoft.com/json
 * This can be run on Windows/linux or Mac.
 *  
 * To run this example 
 * - Ensure you have dotnet SDK installed https://dotnet.microsoft.com/download/dotnet. 
 * - Run `dotnet new console --output buy_contract` In a directory on your computer.
 * - Then run `dotnet add buy_contract package Newtonsoft.Json`.
 * - Change to the new buy_contract dir and edit the `Program.cs` file, paste in the contents of this script and save.
 * - Run `dotnet run --project buy_contract` in the parent directory.
 * The API token should be from the same account that the contract is to be purchased for.
 */
namespace DerivWSDemo
{
    class DerivWS
    {
        private ClientWebSocket ws = new ClientWebSocket();
        private string app_id = "1089"; // Change this to yor app_id. Get it from here https://developers.deriv.com/docs/app-registration/.
        public static string token = ""; // Change this to your token. Get it from here https://app.deriv.com/account/api-token.
        private string websocket_url = "wss://ws.binaryws.com/websockets/v3?app_id=";

        public async Task SendRequest(string data)
        {
            while (this.ws.State == WebSocketState.Connecting) { };
            if (this.ws.State != WebSocketState.Open)
            {
                throw new Exception("Connection is not open.");
            }
            var reqAsBytes = Encoding.UTF8.GetBytes(data);
            var ticksRequest = new ArraySegment&lt;byte&gt;(reqAsBytes);
            await this.ws.SendAsync(ticksRequest,
                WebSocketMessageType.Text,
                true,
                CancellationToken.None);
            Console.WriteLine("The request has been sent: ");
            Console.WriteLine(data);
            Console.WriteLine("\r\n \r\n");
        }

        public async Task StartListen()
        {
            WebSocketReceiveResult result;
            while (this.ws.State == WebSocketState.Open)
            {
                var buffer = new ArraySegment&lt;byte&gt;(new byte[4096]);
                result = await this.ws.ReceiveAsync(new ArraySegment&lt;byte&gt;(buffer.Array), CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    Console.WriteLine("Connection Closed!");
                    break;
                }
                else
                {
                    var str = Encoding.UTF8.GetString(buffer.Array, 0, result.Count);
                    // Console.WriteLine(str); // Uncomment to see full json response.
                    JObject resultObject = JObject.Parse(str);
                    /*
                    * Since we can not ensure calls to websocket are made in order we must wait for 
                    * the response to the authorize call before sending the buy request. 
                    */
                    if ((resultObject["error"] != null))
                    {
                        Console.WriteLine(resultObject["error"]["code"]);
                        Console.WriteLine(resultObject["error"]["message"]);
                    }
                    else if (string.Equals((string)resultObject["msg_type"], "authorize"))
                    {
                        string parameters = " \"parameters\": { \"amount\": 10, \"basis\": \"stake\", \"contract_type\": \"CALL\", \"currency\": \"USD\", \"duration\": 1, \"duration_unit\": \"m\", \"symbol\": \"R_10\" }}";
                        string data = "{\"buy\": 1, \"subscribe\": 1, \"price\": 10," + parameters;
                        this.SendRequest(data).Wait();
                    }
                    else if (string.Equals((string)resultObject["msg_type"], "buy"))
                    {
                        Console.WriteLine("contract Id {0}", resultObject["buy"]["contract_id"]);
                        Console.WriteLine("Details {0}", resultObject["buy"]["longcode"]);
                    }
                    else if (string.Equals((string)resultObject["msg_type"], "buy"))
                    {
                        Console.WriteLine("contract Id {0}", resultObject["buy"]["contract_id"]);
                        Console.WriteLine("Details {0}", resultObject["buy"]["longcode"]);
                    }
                    else if (string.Equals((string)resultObject["msg_type"], "proposal_open_contract"))
                    { // Because we subscribed to the buy request we will receive updates on our open contract. 
                        bool isSold = (bool)resultObject["proposal_open_contract"]["is_sold"];
                        if (isSold)
                        { // If `isSold` is true it means our contract has finished and we can see if we won or not.
                            Console.WriteLine("Contract {0}", resultObject["proposal_open_contract"]["status"]);
                            Console.WriteLine("Profit {0}", resultObject["proposal_open_contract"]["profit"]);
                            ws.Abort();
                            ws.Dispose();
                        }
                        else
                        { // We can track the status of our contract as updates to the spot price occur. 
                            float currentSpot = (float)resultObject["proposal_open_contract"]["current_spot"];
                            float entrySpot = 0;
                            if (!String.IsNullOrEmpty((string)resultObject["proposal_open_contract"]["entry_tick"]))
                            {
                                entrySpot = (float)resultObject["proposal_open_contract"]["entry_tick"];
                            }
                            Console.WriteLine("Entry spot {0}", entrySpot);
                            Console.WriteLine("Current spot {0}", currentSpot);
                            Console.WriteLine("Difference {0}", (currentSpot - entrySpot));
                            Console.WriteLine("\r\n");
                        }
                    }
                }
            }
        }

        public async Task Connect()
        {
            Uri uri = new Uri(websocket_url + app_id);
            Console.WriteLine("Prepare to connect to: " + uri.ToString());
            Console.WriteLine("\r\n");
            // WebProxy proxyObject = new WebProxy("http://172.30.160.1:1090",true); // These 2 lines allow proxying set the proxy url as needed.
            // ws.Options.Proxy = proxyObject;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11;
            await ws.ConnectAsync(uri, CancellationToken.None);
            Console.WriteLine("The connection is established!");
            Console.WriteLine("\r\n");
        }

        static void Main(string[] args)
        {
            var bws = new DerivWS();
            bws.Connect().Wait();
            string data = "{ \"authorize\": \"" + token + "\"}";
            bws.SendRequest(data).Wait();
            bws.StartListen().Wait();
        }
    }
}