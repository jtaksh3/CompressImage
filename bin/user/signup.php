<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/Assignment/bin/config/database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/Assignment/bin/user/user.php';


$body = file_get_contents('php://input');
$body = json_decode($body, true);

    
    if (isset($body['fname']) && isset($body['lname']) && isset($body['email']) && isset($body['password'])) {

        $fname = $body['fname'];
        $lname = $body['lname'];
        $email = $body['email'];  
        $password = $body['password']; 

        
        $db = new Database();
        
        $userDB = $db->getUserDBConnection();

        
        $user = new User($userDB);

        
        $user->setFName($fname);
        $user->setLName($lname);
        $user->setEmail($email);
        $user->setPassword($password);
        $user->setCreated(date('Y-m-d H:i:s'));

        
        $response = $user->signup();

        if ($response == 'SIGNUP_SUCCESS') {
            
            exit(json_encode(array("code" => $response)));

        } else if ($response == 'USER_ALREADY_EXIST') {
            
            exit(json_encode(array("code" => $response)));
            
        } else {
            
            exit(json_encode(array("code" => 'SERVER ERROR')));

        }
    } else {
    
        exit(json_encode(array("code" => 'FORM_NOT_SUBMITTED')));
    
    }
?>