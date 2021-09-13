&lt;?php
/*
 * This is an example of using PHP to subscribe to a tick stream.
 * The example uses the ratchetphp/Pawl library.  
 * To run this example 
 * - Save it to a new directory as `ticks.php`.
 * - In the new directory download and install composer as explained here https://getcomposer.org/download/.
 * - Run `php composer.phar require ratchet/pawl`.
 * - Edit the example and change the app_id and the API token. 
 * - Then run `php ticks.php`.
 */

require __DIR__ . '/vendor/autoload.php';
$myAppId = 1089; // Change this to your app_id. 
\Ratchet\Client\connect('wss://ws.binaryws.com/websockets/v3?app_id='.$myAppId)-&gt;then(function($conn) {
    $conn-&gt;on('message', function($msg) use ($conn) {
        //echo $msg."\n"; // Uncomment to see full JSON reply.
        $msgPHP = json_decode($msg, 1); 

        if (isset($msgPHP["error"])) { 
            echo $msgPHP["error"]["message"];
            $conn-&gt;close();
        }else if (isset($msgPHP["tick"])) {
            $tick = $msgPHP["tick"]; 
            echo ("Ask: ".$tick["ask"]. " Bid: ". $tick["bid"]."\n");;    
        }else {
            echo ("received ". $msgPHP['msg_type']."\n");
        }
    });

    $conn-&gt;send('{"ticks" : "R_100"}');
}, function ($e) {
    echo "Could not connect: {$e-&gt;getMessage()}\n";
});