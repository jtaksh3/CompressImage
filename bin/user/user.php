<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/Assignment/bin/config/database.php';

class User
{
    private $conn;

    private $login_credentials = "Login_Credentials";
    private $user_per_details = "Image";

    private $email;
    private $password;
    private $fname;
    private $lname;
    private $created;
    
    function __construct($db)
    {
        $this->conn = $db;
    }

    //Getters

    public function getEmail()
    {
        return $this->email;
    }

    public function getFName()
    {
        return $this->fname;
    }

    public function getLName()
    {
        return $this->lname;
    }

    // Setters

    public function setFName($fname)
    {
        $this->fname = $fname;
    }

    public function setLName($lname)
    {
        $this->lname = $lname;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function setCreated($created)
    {
        $this->created = $created;
    }

    // Function to signup the user
    public function signup()
    {
        if ($this->doesAlreadyExist()) {
            return 'USER_ALREADY_EXIST';
        }

        // Query to insert record
        $query = "INSERT INTO " . $this->login_credentials . "(FName, LName, Email, Password, Created) VALUES(:fname, :lname, :email, :password, :created)";
        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize form data
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->fname = htmlspecialchars(strip_tags($this->fname));
        $this->lname = htmlspecialchars(strip_tags($this->lname));


        // Pass password through the hash function
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);

        // Bind values
        $stmt->bindParam(":fname", $this->fname);
        $stmt->bindParam(":lname", $this->lname);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":created", $this->created);

        //Execute Query
        if ($stmt->execute()) {

            $per_query = "INSERT INTO " . $this->user_per_details . "(Email) VALUES (:email)";
            $per_stmt = $this->conn->prepare($per_query);
            $per_stmt->bindParam(":email", $this->email);
            if ($per_stmt->execute() == false) 
                return 'SIGNUP_FAILED';
            else 
                return 'SIGNUP_SUCCESS';
        }
        return 'SIGNUP_FAILED';
    }

    // Function to login the user
    public function login()
    {
        // Sanitize data
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));

        /* Get user's unique hash */
        $query = "SELECT Fname, Lname, Email, Password FROM " . $this->login_credentials . " WHERE Email='" . $this->email . "'";
        // Prepare query statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        // Fetch a row
        $result = $stmt->fetch();
        if ($result == false) {
            // No rows has been sent by DB
            return 'CREDENTIALS_INVALID';
        }

        // Check if password matched or not
        if (!password_verify($this->password, $result['Password'])) {
            // Password didn't matched
            return 'CREDENTIALS_INVALID';
        }

        $this->email = $result['Email'];
        $this->fname = $result['Fname'];
        $this->lname = $result['Lname'];
        // User can login now
        return 'CREDENTIALS_VALID';
    }

    // Function to check if the user already exist in db or not
    public function doesAlreadyExist()
    {
        $query = "SELECT Email FROM " . $this->login_credentials . " WHERE Email='" . $this->email . "'";
        // Prepare query statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        // Fetch a row
        $result = $stmt->fetch();
        // If nothing is returned, $result will be false
        if ($result == false)
            return false;
        return true;
    }

}