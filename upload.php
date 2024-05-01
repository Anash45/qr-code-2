<?php
// Check if the file was uploaded without errors
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    // Specify the directory to save the uploaded image
    $uploadDir = './assets/images/';

    // Generate a unique name for the image
    $fileName = uniqid() . '_' . $_FILES['image']['name'];

    // Move the uploaded file to the specified directory
    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $fileName)) {
        // Return the filename as a response
        echo $fileName;
    } else {
        // Return an error message
        echo 'Error moving file to directory';
    }
} else {
    // Return an error message
    echo 'Error uploading file';
}
?>