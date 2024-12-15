1.login and signup :

implemented the google V2_captcha for both the pages. validation at both front end and back end. defined site key in the login.html and signup.html and the secret key in settings.py(for backend validation).

views.py:  login_api---> for login page(with proper authentication) &&  signup_apim---> for signup page 

models.py: ArtistMasterBasic(auth_user_model)---> to save the signup form data in the database.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.artist-profile-setting_update_one :

created customscript.js in the static folder---- defined the functions to update the personal details , professional details,others(including change password).

views.py: update_personal_details_api---> for personal details form ,
update_professional_details_api---> for professional details form, 
update_other_details_api---> for other details form(includes artist password change)  

models.py: ArtistMasterAdditional ----> to save the personal_details, professional_details, other_details data in the database.

