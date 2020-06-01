<?php 

include_once $_SERVER['DOCUMENT_ROOT'] . '/Assignment/bin/config/database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/Assignment/bin/user/user.php';

    session_start();
    if (!isset($_SESSION['email'])) {
        // User is not signed in
        exit('UNAUTHORIZED_ACCESS');
    }

    //Check if POST is set or not
    if (!isset($_POST['imageloc'])) {
        exit('SERVER_ERROR');
    }

    $email = $_SESSION['email'];

    $image = $_POST['imageloc'];

    $db = new Database();
        
    $userDB = $db->getUserDBConnection();
        
    $user = new User($userDB);

    $user->setEmail($email);

    if($user->uploadImage()) {
        exit('Success');
    }
    exit('Failed');