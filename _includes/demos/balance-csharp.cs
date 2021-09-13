using System;
using System.Text;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading;
using System.Net;
using Newtonsoft.Json.Linq;
/*
 * This is an example of using C# to get the balance of an account.
 * The example was originally written in dotnet version 5.0.  
 * It uses the Newtonsoft Json.net Library https://www.newtonsoft.com/json
 * This can be run on Windows/linux or Mac.
 *  
 * To run this example 
 * - Ensure you have dotnet SDK installed https://dotnet.microsoft.com/download/dotnet. 
 * - Run `dotnet new console --output account_balance` in a directory on your computer.
 * - Then run `dotnet add account_balance package Newtonsoft.Json` 
 * - Change to the new account_balance directory and edit the `Program.cs` file, paste in the contents of this script and save.
 * - Run `dotnet run --project account_balance` in the parent directory.
 * The API token should be from the same account that the balance is to be checked for.
 */
namespace DerivWSDemo
{
    class DerivWS
    {
        private ClientWebSocket ws = new ClientWebSocket();
        // You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
        private string app_id = "1089"; // Change this to yor app_id.
        // You can get your token here https://app.deriv.com/account/api-token.
        public static string token = ""; // Change this to the token you want to get the balance from. 
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
                            Console.WriteLine(resultObject["error"]["message"]);
                        } else if (string.Equals((string)resultObject["msg_type"], "authorize")) {
                        /*
                        * Since we can not ensure calls to websocket are made in order we must wait for 
                        * the response to the authorize call before sending the balance request. 
                        * 
                        * We subscribe to balance updates so any updates to balance will be received.
                        * If you perform a trade while this script is running you should see updates 
                        * to the balance printed.  
                        */
                            var data = "{\"balance\":1,\"subscribe\":1}";
                            this.SendRequest(data).Wait();
                        } else if (string.Equals((string)resultObject["msg_type"], "balance")){
                            Console.WriteLine("Current Balance: {0}", resultObject["balance"]["balance"]);
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
            // WebProxy proxyObject = new WebProxy("http://172.30.160.1:1090",true); // These 2 lines allow proxying set the proxy url as needed.
            // ws.Options.Proxy = proxyObject;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11;
            await ws.ConnectAsync(uri, CancellationToken.None);
            Console.WriteLine("The connection is established!");
            Console.WriteLine("\r\n");
        }

        static void Main(string[] args)
        {
            string data = "{ \"authorize\": \""+ token +"\"}";
            var bws = new DerivWS();
            bws.Connect().Wait();
            bws.SendRequest(data).Wait();
            bws.StartListen().GetAwaiter();
            Console.ReadLine();
        }
    }
}