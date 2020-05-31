<?php
// session_start();
// if (isset($_SESSION['email']) || isset($_SESSION['fname']) || isset($_SESSION['lname'])) {
//     // User is not signed in
//     header('Location: ./dashboard.html'); //Redirect to login page
//     exit();
// }

?>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="./assets/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossorigin="anonymous" />
</head>

<body>

  <div id="alert" class="alert"></div>

  <div class="form">

      <ul class="tab-group">
        <li class="tab active"><a href="#signup">Register</a></li>
        <li class="tab"><a href="#login">Login</a></li>
      </ul>
      
      <div class="tab-content">
        <div id="signup">   
          <h1>Sign Up Here</h1>
          
          <form>
          
          <div class="top-row">
            <div class="field-wrap">
              <label>
                First Name<span class="req">*</span>
              </label>
              <input type="text" id="signup-fname" onblur="validateName(this)" required autocomplete="off" />
            </div>
        
            <div class="field-wrap">
              <label>
                Last Name<span class="req">*</span>
              </label>
              <input type="text" id="signup-lname" onblur="validateName(this)" required autocomplete="off"/>
            </div>
          </div>

          <div class="field-wrap">
            <label>
              Email Address<span class="req">*</span>
            </label>
            <input type="email" id="signup-email" onblur="validateEmail(this)" required autocomplete="off"/>
          </div>
          
          <div class="field-wrap">
            <label>
              Password<span class="req">*</span>
            </label>
            <input title="Password must contain atleast 8 Characters. Atleast one (Capital Letter & Small Letter & Numberic & Special Character)" type="password" id="signup-password" onblur="validatePassword(this)" required autocomplete="off"/>
            <i class="fas fa-eye" onclick="visible()" style="float: right; margin-top: -28px; margin-right: 8px; cursor: pointer;"></i>
          </div>

          <div class="field-wrap">
            <label>
              Confirm Password<span class="req">*</span>
            </label>
            <input type="password" id="signup-cpassword" onblur="validateCPassword(this)" required autocomplete="off"/>
            <i class="fas fa-eye" onclick="visible()" style="float: right; margin-top: -28px; margin-right: 8px; cursor: pointer;"></i>
          </div>
          
          <button id="signup-btn" type="submit" class="button button-block"/><i class="fa fa-user-plus" aria-hidden="true"></i> Sign up</button>
          
          </form>

        </div>
        
        <div id="login">   
          <h1>Welcome Back!</h1>
          
          <form action="/" method="post">
          
            <div class="field-wrap more">
            <label>
              Email Address<span class="req">*</span>
            </label>
            <input type="email" id="signin-email" onblur="validateEmail(this)" required autocomplete="off"/>
          </div>
          
          <div class="field-wrap more">
            <label>
              Password<span class="req">*</span>
            </label>
            <input type="password" id="signin-password" onblur="validatePassword(this)" required autocomplete="off"/>
          </div>
          
          <button id="signin-btn" type="submit" class="button button-block adjust"/><i class="fa fa-sign-in" aria-hidden="true"></i> Sign In</button>
          
          </form>

        </div>
        
      </div>
      
</div>

<script type="text/javascript" src="./assets/style.js"></script>

</body>

</html>