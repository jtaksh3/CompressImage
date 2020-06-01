$(document).ready(function() {
	$('.nav-btn').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('.sidebar').slideToggle('fast');

		window.onresize = function(){
			if ($(window).width() >= 768) {
				$('.sidebar').show();
			} else {
				$('.sidebar').hide();
			}
		};
	});
});

//------------------------------------------ CUSTOM FILE VALIDATION START ---------------------------------------------

let upload = document.getElementById('upload');

function onFile() {
    let me = this,
        file = upload.files[0],
        name = file.name.replace(/\.[^/.]+$/, '');

    //VALIDATE THE FILE EXTENSION
    if (file.type === 'image/png' || 
        file.type === 'image/jpeg' ||
        file.type === 'image/gif' ||
        file.type === 'image/jpg') {

        //VALIDATE THE FILE SIZE
        if (file.size < (5000 * 1000)) {
            return file.size;
        } else {
            showError('Image size is too big');
            return false;
        }
    } else {
        return false;
        showError('Not a valid Image type')
    }
}

//--------------------------------------------- CUSTOM FILE VALIDATION END ---------------------------------------------

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

function readURL(input, size, counter) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
            
        reader.onload = function (e) {
            $('#preview-img').attr('src', e.target.result);
            $('.preview').css('display', 'block');
            $('.preview p').html('Original Size - ' + size + '' + counter);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#upload").change(function(){
    let size = onFile();
    let counter = 'B';
    if(size >= 1000) {
        counter = 'KB';
        size /= 1000;
        if(size >= 1000) {
            counter = 'MB';
            size /= 1000;
        }
    }
    if(size)
        readURL(this, size.toFixed(2), counter);
});

function validateQuality(input) {
    
    // if(input.value > 0) {

    if (input.value <= 100) {
      //Default border
      input.style.borderColor = "#fff";

      } else {
      //red border
      input.style.borderColor = "#e74c3c";
    }
 
    // }
}

$("#compress-btn").on("click", function(event) {
    event.preventDefault();

    if ($.trim($('input[name="quality"]').val()) > 0 
        && ($.trim($('input[name="quality"]').val()) > 100 
        || !$.isNumeric($('input[name="quality"]').val()))) {
    	showError("Please enter the Correct Compression Quality.")
    	return false;
    }

    //AJAX request for details form
    $.ajax({
      type: "POST",
      url: "/Assignment/bin/user/compress.php",
      cache: false,
      processData: false,
      contentType: false,
      data: new FormData($('form')[0]),

    success: function(response) {
        response = $.trim(response);
      if (response == "UNAUTHORIZED_ACCESS")
          showError(response);
      else if(response == "SERVER_ERROR")
          showError(response);
      else {
        //Server error
        let output = response.split('|');
        $('.compressed-preview').css('display', 'block');
        $('.compressed-preview img').attr('src', './bin/user/' + output[0]);
        let counter = 'B';
            if(output[1] >= 1000) {
            counter = 'KB';
            output[1] /= 1000;
            if(output[1] >= 1000) {
                counter = 'MB';
                output[1] /= 1000;
            }
        }
        $('.compressed-preview p').html('Compressed Size - ' + output[1].toFixed(2) + '' + counter);
      }
    },
  });
});

//----------------------------------------- AJAX REQUEST TO SUBMIT FORM END ---------------------------------------

// Make AJAX request to logout
$("#logout").on("click", function() {
    $.ajax({
        url: "./bin/user/logout.php",
        method: "POST",
        dataType: "text",
        data: {},
        success: function(response) {
            window.location.href = "./index.php";
        }
    });
});

function activeProfile() {
    var x = document.getElementById("profile-li");
    var y = document.getElementById("compress-li");
    y.classList.remove('active');
    x.classList.add('active');
    window.location.replace("./dashboard.html#profile");
}

function activeCompress() {
    var x = document.getElementById("profile-li");
    var y = document.getElementById("compress-li");
    x.classList.remove('active');
    y.classList.add('active');
    window.location.replace("./dashboard.html#compress");
}

// Make AJAX request to fetch user personal and college details
$.ajax({
  url: "./bin/user/process-profile.php",
  method: "GET",
  dataType: "json",
  contentType: "application/json",
  data: {
    getProfileDetails: true
  },
  success: function(response) {

    if (response.status == 1) {
      var profileDetails = response.data.profile;
    }
  }
});