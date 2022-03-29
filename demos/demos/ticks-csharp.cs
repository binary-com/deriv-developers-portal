using System;
using System.Text;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading;
using System.Net;
using Newtonsoft.Json.Linq;
/*
 * This is an example of using C# to subscribe to a tick stream.
 * The example was originally written in dotnet version 5.0. 
 * It uses the Newtonsoft Json.net Library https://www.newtonsoft.com/json.
 * This can be run on Windows/linux or Mac.
 *  
 * To run this example 
 * - Ensure you have dotnet SDK installed https://dotnet.microsoft.com/download/dotnet. 
 * - Run `dotnet new console --output ticks` in a directory on your computer.
 * - Then run `dotnet add ticks package Newtonsoft.Json`.
 * - Change to the new ticks directory and edit the `Program.cs` file, paste in the contents of this script and save.
 * - Run `dotnet run --project ticks`.
 */
namespace DerivWSDemo
{
    class DerivWS
    {
        private ClientWebSocket ws = new ClientWebSocket();
        // You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
        private string app_id = "1089"; // Change this to yor app_id.
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
                        }
                        else if (string.Equals((string)resultObject["msg_type"], "tick"))
                        {
                            Console.WriteLine("Ask: {0} Bid: {1}", resultObject["tick"]["ask"], resultObject["tick"]["bid"]);
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
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11;
            await ws.ConnectAsync(uri, CancellationToken.None);
            Console.WriteLine("The connection is established!");
            Console.WriteLine("\r\n");
        }

        static void Main(string[] args)
        {
            string data = "{\"ticks\":\"R_10\"}";
            var bws = new DerivWS();
            bws.Connect().Wait();
            bws.SendRequest(data).Wait();
            bws.StartListen().GetAwaiter();
            Console.ReadLine();
        }
    }
}