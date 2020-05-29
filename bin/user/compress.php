<?php 

    session_start();
    if (!isset($_SESSION['email'])) {
        // User is not signed in
        exit('UNAUTHORIZED_ACCESS');
    }

    //Check if POST is set or not
    if (!isset($_POST['quality'])) {
        exit('SERVER_ERROR');
    }

    $email = $_SESSION['email'];

    $quality = $_POST['quality'];

    if (!file_exists('uploads/'. $email)) {
        mkdir('uploads/' . $email);
    }

    $fileName = ($_FILES["photo"]["name"]);
         
    $image = $_FILES['photo']['tmp_name'];
    $fileName = compress_image($image, 'uploads/' . $email . '/' . $fileName, 80);

    function compress_image($source, $destination, $quality)
    {
        $info = getimagesize($source);
        if ($info['mime'] == 'image/jpeg') $image = imagecreatefromjpeg($source);
        elseif ($info['mime'] == 'image/gif') $image = imagecreatefromgif($source);
        elseif ($info['mime'] == 'image/png') $image = imagecreatefrompng($source);
        imagejpeg($image, $destination, $quality);

        exit($destination);
    }

?>