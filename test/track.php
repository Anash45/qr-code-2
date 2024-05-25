<?php
// Log the scan (this is a simple example, you may want to log it in a database or a file)
$logfile = 'scans.log';
$logdata = date('Y-m-d H:i:s') . ' - ' . $_SERVER['REMOTE_ADDR'] . "\n";
file_put_contents($logfile, $logdata, FILE_APPEND);

// Get the Wi-Fi details from the URL parameter
$wifiDetails = $_GET['wifi'];

// Extract the Wi-Fi details for display
$wifiDetailsDecoded = urldecode($wifiDetails);
preg_match('/WIFI:T:(.*?);S:(.*?);P:(.*?);;/', $wifiDetailsDecoded, $matches);
$encryption = $matches[1];
$ssid = $matches[2];
$password = $matches[3];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connect to Wi-Fi</title>
</head>
<body>
    <h1>Connect to Wi-Fi</h1>
    <p>SSID: <?php echo htmlspecialchars($ssid); ?></p>
    <p>Password: <?php echo htmlspecialchars($password); ?></p>
    <p>Encryption: <?php echo htmlspecialchars($encryption); ?></p>

    <script>
        // Function to prompt the user to connect to the Wi-Fi network
        function connectToWiFi(ssid, password, encryption) {
            if (navigator.userAgent.match(/Android/i)) {
                // Android-specific Wi-Fi connection
                window.location.href = `intent://scan/?ret=${encodeURIComponent(wifiDetails)}#Intent;scheme=wifi;package=com.google.zxing.client.android;end;`;
            } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                // iOS-specific Wi-Fi connection
                alert('iOS does not support automatic Wi-Fi connections via QR code in the browser. Please go to your Wi-Fi settings and connect manually.');
            } else {
                alert('Please connect to the Wi-Fi network manually.');
            }
        }

        // Extract Wi-Fi details from the PHP variables
        var ssid = "<?php echo $ssid; ?>";
        var password = "<?php echo $password; ?>";
        var encryption = "<?php echo $encryption; ?>";
        var wifiDetails = `WIFI:T:${encryption};S:${ssid};P:${password};;`;

        // Call the function to prompt the user
        connectToWiFi(ssid, password, encryption);
    </script>
</body>
</html>
