&lt;?php
/*
 * This is an example of using PHP to create a proposal subscription and prevent it from timing out.  
 * A ping will be sent via websocket to the server every 30 seconds. 
 * This approach can be used for all subscriptions to prevent timeout.  
 * The example uses the ratchetphp/Pawl library.  
 * To run this example 
 * - Save it to a new directory as `proposal_keep_alive.php`.
 * - In the new directory download and install composer as explained here https://getcomposer.org/download/.
 * - Run `php composer.phar require ratchet/pawl`.
 * - Edit the example and change the app_id and the API token. 
 * - Then run `php proposal_keep_alive.php`.
 */

require __DIR__ . '/vendor/autoload.php';

// You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
$my_app_id = 1089; // Put your app_id here. 
$loop = \React\EventLoop\Factory::create();
$Connector = new React\Socket\Connector($loop, array(
    'timeout' =&gt; 10,
));
$connector = new \Ratchet\Client\Connector($loop, $Connector);

$connector('wss://ws.binaryws.com/websockets/v3?app_id='.$my_app_id)
    -&gt;then(function(\Ratchet\Client\WebSocket $conn) use ($loop) {
        $conn-&gt;on('message', function(\Ratchet\RFC6455\Messaging\MessageInterface $msg) use ($conn) {
            $msg_php = json_decode($msg, 1); 
            // echo '&gt; '.$msg."\n"; // Uncomment to see entire JSON response.
            if (isset($msg_php["error"])) { 
                echo $msg_php["error"]["message"]."\n";
                $conn-&gt;close();
            }else if (isset($msg_php["proposal"])) {
                echo $msg_php['proposal']['ask_price']."\n";    
            }else {
                echo ("received ". $msg_php['msg_type']."\n");
            }
        });

        // Sends a ping request every 30 seconds, needs to use the same connection `$conn` as the subscription. 
        $loop-&gt;addPeriodicTimer(30, function () use ($conn) {
            $conn-&gt;send('{ "ping": 1}');
            echo "Ping Sent\n";
        });
        /*
         * Since we do not need to be authorized to get proposal response there is no need to send 
         * an Authorization token however when not Authorized the the available contracts is limited by 
         * the country the request is sent from.  
         */
        $conn-&gt;send('{ "proposal": 1, "amount": 100, "barrier": "+0.1", "basis": "payout", "contract_type": "CALL", "currency": "USD", "duration": 60, "duration_unit": "s", "symbol": "R_100" , "subscribe":1}');
    }, function(\Exception $e) use ($loop) {
        echo "Could not connect: {$e-&gt;getMessage()}\n";
        $loop-&gt;stop();
    });
$loop-&gt;run();