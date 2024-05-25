<?php
// Wi-Fi details
$ssid = 'MyNetwork';
$password = 'MyPassword';
$encryption = 'WPA';

// Encode Wi-Fi details in a URL format
$wifiDetails = 'WIFI:T:' . $encryption . ';S:' . $ssid . ';P:' . $password . ';;';

// Your tracking URL
$trackLink = 'https://portfolio.f4futuretech.com/qr-code-2/track.php?wifi=' . urlencode($wifiDetails);

// Generate the QR code URL using Google Charts API
$qrCodeUrl = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' . urlencode($trackLink);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wi-Fi QR Code</title>
</head>
<body>
    <h1>Scan this QR Code to connect to Wi-Fi</h1>
    <img src="<?php echo $qrCodeUrl; ?>" alt="Wi-Fi QR Code">
</body>
</html>
