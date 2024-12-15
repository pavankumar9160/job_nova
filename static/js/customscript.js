$(document).ready(function() {
    console.log("loaded")
        // update personal details form
    $('#personalDetailsForm').on('submit', function(event) {
        console.log("hi")
        event.preventDefault();

        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var gender = document.getElementById("gender").value;
        var dob = document.getElementById("dob").value;
        var country = document.getElementById("Country").value;
        var address = document.getElementById("address").value;
        var description = document.getElementById("description").value;
        var introduction = document.getElementById("introduction").value;
        var languages_read = document.getElementById("languages_read").value;
        var languages_write = document.getElementById("languages_write").value;
        var languages_speak = document.getElementById("languages_speak").value;
        var facebook_link = document.getElementById("facebook_link").value;
        var instagram_link = document.getElementById("instagram_link").value;
        var linkedin_link = document.getElementById("linkedin_link").value;
        var email = document.getElementById("email2").value;
        var contact_number = document.getElementById("phone").value;
        var profile_picture = document.getElementById("profile_picture").files[0];


        var formData = new FormData();

        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('gender', gender);
        formData.append('dob', dob);
        formData.append('country', country);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('introduction', introduction);
        formData.append('languages_read', languages_read);
        formData.append('languages_write', languages_write);
        formData.append('languages_speak', languages_speak);
        formData.append('facebook_link', facebook_link);
        formData.append('instagram_link', instagram_link);
        formData.append('linkedin_link', linkedin_link);
        formData.append('email', email);
        formData.append('contact_number', contact_number);
        formData.append('profile_picture', profile_picture);
        formData.append('skills', selectedSkills.join(','));

        $.ajax({
            url: '/update_personal_details_api/',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                toastr.success('Personal Details Updated successfully!', 'Success');
                const inputFields = ["firstname", "lastname", "gender", "dob", "Country", "address", "description", "introduction", "languages_read", "languages_write", "languages_speak", "facebook_link", "instagram_link", "linkedin_link", "email2", "phone", "profile_picture"];
                inputFields.forEach(fieldId => {
                    document.getElementById(fieldId).value = "";

                    $(".skill-checkbox").prop('checked', false);

                });
            },
            error: function(xhr) {
                var errors = xhr.responseJSON;
                var firstKey = Object.keys(errors)[0];
                var firstError = errors[firstKey][0];
                toastr.error(firstError, 'Error');
            }
        });
    });


    // update professionaldetails form
    $(document).on('click', '#submit2', function(e) {
        console.log("hi");
        e.preventDefault();


        var job_title = document.getElementById("job_title").value;
        var company_name = document.getElementById("company_name").value;
        var experience = document.getElementById("experience").value;
        var portfolio = document.getElementById("portfolio").value;
        var short_bio = document.getElementById("short_bio").value;
        var availability = document.getElementById("availability").value;

        var certifications = document.getElementById("certifications").value;
        var published_works = document.getElementById("published_works").value;
        var awards = document.getElementById("awards").value;
        var selectedSkills = [];
        $(".skill-checkbox:checked").each(function() {
            selectedSkills.push($(this).val());
        });

        if (!job_title || !company_name || !experience || !portfolio || !short_bio || !availability || !certifications || !published_works || !awards) {
            toastr.error("please fill all the details")

            return
        }

        // Create a FormData object
        var formData = new FormData();

        // Append form data manually
        formData.append('job_title', job_title);
        formData.append('company_name', company_name);
        formData.append('experience', experience);
        formData.append('portfolio', portfolio);
        formData.append('short_bio', short_bio);
        formData.append('availability', availability);

        formData.append('certifications', certifications);
        formData.append('published_works', published_works);
        formData.append('awards', awards);
        formData.append('skills', selectedSkills.join(','));


        // Send data via AJAX
        $.ajax({
            url: '/update_professional_details_api/',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                toastr.success('Professional Details Updated successfully!', 'Success');
                const inputFields = ["job_title", "company_name", "experience", "portfolio", "short_bio", "availability", "certifications", "published_works", "awards"];
                inputFields.forEach(fieldId => {
                    document.getElementById(fieldId).value = "";
                    $(".skill-checkbox").prop('checked', false);

                });
            },
            error: function(xhr) {
                var errors = xhr.responseJSON;
                var firstKey = Object.keys(errors)[0];
                var firstError = errors[firstKey][0];
                toastr.error(firstError, 'Error');
            }
        });
    });



    $(document).on('click', '#submit3', function(e) {
        console.log("hi");
        e.preventDefault();

        var payment_method = document.getElementById("payment_method").value;
        var aadhar_front = document.getElementById("aadhar_front").files[0];
        var aadhar_back = document.getElementById("aadhar_back").files[0];
        var opportunities = document.getElementById("opportunities").value;
        var alternate_email = document.getElementById("alternate_email").value;
        var newsletter_subscribe = document.getElementById("newsletter_subscribe").checked;
        var old_password = document.getElementById("old_password").value;
        var new_password = document.getElementById("new_password").value;
        var confirm_password = document.getElementById("confirm_password").value;
        var hide_phone = document.getElementById("hide_phone").checked;
        var hide_email = document.getElementById("hide_email").checked;
        var feedback = document.getElementById("feedback").value;

        if (!payment_method || !aadhar_front || !aadhar_back || !opportunities || !alternate_email || !old_password || !new_password || !confirm_password || !feedback) {
            toastr.error("please fill all the details")

            return
        }

        var formData = new FormData();

        formData.append('payment_method', payment_method);
        formData.append('aadhar_front', aadhar_front);
        formData.append('aadhar_back', aadhar_back);
        formData.append('opportunities', opportunities);
        formData.append('alternate_email', alternate_email);
        formData.append('newsletter_subscribe', newsletter_subscribe);
        formData.append('old_password', old_password);
        formData.append('new_password', new_password);
        formData.append('confirm_password', confirm_password);
        formData.append('hide_phone', hide_phone);
        formData.append('hide_email', hide_email);
        formData.append('feedback', feedback);

        $.ajax({
            url: '/update_other_details_api/',
            type: 'POST',
            data: formData,
            processData: false, // Prevent jQuery from processing the data
            contentType: false, // Prevent jQuery from setting the content type
            success: function(response) {
                toastr.success('Details Updated Successfully!', 'Success');
                $('#otherDetails')[0].reset();
            },
            error: function(xhr) {
                var errors = xhr.responseJSON;
                var firstKey = Object.keys(errors)[0];
                var firstError = errors[firstKey][0];
                toastr.error(firstError, 'Error');
            }
        });
    });

    $.ajax({
        url: '/check-profile-completion/',
        type: 'GET',
        success: function(response) {

            if (response.status === 'incomplete') {

                $('#profileAlertModal').modal('show');
            } else {
                console.log(response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error checking profile completion: ", error);
        }
    });

    $(document).on('click', '#updateProfileButton', function() {
        window.location.href = '/artist-profile-setting_updated_one';
    });


});


