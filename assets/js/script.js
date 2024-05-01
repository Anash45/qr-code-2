let qrOptions = {
    width: 300,
    height: 300,
    type: "svg",
    data: "https://www.example.com/",
    image: '',
    dotsOptions: {
        color: "#000000",
        type: "rounded"
    },
    cornersSquareOptions: {
        color: "#000000",
        type: "dot"
    },
    cornersDotOptions: {
        color: "#000000",
        type: "dot"
    },
    backgroundOptions: {
        color: "#FFFFFF",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
        imageSize: 0.8
    }
};

const qrCode = new QRCodeStyling(qrOptions);

qrCode.append(document.getElementById("qrCanvas"));

function updateQR(options) {
    qrCode.update(options);
}
$('#dimensions').on('mousemove', function () {
    $('.extension').html(this.value);
})
$('#qrOptionsColor').on('change', function () {
    qrOptions.dotsOptions.color = this.value;
    updateQR(qrOptions);
})

$('#qrBackgroundOptionsColor').on('change', function () {
    qrOptions.backgroundOptions.color = this.value;
    updateQR(qrOptions);
})

$('#qrEyeFrameColor').on('change', function () {
    qrOptions.cornersSquareOptions.color = this.value;
    updateQR(qrOptions);
})
$('#qrEyeBallColor').on('change', function () {
    qrOptions.cornersDotOptions.color = this.value;
    updateQR(qrOptions);
})

$('#qrOptionsType').on('change', function () {
    qrOptions.dotsOptions.type = this.value;
    updateQR(qrOptions);
})
$('#qrEyeBallType').on('change', function () {
    qrOptions.cornersDotOptions.type = this.value;
    updateQR(qrOptions);
})
$('#qrEyeFrameType').on('change', function () {
    qrOptions.cornersSquareOptions.type = this.value;
    updateQR(qrOptions);
})


function downloadQR() {
    let dimensions = $('#dimensions').val();
    qrOptions.width = parseInt(dimensions);
    qrOptions.height = parseInt(dimensions);
    updateQR(qrOptions);

    let extension = $('.extension:checked').val();
    qrCode.download({ name: "qrCode", extension: extension });
    $('.qr-canvas').css({
        "opacity": 0
    })
    setTimeout(() => {
        qrOptions.width = parseInt(300);
        qrOptions.height = parseInt(300);
        updateQR(qrOptions);
        $('.qr-canvas').css({
            "opacity": 1
        })
    }, 500);
}

function createQR() {
    let data = '';
    let activeTab = $('.tab-pane.active').data('tab');
    console.log(activeTab);
    if (activeTab == 'url') {
        data = $('#url').val();
    } else if (activeTab == 'text') {
        data = $('#text').val();
    } else if (activeTab == 'contact') {
        let phone = $('#phone').val();
        data = getPhone(phone)
    } else if (activeTab == 'wifi') {
        let ssid = $('#ssid').val();
        let password = $('#password').val();
        let encryption = $('#encryption').val();
        data = getWifi(ssid, password, encryption);
    } else if (activeTab == 'location') {
        let longitude = $('#longitude').val();
        let latitude = $('#latitude').val();
        data = getLocation(latitude, longitude);
    } else if (activeTab == 'vcard') {
        let firstname = $('#firstname').val();
        let lastname = $('#lastname').val();
        let organization = $('#organization').val();
        let position = $('#position').val();
        let phone_work = $('#phone_work').val();
        let phone_private = $('#phone_private').val();
        let phone_mobile = $('#phone_mobile').val();
        let fax_work = $('#fax_work').val();
        let fax_private = $('#fax_private').val();
        let email = $('#email').val();
        let website = $('#website').val();
        let street = $('#street').val();
        let zipcode = $('#zipcode').val();
        let city = $('#city').val();
        let state = $('#state').val();
        let country = $('#country').val();
        data = getVCard(
            firstname,
            lastname,
            organization,
            position,
            phone_work,
            phone_private,
            phone_mobile,
            fax_work,
            fax_private,
            email,
            website,
            street,
            zipcode,
            city,
            state,
            country
        );
    }

    qrOptions.data = data;
    updateQR(qrOptions);
}
function getVCard(
    firstname,
    lastname,
    organization,
    position,
    phone_work,
    phone_private,
    phone_mobile,
    fax_work,
    fax_private,
    email,
    website,
    street,
    zipcode,
    city,
    state,
    country
) {
    // Construct the vCard data string in the format for version 3.0
    let vCardData = `BEGIN:VCARD\n` +
        `VERSION:3.0\n` +
        `N:${lastname};${firstname};;;\n` +
        `ORG:${organization}\n` +
        `TITLE:${position}\n` +
        `TEL;TYPE=WORK:${phone_work}\n` +
        `TEL;TYPE=HOME:${phone_private}\n` +
        `TEL;TYPE=CELL:${phone_mobile}\n` +
        `TEL;TYPE=FAX:${fax_work}\n` +
        `TEL;TYPE=FAX:${fax_private}\n` +
        `EMAIL:${email}\n` +
        `URL:${website}\n` +
        `ADR;TYPE=WORK:;;${street};${city};${state};${zipcode};${country}\n` +
        `END:VCARD`;

    // Return the vCard data string
    return vCardData;
}
function getLocation(latitude, longitude) {
    // Construct the location data string in the format:
    // geo:latitude,longitude
    let locationData = `geo:${latitude},${longitude}`;

    // Return the location data string
    return locationData;
}
function getWifi(ssid, password, encryption) {
    // Construct the Wi-Fi network data string in the format:
    // WIFI:S:ssid;T:encryption;P:password;;
    let wifiData = `WIFI:S:${ssid};T:${encryption};P:${password};;`;

    // Return the Wi-Fi network data string
    return wifiData;
}
function getPhone(number) {
    // Check if the number already starts with '+'
    if (number.startsWith('+')) {
        // If the number starts with '+', return it as it is
        return number;
    } else {
        // Otherwise, add '+' prefix to the number
        return '+' + number;
    }
}

$(document).ready(function () {
    $('#imageInput').change(function () {
        // Get the selected file
        var file = this.files[0];

        // Check if the selected file is an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        // Check if the selected image is smaller than 2 MB
        if (file.size > 2 * 1024 * 1024) {
            alert('Image size exceeds 2 MB limit.');
            return;
        }

        // Create a FormData object to send the file data
        var formData = new FormData();
        formData.append('image', file);

        // Send the file to the server using AJAX
        $.ajax({
            url: './upload.php', // Specify the URL to upload the file
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                // Handle the response from the server
                console.log('Image uploaded successfully:', response);
                qrOptions.image = './assets/images/'+response;
                updateQR(qrOptions);
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error('Error uploading image:', error);
            }
        });
    });
});

// $('#download').on('click', downloadQR);