&lt;?php
/*
 * This is an example of using PHP to get an account balance from the Deriv/Binary API.
 * The example uses the ratchetphp/Pawl library.  
 * To run this example 
 * - Save it to a new directory as `account_balance.php`.
 * - In the new directory download and install composer as explained here https://getcomposer.org/download/.
 * - Run `php composer.phar require ratchet/pawl`.
 * - Edit the example and change the app_id and the API token. 
 * - Then run `php account_balance.php`.
 * The API token should be from the same account that the balance is to be obtained from. 
 *
 */

require __DIR__ . '/vendor/autoload.php';

// You can register for an app_id here https://developers.deriv.com/docs/app-registration/.
$myAppId = 1089; // Put your app_id here. 

// You can get your token here https://app.deriv.com/account/api-token. 
$token = ''; // Put the authorization token for the account to get the balance from here.  

\Ratchet\Client\connect('wss://ws.binaryws.com/websockets/v3?app_id=' . $myAppId)-&gt;then(function ($conn) use ($token) {
    $conn-&gt;on('message', function ($msg) use ($conn, $token) {
        // echo $msg; // Uncomment this to see the full JSON response.
        $msgPHP = json_decode($msg, 1);
        /*
         * Since there can be no guarantee of the order of the calls when using websocket we need
         * to check that we have received a reply to the authorize call before sending the balance 
         * request.
         */
        if (isset($msgPHP["error"])) {
            echo $msgPHP["error"]["message"];
            $conn-&gt;close();
        }else if ($msgPHP["msg_type"] == 'authorize') {
            $conn-&gt;send('{"balance" : 1, "subscribe" :1  }'); // Subscribing means we will continue to receive balance updates until this script exits.  
        } else if ($msgPHP["msg_type"] == 'balance') {
            echo "current_balance is " . $msgPHP["balance"]["balance"] . "\n";
        }
    });
    $conn-&gt;send('{"authorize" : "' . $token . '"}');
}, function ($e) {
    echo "Could not connect: {$e-&gt;getMessage()}\n";
});