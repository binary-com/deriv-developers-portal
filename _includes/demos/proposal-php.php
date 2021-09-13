&lt;?php
/*
 * This is an example of using PHP to get a contract proposal via  the Deriv/Binary API.
 * This is a simple example where we do not check first if the user has the
 * symbol available. To check this you would use the active_symbols call.
 * The example uses the ratchetphp/Pawl library.  
 * To run this example 
 * - Save it to a new directory as `proposal.php`.
 * - In the new directory download and install composer as explained here https://getcomposer.org/download/.
 * - Run `php composer.phar require ratchet/pawl`.
 * - Edit the example and change the app_id and the API token. 
 * - Then run `php proposal.php`.
 * The API token should be from the same account that the contract is to be purchased for.
 */

require __DIR__ . '/vendor/autoload.php';

$myAppId = 1089; // Put your app_id here. 
$loop = \React\EventLoop\Loop::get();

$Connector = new React\Socket\Connector($loop, array(
    'timeout' =&gt; 10
));

$connector = new \Ratchet\Client\Connector($loop, $Connector);

$connector('wss://ws.binaryws.com/websockets/v3?app_id=' . $myAppId)
    -&gt;then(function (\Ratchet\Client\WebSocket $conn) {
        $conn-&gt;on('message', function (\Ratchet\RFC6455\Messaging\MessageInterface $msg) use ($conn) {
            $msgPHP = json_decode($msg, 1);
            //echo '&gt; '.$msg; // Uncomment to see full details of message. 
            if (isset($msgPHP["error"])) {
                echo $msgPHP["error"]["message"];
            } else {
                echo ("Details: " . $msgPHP["proposal"]["longcode"]). "\n";
                echo ("Ask Price: " . $msgPHP["proposal"]["display_value"]). "\n";
                echo ("Payout: " . $msgPHP["proposal"]["payout"]). "\n";
                echo ("Spot: " . $msgPHP["proposal"]["spot"]). "\n";
            }
        });

        /*
         * Since we do not need to be authorized to get proposal response there is no need to send 
         * an Authorization token first however when not Authorized the the available contracts is limited by 
         * the country the request is sent from.  
         */
        $conn-&gt;send('{ "proposal": 1, "amount": 100, "barrier": "+0.1", "basis": "payout", "contract_type": "CALL", "currency": "USD", "duration": 60, "duration_unit": "s", "symbol": "R_100" , "subscribe":1}');
    }, function (\Exception $e) use ($loop) {
        echo "Could not connect: {$e-&gt;getMessage()}\n";
        $loop-&gt;stop();
    });
$loop-&gt;run();