&lt;?php
/*
 * This is an example of using PHP to buy a contract via the Deriv/Binary API.
 * This is a simple example of buying a contract where we do not check first if the user has the
 * symbol available to buy. To check this you would use the active_symbols call.
 * The example uses the ratchetphp/Pawl library.  
 * To run this example 
 * - Save it to a new directory as `buy_contract.php`.
 * - In the new directory download and install composer as explained here https://getcomposer.org/download/.
 * - Run `php composer.phar require ratchet/pawl`.
 * - Edit the example and change the app_id and the API token. 
 * - Then run `php buy_contract.php`.
 * The api token should be from the same account that the contract is to be purchased for.
 */

require __DIR__ . '/vendor/autoload.php';

// You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
$myAppId = 1089; // Put your app_id here. 

// You can get your token here https://app.deriv.com/account/api-token.
$token = ''; // Put the authorization token for the account to buy the contract for here. 

\Ratchet\Client\connect('wss://ws.binaryws.com/websockets/v3?app_id=' . $myAppId)-&gt;then(function ($conn) use ($token) {
    $conn-&gt;on('message', function ($msg) use ($conn, $token) {
        // echo $msg."\n"; Uncomment this to see full JSON return message.
        $msgPHP = json_decode($msg, 1);
        if (isset($msgPHP["error"])) {
            echo $msgPHP["error"]["message"];
            $conn-&gt;close();
        } else if ($msgPHP["msg_type"] == 'authorize') {  // We have a successful authorization so we can now buy a contract.
            /*
             * Since there can be no guarantee of the order of the calls when using websocket we need
             * to check that we have received a reply to the authorize call before sending the buy 
             * request.
             */
            $conn-&gt;send('{ "buy":1, "subscribe":1, "price":10, "parameters":{ "amount":10, "basis":"stake", "contract_type":"CALL", "currency":"USD", "duration":1, "duration_unit":"m", "symbol":"R_10" } } ');
        } else if ($msgPHP["msg_type"] == 'buy') { // Our buy request was successful let's print the results. 
            echo ("contract Id " . $msgPHP["buy"]["contract_id"] . "\n");
            echo ("Details " . $msgPHP["buy"]["longcode"] . "\n");
        } else if ($msgPHP["msg_type"] == 'proposal_open_contract') { // Because we subscribed to the buy request we will receive updates on our open contract. 
            $isSold = $msgPHP["proposal_open_contract"]["is_sold"];
            if ($isSold) { // If `isSold` is true it means our contract has finished and we can see if we won or not.
                echo ("Contract " . $msgPHP["proposal_open_contract"]["status"] . "\n");
                echo ("Profit " .  $msgPHP["proposal_open_contract"]["profit"] . "\n");
                $conn-&gt;close();
            } else { // We can track the status of our contract as updates to the spot price occur. 
                $currentSpot = $msgPHP["proposal_open_contract"]["current_spot"];
                $entrySpot = 0;
                if (isset($msgPHP["proposal_open_contract"]["entry_tick"])) {
                    $entrySpot = $msgPHP["proposal_open_contract"]["entry_tick"];
                }
                echo ("Entry spot " . $entrySpot . "\n");
                echo ("Current spot " . $currentSpot . "\n");
                echo ("Difference " . ($currentSpot - $entrySpot) . "\n");
            }
        }
    });
    $conn-&gt;send('{"authorize" : "' . $token . '"}');
}, function ($e) {
    echo "Could not connect: {$e-&gt;getMessage()}\n";
});