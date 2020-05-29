<?php

    include_once $_SERVER['DOCUMENT_ROOT'] . '/Assignment/bin/config/database.php';
    include_once $_SERVER['DOCUMENT_ROOT'] . '/Assignment/bin/user/user.php';

    
    $body = file_get_contents('php://input');
    $body = json_decode($body, true);

    
    if(isset($body['email']) && isset($body['password'])){

        
        $db = new Database();
        
        $userDB = $db->getUserDBConnection();
            
        
        $user = new User($userDB);

        $user->setEmail($body['email']);
        $user->setPassword($body['password']);

        
        $response = $user->login();
            
        if($response == 'CREDENTIALS_VALID'){
            
            session_start();
            
            $_SESSION['email'] = $user->getEmail();
            $_SESSION['fname'] = $user->getFname();
            $_SESSION['lname'] = $user->getLname();
            
            exit(json_encode(array("code" => 'SIGNIN_SUCCESS')));

        } else if($response == 'CREDENTIALS_INVALID'){
            
            exit(json_encode(array("code" => 'SIGNIN_FAILED')));

        }
        else{
            
            exit(json_encode(array("code" => 'SERVER_ERROR')));

        }
    } else{
        
        exit(json_encode(array("code" => 'FORM_NOT_SUBMITTED')));

    }
?>