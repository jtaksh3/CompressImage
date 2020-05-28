<?php
    
    class Database{
        // Specify db credentials
        private $host;
        private $user_db_name;
        private $username;
        private $password;
        public $conn;

        // Constructor to configure db
        public function __construct(){
            // Import db config file
            require $_SERVER['DOCUMENT_ROOT'] . '/Assignment/bin/config/dbconfig.php';
            $this->host = $db_host;
            $this->user_db_name = $user_db;
            $this->username = $db_username;
            $this->password = $db_password;
        }

        // Get the user's db connection
        public function getUserDBConnection(){
            $this->conn = null;
            //Connect to db
            try{
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->user_db_name, $this->username, $this->password);
                $this->conn->exec("set names utf8");
            }catch(PDOException $exception){
                echo "Connection error: " . $exception->getMessage();
            }
            return $this->conn;
        }

        public function __destruct(){
            $conn = null;
        }
    }
?>