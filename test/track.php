<?php
// track.php

// Retrieve query parameters
$ssid = $_GET['ssid'];
$password = $_GET['password'];

// Get client information
$ip_address = $_SERVER['REMOTE_ADDR'];
$user_agent = $_SERVER['HTTP_USER_AGENT'];
$timestamp = date('Y-m-d H:i:s');

// Log scan details to a file or database
$log_entry = "$timestamp, $ip_address, $user_agent, SSID: $ssid, PASSWORD: $password\n";
file_put_contents('scans.log', $log_entry, FILE_APPEND);

// Check if the device is an iOS device
if (strpos($user_agent, 'iPhone') !== false || strpos($user_agent, 'iPad') !== false || strpos($user_agent, 'iPod') !== false) {
    // Display a message and a normal QR code for iOS devices
    echo "<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>WiFi Connection</title>
</head>
<body>
    <h1>Join Our WiFi Network</h1>
    <p>WiFi connection via URL is not available on iOS devices. Please scan the QR code below to join the network:</p>
    <img src='https://api.qrserver.com/v1/create-qr-code/?data=WIFI%3AT%3AWPA%3BS%3A$ssid%3BP%3A$password%3B%3B&size=200x200' alt='WiFi QR Code'>
    <p>Network SSID: $ssid</p>
    <p>Password: $password</p>
</body>
</html>";
} else {
    // Generate the WiFi URL
    $wifi_url = "WIFI:T:WPA;S:$ssid;P:$password;;";
    
    // Redirect to the WiFi URL
    header("Location: $wifi_url");
    exit();
}
?>
