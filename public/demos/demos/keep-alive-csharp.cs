using System;
using System.Text;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading;
using System.Net;
using Newtonsoft.Json.Linq;
/*
/*
 * This is an example of using C# to create a proposal subscription and prevent it from timing out.  
 * A ping will be sent via websocket to the server every 30 seconds. 
 * This approach can be used for all subscriptions to prevent timeout.  
 * The example was originally written in dotnet version 5.0.  
 * It uses the Newtonsoft Json.net Library https://www.newtonsoft.com/json.
 * This can be run on Windows/linux or Mac.
 *  
 * To run this example 
 * - Ensure you have dotnet SDK installed https://dotnet.microsoft.com/download/dotnet. 
 * - Run `dotnet new console --output proposal_keep_alive` in a directory on your computer.
 * - Then run `dotnet add proposal_keep_alive package Newtonsoft.Json`.
 * - Change to the new proposal_keep_alive directory and edit the `Program.cs` file, paste in the contents of this script and save.
 * - Run `dotnet run --project proposal_keep_alive` in the parent directory.
 */
namespace DerivWSDemo
{
    class DerivWS
    {
        private ClientWebSocket ws = new ClientWebSocket();
        // You can register for an app_id here https://developers.deriv.com/docs/app-registration/.        
        private string app_id = "1089"; // Change this to yor app_id.
        private string websocket_url = "wss://ws.binaryws.com/websockets/v3?app_id=";
        private bool connected = false;

        public async Task SendRequest(string data)
        {
            while (this.ws.State == WebSocketState.Connecting) { };
            if (this.ws.State != WebSocketState.Open)
            {
                throw new Exception("Connection is not open.");
            }
            if (!this.connected) // Only start the ping once connected and only run the timer once. 
            {
                this.connected = true;
                sendPing();
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
        private async void sendPing()
        {
            while (true){

                this.SendRequest("{\"ping\" :1}").Wait();
                await Task.Delay(30000); // Delay the loop for 30 seconds.
            }
        }
        public async Task StartListen()
        {
            WebSocketReceiveResult result;
            while (this.ws.State == WebSocketState.Open)
            {
                var buffer = new ArraySegment&lt;byte&gt;(new byte[1024]);
                do
                {
                    result = await this.ws.ReceiveAsync(new ArraySegment&lt;byte&gt;(buffer.Array), CancellationToken.None);
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        Console.WriteLine("Connection Closed!");
                        break;
                    }
                    else
                    {
                        var str = Encoding.UTF8.GetString(buffer.Array, 0, result.Count);
                        // Console.WriteLine(str); // Uncomment to see full JSON response.
                        JObject resultObject = JObject.Parse(str);
                        if ((resultObject["error"] != null))
                        {
                            Console.WriteLine(resultObject["error"]["code"]);
                            Console.WriteLine(resultObject["error"]["message"]);
                        }
                        else if (string.Equals((string)resultObject["msg_type"], "proposal"))
                        {
                            Console.WriteLine("Details: {0}", resultObject["proposal"]["longcode"]);
                            Console.WriteLine("Ask Price: {0}", resultObject["proposal"]["display_value"]);
                            Console.WriteLine("Payout: {0}", resultObject["proposal"]["payout"]);
                        }
                    }
                } while (!result.EndOfMessage);
            }
        }

        public async Task Connect()
        {
            Uri uri = new Uri(websocket_url + app_id);
            Console.WriteLine("Prepare to connect to: " + uri.ToString());
            Console.WriteLine("\r\n");
            // WebProxy proxyObject = new WebProxy("http://tardis:1080",true); // These 2 lines allow proxying set the proxy url as needed.
            // ws.Options.Proxy = proxyObject;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11;
            await ws.ConnectAsync(uri, CancellationToken.None);
            Console.WriteLine("The connection is established!");
            Console.WriteLine("\r\n");
        }

        static void Main(string[] args)
        {
            string data = "{ \"proposal\": 1, \"amount\": 100, \"barrier\": \"+0.1\", \"basis\": \"payout\", \"contract_type\": \"CALL\", \"currency\": \"USD\", \"duration\": 60, \"duration_unit\": \"s\", \"symbol\": \"R_100\" , \"subscribe\" : 1}";
            var bws = new DerivWS();
            bws.Connect().Wait();
            bws.SendRequest(data).Wait();
            bws.StartListen().GetAwaiter();
            Console.ReadLine();
        }
    }
}