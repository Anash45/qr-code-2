<?php

// Generate the WiFi URL
$wifi_url = "WIFI:T:WPA;S:$ssid;P:$password;;";

// Redirect to the WiFi URL
header("Location: $wifi_url");
// exit();

?>