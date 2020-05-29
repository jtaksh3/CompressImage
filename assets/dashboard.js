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
        if (file.size < (3000 * 1024)) { 
            return true;
        } else {
            return false;
        }
    } else {
        return false;
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

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
            
        reader.onload = function (e) {
            $('#preview-img').attr('src', e.target.result);
            $('.preview').css('display', 'block');
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#upload").change(function(){
    if(onFile())
        readURL(this);
    else
        showError("Not a Valid Image");
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
        showSuccess(response);
      if (response == "UNAUTHORIZED_ACCESS")
          showError(response);
      else if(response == "SERVER_ERROR")
          showError(response);
      else {
        //Server error
        showError(response);
      }
    },
  });
});

//----------------------------------------- AJAX REQUEST TO SUBMIT FORM END ---------------------------------------