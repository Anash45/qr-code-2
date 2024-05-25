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

// Generate the WiFi URL
$wifi_url = "WIFI:T:WPA;S:$ssid;P:$password;;";

// Redirect to the WiFi URL
header("Location: $wifi_url");
exit();
?>