$(document).ready(function() {
    $("#searchItemsubmit2").click(function() {
        var query = $("#searchItem2").val();

        $.ajax({
            url: '/search-artists/',
            type: "GET",
            data: {
                search_query: query
            },
            success: function(response) {
                console.log(response.artists_with_details);

                var container = $(".col-lg-8.col-md-6.col-12 .row.g-4");
                container.empty();

                if (response.artists_with_details.length > 0) {

                    response.artists_with_details.forEach(function(artist) {

                        var skillBadges = '';
                        if (artist.skills && artist.skills.length > 0) {
                            artist.skills.forEach(function(skill) {
                                skillBadges += `<span class="badge bg-soft-primary rounded-pill me-1">${skill}</span>`;
                            });
                        }
                        var artistHTML = `
                            <div class="col-md-6 col-12">
                                <div class="candidate-card position-relative overflow-hidden text-center shadow rounded p-4">
                                    <div class="ribbon ribbon-left overflow-hidden">
                                        <span class="text-center d-block bg-warning shadow small h6">
                                            <i class="mdi mdi-star"></i>
                                        </span>
                                    </div>
                                    <div class="content">
                                        <!-- Profile Picture (if available, otherwise default) -->
                                        <img src="${artist.profile_picture ? artist.profile_picture : STATIC_URL + 'images/blank_pic.png'}" class="avatar avatar-md-md rounded-pill shadow-md" alt="">
                                        <div class="mt-3">
                                            <a href="/artist-profile/" class="title h5 text-dark">${artist.name}</a>
                                            <p class="text-muted mt-1">${artist.job_title || ''}</p>
                                            ${skillBadges}
                                        </div>
                                        <div class="mt-3">
                                            <a href="/artist-profile/" class="btn btn-sm btn-primary me-1">View Profile</a>
                                            <a href="/contactus/" class="btn btn-sm btn-icon btn-soft-primary">
                                                <i data-feather="message-circle" class="icons"></i>
                                            </a>
                                        </div>
                                        <a href="javascript:void(0)" class="like"><i class="mdi mdi-heart align-middle fs-4"></i></a>
                                    </div>
                                </div>
                            </div><!--end col-->
                        `;
                        container.append(artistHTML);
                    });
                } else {
                    // If no artists found, display the "No artist found" message
                    var noArtistsMessage = `
                        <div class="col-12 text-center">
                            <p class="h5 text-muted">No artist found</p>
                        </div>
                    `;
                    container.append(noArtistsMessage);
                }

                // Replace feather icons (if any)
                feather.replace();
            },
            error: function() {
                alert("An error occurred while fetching data.");
            }
        });
    });





    $('#applyFilterBtn').click(function(e) {
        e.preventDefault();

        var category = $('#description').val();
        var location = $('#Country').val();
        var selectedSkills = [];
        $('input[type="checkbox"]:checked').each(function() {
            selectedSkills.push($(this).val());
        });

        var filterData = {
            'category': category,
            'location': location,
            'skills[]': selectedSkills
        };

        $.ajax({
            url: '/filter-artists/',
            type: 'GET',
            data: filterData,
            success: function(response) {
                console.log(response.artists_with_details);

                var container = $(".col-lg-8.col-md-6.col-12 .row.g-4");
                container.empty();

                if (response.artists_with_details.length > 0) {

                    response.artists_with_details.forEach(function(artist) {

                        var skillBadges = '';
                        if (artist.skills && artist.skills.length > 0) {
                            artist.skills.forEach(function(skill) {
                                skillBadges += `<span class="badge bg-soft-primary rounded-pill me-1">${skill}</span>`;
                            });
                        }
                        var artistHTML = `
                                                <div class="col-md-6 col-12">
                                                    <div class="candidate-card position-relative overflow-hidden text-center shadow rounded p-4">
                                                        <div class="ribbon ribbon-left overflow-hidden">
                                                            <span class="text-center d-block bg-warning shadow small h6">
                                                                <i class="mdi mdi-star"></i>
                                                            </span>
                                                        </div>
                                                        <div class="content">
                                                            <!-- Profile Picture (if available, otherwise default) -->
                                                            <img src="${artist.profile_picture ? artist.profile_picture : STATIC_URL + 'images/blank_pic.png'}" class="avatar avatar-md-md rounded-pill shadow-md" alt="">
                                                            <div class="mt-3">
                                                                <a href="/artist-profile/" class="title h5 text-dark">${artist.name}</a>
                                                                <p class="text-muted mt-1">${artist.job_title || ''}</p>
                                                                ${skillBadges}
                                                            </div>
                                                            <div class="mt-3">
                                                                <a href="/artist-profile/" class="btn btn-sm btn-primary me-1">View Profile</a>
                                                                <a href="/contactus/" class="btn btn-sm btn-icon btn-soft-primary">
                                                                    <i data-feather="message-circle" class="icons"></i>
                                                                </a>
                                                            </div>
                                                            <a href="javascript:void(0)" class="like"><i class="mdi mdi-heart align-middle fs-4"></i></a>
                                                        </div>
                                                    </div>
                                                </div><!--end col-->
                                            `;
                        container.append(artistHTML);
                    });
                } else {
                    // If no artists found, display the "No artist found" message
                    var noArtistsMessage = `
                                            <div class="col-12 text-center">
                                                <p class="h5 text-muted">No artist found</p>
                                            </div>
                                        `;
                    container.append(noArtistsMessage);
                }

                // Replace feather icons (if any)
                feather.replace();
            },
            error: function() {
                alert("An error occurred while fetching data.");
            }
        });
    });


});