$(".form")
  .find("input")
  .on("keyup blur focus", function (e) {
    var $this = $(this),
      label = $this.prev("label");

    if (e.type === "keyup") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.addClass("active highlight");
      }
    } else if (e.type === "blur") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.removeClass("highlight");
      }
    } else if (e.type === "focus") {
      if ($this.val() === "") {
        label.removeClass("highlight");
      } else if ($this.val() !== "") {
        label.addClass("highlight");
      }
    }
  });

$(".tab a").on("click", function (e) {
  e.preventDefault();

  $(this).parent().addClass("active");
  $(this).parent().siblings().removeClass("active");

  target = $(this).attr("href");

  $(".tab-content > div").not(target).hide();

  $(target).fadeIn(600);
});

//------------------------------------------------ ALERT START ---------------------------------------------------------

function showError(msg) {
    $(".alert")
        .addClass("error-alert")
        .text(msg)
        .animate(
            {
                top: "40px",
                opacity: 1
            },
            500
        );

    setTimeout(function() {
        $(".alert").animate(
            {
                top: "0px",
                opacity: 0
            },
            500,
            function() {
                $(".alert").removeClass("error-alert");
            }
        );
    }, 5000);
}

function showSuccess(msg) {
    $(".alert")
        .addClass("success-alert")
        .text(msg)
        .animate(
            {
                top: "40px",
                opacity: 1
            },
            500
        );

    setTimeout(function() {
        $(".alert").animate(
            {
                top: "0px",
                opacity: 0
            },
            500,
            function() {
                $(".alert").removeClass("success-alert");
            }
        );
    }, 5000);
}

//------------------------------------------------- ALERT END ----------------------------------------------------------

//-------------------------------------------- ONBLUR VALIDATION START --------------------------------------------------

let text_constraint = /^[A-Za-z]+$/;
var email_constraint = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var password_constraint = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

function validateName(input) {

  if(!input.value.trim().length || !text_constraint.test(input.value)) {
      //RED BORDER
      input.style.borderColor = "#e74c3c";
  }
  //Default Border
  else {
    input.value = input.value[0].toUpperCase() + input.value.slice(1).toLowerCase();
    input.style.borderColor = "#a0b3b0";
  }
}

function validateEmail(input) {

        if (email_constraint.test(input.value)) {
          //Default border
          input.style.borderColor = "#a0b3b0";
          input.value = input.value.toLowerCase();

         } else {
          //red border
          input.style.borderColor = "#e74c3c";
        }
      
    }

function validatePassword(input) {

  if (password_constraint.test(input.value)) {

    //Default Border
    input.style.borderColor = "#a0b3b0";

  } else {
    //red border
    input.style.borderColor = "#e74c3c";
  }
}

function validateCPassword(input) {
  var first = document.getElementById("signup-password").value;

    if (input.value == first && password_constraint.test(input.value)) {
      //Default border
      input.style.borderColor = "#a0b3b0";

      } else {
      //red border
      input.style.borderColor = "#e74c3c";
    }
}

function togglePassword() {
  var x = document.getElementById("signup-password");
  var y = document.getElementById("toggle-signup-password");
  if (x.type === "password") {
    y.classList.remove("fa-eye");
    y.classList.add("fa-eye-slash");
    x.type = "text";
  } else {
    y.classList.remove("fa-eye-slash");
    y.classList.add("fa-eye");
    x.type = "password";
  }
}

function toggleCPassword() {
  var x = document.getElementById("signup-cpassword");
  var y = document.getElementById("toggle-signup-cpassword");
  if (x.type === "password") {
    y.classList.remove("fa-eye");
    y.classList.add("fa-eye-slash");
    x.type = "text";
  } else {
    y.classList.remove("fa-eye-slash");
    y.classList.add("fa-eye");
    x.type = "password";
  }
}

function toggleSPassword() {
  var x = document.getElementById("signin-password");
  var y = document.getElementById("toggle-signin-password");
  if (x.type === "password") {
    y.classList.remove("fa-eye");
    y.classList.add("fa-eye-slash");
    x.type = "text";
  } else {
    y.classList.remove("fa-eye-slash");
    y.classList.add("fa-eye");
    x.type = "password";
  }
}
//-------------------------------------------- ONBLUR VALIDATION END ----------------------------------------------------

//--------------------------------------- FORM VALIDATION ON SUBMIT START -----------------------------------------------

function validateFields(fname, lname, email, password, cpassword) {

  if (!$.trim(fname) || !$.trim(lname) || !$.trim(email) || !$.trim(password) || !$.trim(cpassword)) {
      return 'EMPTY_FIELDS';
  }
  if(!text_constraint.test(fname)) {
    return 'INVALID_FNAME';
  }
  if(!text_constraint.test(lname)) {
    return 'INVALID_LNAME';
  }
  if(!email_constraint.test(email)) {
    return 'INVALID_EMAIL';
  }
  if(!password_constraint.test(password)) {
    return 'INVALID_PASSWORD';
  }
  if(!(cpassword == password)) {
    return 'PASSWORD_DIFFERENT';
  }
}

//--------------------------------------- FORM VALIDATION ON SUBMIT START -----------------------------------------------

//----------------------------------------- SIGNING UP THE USER START ---------------------------------------------------

