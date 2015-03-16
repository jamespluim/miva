miva
====

Tell a Friend using Magnific Popup

1) Make sure that the required JS/CSS files are included<br />
	- jquery.responsiveTabs.min.js<br />
	- magnific-popup.css<br /><br />

2) Add the following HTML markup for you tell a friend link
```html
<li class="email"><a href="#taf-popup" id="taf"><span data-icon="&#xe076;"></span></a></li>
```

3) Add the following form in the PROD page footer
```html
 <!-- Tell a Friend modal Starts -->
<div id="taf-popup" class="white-popup">
	<div>
		<div>
			<div class="modal-header">
				<h4>Tell a Friend</h4>
			</div>
			<div class="modal-body">
                <form method="post" action="../forms/tafForm.php" id="tell-a-friend">
                    <div id="js-validation-errors" class="message message-error" style="display: none;"></div>
                    <div id="js-processing" class="hide"><img src="../images/preloader.GIF" alt="Processing..." title="Processing..."></div>
                    <div id="js-success" class="message message-success hide">
                        Your message has been sent. Thank you for sharing.<br>
                        <span id="continue-shopping-taf">Click <a href="http://&mvte:global:domain:name;/c/&mvte:global:category_code;.html">here</a> to continue shopping.</span>
                    </div>
                    <div id="js-error" class="message message-error hide">
                        An error has occured. Please try your request again.
                    </div>
                    <fieldset class="nm">
                        <div class="form-row clearfix">
                            <label for="js-tafName" title="Your Name" class="required">Your Name:</label>
                            <div>
                                <input type="text" name="tafName" value="" id="js-tafName" class="input">
                            </div>
                        </div>
                        <div class="form-row clearfix">
                            <label for="js-tafEmail" title="Your Email" class="required">Your Email:</label>
                            <div>
                                <input type="email" name="tafEmail" value="" id="js-tafEmail" class="input">
                            </div>
                        </div>
                        <div class="form-row clearfix">
                            <label for="js-tafFriendEmail" title="Friend's Email" class="required">Friend's Email:</label>
                            <div>
                                <input type="email" name="tafFriendEmail" value="" id="js-tafFriendEmail" class="input">
                            </div>
                        </div>
                        <div class="form-row clearfix">
                            <label for="l-tafComment" title="Your Message" class="required">Your Message:</label>
                            <div>
                                <textarea name="tafComment" rows="5" cols="40" id="l-tafComment" class="input"></textarea>
                            </div>
                        </div>
                        <div class="form-row clearfix">
                            <div class="row">
                                <div class="column half align-left">
                                    <input type="reset" value="Cancel" title="Cancel" class="button bg-gray align-left charcoal" id="cancel-taf">
                                </div>
                                <div class="column half align-right">
                                    <input type="submit" value="Send" title="Send" class="button bg-sky">
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="prodName" value="&mvt:product:name;">
                        <input type="hidden" name="prodURL" value="&mvt:global:socialprodurl;">
                        <input type="hidden" name="storeName" value="&mvt:store:name;">
                        <input type="hidden" name="storeURL" value="&mvt:global:socialsiteurl;">
                        <input type="hidden" name="storeEmail" value="">
                    </fieldset>
                </form>
			</div>
			<div class="modal-footer">
			</div>
		</div>
	</div>
</div>
<!-- Tell a Friend Modal ends -->
```

4) Include the following in your scripts.js file
```javascript
// ---- Tell A Friend Control ---- //
	$("#taf").magnificPopup({
		type:'inline',
		alignTop: false,
		closeBtnInside: true
	});

    $('#cancel-taf').on('click', function() {
       $.magnificPopup.close();
    }); 

$('#taf-popup form').on('submit', function(e) {
    var tafName = $('#js-tafName').val(),
        tafEmail = $('#js-tafEmail').val(),
        tafFriendEmail = $('#js-tafFriendEmail').val(),
        errorMessagesWrap = $('#js-validation-errors');
    	errorMessagesWrap.html('');
   if (tafName.length == 0) {
			errorMessagesWrap.fadeIn().append('Please enter your name!<br />');
			e.preventDefault();
    } else if (!isValidEmailAddress(tafEmail)) {
			errorMessagesWrap.fadeIn().append('Your email address is invalid!<br />');
			e.preventDefault();
    } else if (!isValidEmailAddress(tafFriendEmail)) {
			errorMessagesWrap.fadeIn().append('Your friend\'s email address is invalid!<br />');
			e.preventDefault();
    } else {
			// Check the form is not currently submitting
			if ($(this).data('formstatus') !== 'submitting') {
				// Set up variables
				var form = $(this),
					formData = form.serialize(),
					formUrl = form.attr('action'),
					formMethod = form.attr('method')
				
				// Add status data to form
				form.data('formstatus', 'submitting');
				
				// Show processing message
				$('#js-processing').show();
				
				// Send data to server for validation
				$.ajax({
					url: formUrl,
					type: formMethod,
					data: formData,
					success: function(data, textStatus, jqXHR) {
						// Hide processing message, show success message and reset formstatus
						$('#js-processing').hide();
						if (data.search(/error/i) != -1) {
							$('#js-error').text(data).removeClass('hide');
						}
						else {
							$('#js-success').removeClass('hide');
						};
						form.data('formstatus', 'idle');
					},
					error: function (jqXHR, textStatus, errorThrown) {
						// Hide processing message, show error message and reset formstatus
						console.log(errorThrown);
						form.data('formstatus', 'idle');
					}
				});
			};
		};
    
    e.preventDefault();
        
});
```

6) Don't forget to add the preloader.gif file to your images folder