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
					<li class="side-tab"><a href="./dashboard.php">Profile</a></li>
                    <li class="side-tab active"><a href="">Compress</a></li>
					<li id="logout">Log out</li>
				</ul>
			</nav>
		</div>
		<div class="main-content" id="compress">
			<h1>Compress</h1>
			<p>Your File (upto 5MB)</p>
			<div class="panel-wrapper">
				<div class="panel-head">
					Select the File
				</div>
				<div class="panel-body">
					<form>
                        <div class="cntn">
                            <input name="photo" type="file" id="upload" style="cursor: pointer;" />
                        </div>
                        <div class="preview">
						    <img src="" id="preview-img"/>
						    <p style="text-align: center; color: #00A5F2; margin: 10px auto;"></p>
						    <input type="number" name="quality" onblur="validateQuality(this)" class="quality-input" placeholder="Enter Compression Quality(Default - 75)">
					        <button id="compress-btn" type="submit" class="button button-block"/>Compress</button>
					</div>
					</form>
				</div>
			</div>
			<div class="panel-wrapper">
				<div class="panel-head">
					Compressed Preview
				</div>
				<div class="panel-body">
					<div class="compressed-preview">
						<img src="" id="preview-img"/>
						<p style="text-align: center; color: #00A5F2; margin: 10px auto;"></p>
						<button id="upload-btn" type="submit" class="button button-block"/>Upload</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="./assets/dashboard.js"></script>
</body>
</html>