$("#signup-btn").on("click", function(event) {
    event.preventDefault();
    // Validate signup form details here
    let fname = $("#signup-fname").val();
    let lname = $("#signup-lname").val();
    let email = $("#signup-email").val();
    let password = $("#signup-password").val();
    let cpassword = $("#signup-cpassword").val();

    let validateResponse = validateFields(fname, lname, email, password, cpassword);

    if(validateResponse == 'EMPTY_FIELDS') {
      showError("Empty Fields!!!");
      return false;
    }
    else if(validateResponse == 'INVALID_FNAME') {
      showError("The Provided First Name is not a Valid First Name");
      return false;
    }
    else if(validateResponse == 'INVALID_LNAME') {
      showError("The Provided Last Name is not a Valid Last Name");
      return false;
    }
    else if(validateResponse == 'INVALID_EMAIL') {
      showError("The Provided Email is not a Valid Email");
      return false;
    }
    else if(validateResponse == 'INVALID_PASSWORD') {
      showError("The Provided Password is not a Valid Password");
      return false;
    }
    else if(validateResponse == 'PASSWORD_DIFFERENT'){
      showError("The Provided Confirm Password doesn't Matched")
      return false;
    }

    //AJAX request for signup form
    $.ajax({
        url: "/Assignment/bin/user/signup.php",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            fname: fname,
            lname: lname,
            email: email,
            password: password
        }),
        beforeSend: function() {
            //Show loader before sending ajax request
            $("#signup-btn")
                .html('<i class="fa fa-circle-o-notch fa-spin"></i>   Signing up')
                .css("pointer-events", "none");
            $("#signup-fname").val("");
            $("#signup-lname").val("");
            $("#signup-email").val("");
            $("#signup-password").val("");
            $("#signup-cpassword").val("");
        },
        success: function(response) {

            $("#signup-btn")
                .html(
                    '<i class="fa fa-user-plus" aria-hidden="true"></i> Sign up'
                )
                .css("pointer-events", "auto");

            $("#signup-fname").val("");
            $("#signup-lname").val("");
            $("#signup-email").val("");
            $("#signup-password").val("");
            $("#signup-cpassword").val("");

            if (response.code == "SIGNUP_SUCCESS") {
                //Allow user to login now
                showSuccess(
                    "Successfully Signed up ! "
                );
            } else if (response.code == "USER_ALREADY_EXIST") {
                //User is already registered
                showError(
                    "User Already Exist"
                );

            } else if (response.code == "FORM_NOT_SUBMITTED") {
                //User has not submitted the form
                showError("Server error. Try again later.");

            } else {
                //Server error
                showError("Server error. Try again later.");

            }
        },
        error: function(request, error) {

            //Hide loader after receiving request
            $("#signup-btn")
                .html(
                    '<i class="fa fa-user-plus" aria-hidden="true"></i> Sign up'
                )
                .css("pointer-events", "auto");
            showError("Server error. nu Try again later.");

        }
    });
});

//------------------------------------------ SIGNING UP THE USER END ---------------------------------------------------

//----------------------------------------- SIGNING IN THE USER START --------------------------------------------------

$("#signin-btn").on("click", function(event) {

    event.preventDefault();

    let email = $("#signin-email").val();
    let password = $("#signin-password").val();

    if (!$.trim(email) || !$.trim(password)) {
        showError("Felds can't be Empty");
        return false;
    }

    //AJAX request for signin form
    $.ajax({
        url: "/Assignment/bin/user/signin.php",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            password: password
        }),
        beforeSend: function() {
            //Show loader before sending ajax request
            $("#signin-btn")
                .html('<i class="fa fa-exchange" aria-hidden="true"></i> Please Wait')
                .css("pointer-events", "none");
            $("#sigin-email").val("");
            $("#signin-password").val("");
        },
        success: function(response) {

            $("#sigin-email").val("");
            $("#signin-password").val("");

            if (response.code == "SIGNIN_SUCCESS") {
                //User credentials has been successfully validated
                $("#signin-btn")
                    .html('<i class="fa fa-spinner fa-spin"></i>   Signing in')
                    .css("pointer-events", "auto");
                window.location.href = "./dashboard.html";

            } else if (response.code == "SIGNIN_FAILED") {
                //User has provided invalid credentials or is not registered
                $("#signin-btn")
                    .html('<i class="fa fa-user-plus" aria-hidden="true"></i> Sign in')
                    .css("pointer-events", "auto");
                showError("Invalid Login Credentials");

            } else if (response.code == "FORM_NOT_SUBMITTED") {
                //User has not submitted the form
                $("#signin-btn")
                    .html('<i class="fa fa-user-plus" aria-hidden="true"></i> Sign in')
                    .css("pointer-events", "auto");
                showError("Server error. Try again later.");
            } else {
                //Server error
                $("#signin-btn")
                    .html('<i class="fa fa-user-plus" aria-hidden="true"></i> Sign in')
                    .css("pointer-events", "auto");
                showError("Server error. Try again later.");
            }
        },
        error: function(request, error) {

            $("#signin-btn")
                .html('<i class="fa fa-user-plus" aria-hidden="true"></i> Sign up')
                .css("pointer-events", "auto");
            showError("Server error. Try again later.");
        }
    });
});

//------------------------------------------ SIGNING IN THE USER END ---------------------------------------------------
