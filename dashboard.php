<?php
session_start();
if (!isset($_SESSION['email']) || !isset($_SESSION['fname']) || !isset($_SESSION['lname'])) {
    // User is not signed in
    header('Location: ./index.php'); //Redirect to login page
    exit();
}
?>

<html>
<head>
	<meta http-equiv="Cache-control" content="no-cache">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="./assets/dashboard.css">
</head>
<body>

    <div id="alert" class="alert"></div>
    
	<div class="container">
		
		<div class="sidebar">
			<nav>
				<a href="#">Compress<span>Image</span></a>
				<ul>
					<li class="side-tab active"><a href="#profile">Profile</a></li>
                    <li class="side-tab"><a href="./compress.php">Compress</a></li>
					<li id="logout">Log out</li>
				</ul>
			</nav>
		</div>

		<div class="main-content" id="profile">
			<div class="panel-wrapper">
				<div class="panel-head">
					Your Profile
				</div>
				<div class="panel-body">
					<table id="personal-details" class="details-table">
							<tr>
								<th scope="row">First Name</th>
								<td colspan="2"><input type="text" name="fname" placeholder="First Name" disabled value="" required></td>
								<th scope="row">Last Name</th>
								<td><input type="text" name="lname" placeholder="Last Name" disabled value="" required></td>
							</tr>
							<tr>
								<th scope="row">E-mail</th>
								<td colspan="2"><input type="email" name="email" placeholder="Email" disabled value="" required></td>
								<th scope="row">Photos Uploaded</th>
								<td><input type="text" name="photoscount" placeholder="No. of Photos" disabled value="" required></td>
							</tr>
							<tr>
								<th scope="row">Joined on</th>
								<td colspan="2"><input type="text" name="date" placeholder="Date" disabled value="" required></td>
								<th scope="row">At</th>
								<td><input type="text" name="time" placeholder="Time" disabled value="" required></td>
							</tr>
						</table>
				</div>
			</div>
			<div class="panel-wrapper">
				<div class="panel-head">
					Uploaded Images
				</div>
				<div class="panel-body">
					<div class="uploaded-preview" id="uploaded-preview">
						<!-- <img src="" id="uploaded-img"/> -->
						<!-- <p style="text-align: center; color: #00A5F2; margin: 10px auto;"></p> -->
						<!-- <button id="download-btn" type="submit" class="button button-block"/>Download</button> -->
					</div>
				</div>
			</div>
		</div>

	<script type="text/javascript" src="./assets/dashboard.js"></script>
</body>
</html>