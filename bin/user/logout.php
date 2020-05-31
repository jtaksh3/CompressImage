<?php
session_start();
if (isset($_SESSION['email']) || isset($_SESSION['fname']) || isset($_SESSION['lname'])) {
    // unset session variables
    session_unset();
    // destroy the session
    session_destroy();

    return 'SUCCESS';
}
?>
