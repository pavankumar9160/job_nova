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

});
$(document).ready(function() {
    if (typeof is_logged_in_user !== 'undefined' && is_logged_in_user) {

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

    }
})


$(document).ready(function() {
    $("#searchItemsubmit2").click(function() {
        var query = $("#searchItem2").val();
        var artistProfileBaseURL = "/artist-profile/"; // Base URL
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
                        var artistProfileURL = artistProfileBaseURL + artist.id + "/"; // Construct URL dynamically
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
                                            <a href="${artistProfileURL}"  class="title h5 text-dark">${artist.name}</a>
                                            <p class="text-muted mt-1">${artist.job_title || ''}</p>
                                            ${skillBadges}
                                        </div>
                                        <div class="mt-3">
                                            <a href="${artistProfileURL}"  class="btn btn-sm btn-primary me-1">View Profile</a>
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

        var artistProfileBaseURL = "/artist-profile/"; // Base URL

        $.ajax({
            url: '/filter-artists/',
            type: 'GET',
            data: filterData,
            success: function(response) {
                // $('input[type="checkbox"]:checked').prop('checked', false);
                $('#description').val('');
                $('#Country').val();
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
                        var artistProfileURL = artistProfileBaseURL + artist.id + "/"; // Construct URL dynamically


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
                                                                <a href="${artistProfileURL}" class="title h5 text-dark">${artist.name}</a>
                                                                <p class="text-muted mt-1">${artist.job_title || ''}</p>
                                                                ${skillBadges}
                                                            </div>
                                                            <div class="mt-3">
                                                                <a href="${artistProfileURL}" class="btn btn-sm btn-primary me-1">View Profile</a>
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

$(document).ready(function() {
    // Handle the Preview button click
    $('#previewButton').on('click', function() {
        // Get form values
        var firstName = $('#firstname').val();
        var lastName = $('#lastname').val();
        var name = firstName + " " + lastName;

        var gender = $('#gender').val();
        var dob = $('#dob').val();
        var phone = $('#phone').val();
        var email = $('#email2').val();
        var country = $('#Country').val();
        var address = $('#address').val();
        var description = $('#description').val();
        var introduction = $('#introduction').val();
        var languagesRead = $('#languages_read').val();
        var languagesWrite = $('#languages_write').val();
        var languagesSpeak = $('#languages_speak').val();
        var facebookLink = $('#facebook_link').val();
        var instagramLink = $('#instagram_link').val();
        var linkedinLink = $('#linkedin_link').val();
        var profile_picture = $('#profile_picture').prop('files')[0];
        var defaultImage = `${STATIC_URL}images/blank_pic.png`;
        var reader = new FileReader();


        function updatePreview(previewImage) {

            // Create a preview content string
            var previewContent = `<section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="position-relative">
                            <div class="candidate-cover">
                                <img src="${STATIC_URL}images/hero/bg5.jpg" class="img-fluid rounded shadow" alt="">
                            </div>
                            <div class="candidate-profile d-flex align-items-end justify-content-between mx-2">
                                <div class="d-flex align-items-end">
                                    <img src="${previewImage}" class="rounded-pill shadow border border-3 avatar avatar-medium" alt="">

                                    <div class="ms-2">
                                        <h5 class="mb-0">${name}</h5>
                                        <p class="text-muted mb-0">Web Designer</p>
                                    </div>
                                </div>

                                <a href="{% url 'artist-profile-setting' %}" class="btn btn-sm btn-icon btn-pills btn-soft-primary"><i data-feather="settings" class="icons"></i></a>
                            </div>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->

            <div class="container mt-4">
                <div class="row g-4">
                    <div class="col-lg-8 col-md-7 col-12">
                        <h5 class="mb-4">Introduction:</h5>

                        <p class="text-muted">Obviously I'M Web Developer. Web Developer with over 3 years of experience. Experienced with all stages of the development cycle for dynamic web projects. The as opposed to using 'Content here, content here', making it look like readable English.</p>
                        <p class="text-muted">Data Structures and Algorithms are the heart of programming. Initially most of the developers do not realize its importance but when you will start your career in software development, you will find your code is either taking too much time or taking too much space.</p>

                        <h5 class="mt-4">Skills:</h5>

                        <div class="row">
                            <div class="col-lg-6 col-12">
                                <div class="progress-box mt-4">
                                    <h6 class="font-weight-normal">HTML</h6>
                                    <div class="progress">
                                        <div class="progress-bar position-relative bg-primary" style="width:84%;">
                                            <div class="progress-value d-block text-dark h6">84%</div>
                                        </div>
                                    </div>
                                </div><!--end process box-->
                                <div class="progress-box mt-4">
                                    <h6 class="font-weight-normal">CSS</h6>
                                    <div class="progress">
                                        <div class="progress-bar position-relative bg-primary" style="width:75%;">
                                            <div class="progress-value d-block text-dark h6">75%</div>
                                        </div>
                                    </div>
                                </div><!--end process box-->
                                <div class="progress-box mt-4">
                                    <h6 class="font-weight-normal">JQuery</h6>
                                    <div class="progress">
                                        <div class="progress-bar position-relative bg-primary" style="width:79%;">
                                            <div class="progress-value d-block text-dark h6">79%</div>
                                        </div>
                                    </div>
                                </div><!--end process box-->
                            </div><!--end col-->

                            <div class="col-lg-6 col-12">
                                <div class="progress-box mt-4">
                                    <h6 class="font-weight-normal">WordPress</h6>
                                    <div class="progress">
                                        <div class="progress-bar position-relative bg-primary" style="width:79%;">
                                            <div class="progress-value d-block text-dark h6">79%</div>
                                        </div>
                                    </div>
                                </div><!--end process box-->
                                <div class="progress-box mt-4">
                                    <h6 class="font-weight-normal">Figma</h6>
                                    <div class="progress">
                                        <div class="progress-bar position-relative bg-primary" style="width:85%;">
                                            <div class="progress-value d-block text-dark h6">85%</div>
                                        </div>
                                    </div>
                                </div><!--end process box-->
                                <div class="progress-box mt-4">
                                    <h6 class="font-weight-normal">Illustration</h6>
                                    <div class="progress">
                                        <div class="progress-bar position-relative bg-primary" style="width:65%;">
                                            <div class="progress-value d-block text-dark h6">65%</div>
                                        </div>
                                    </div>
                                </div><!--end process box-->
                            </div><!--end col-->
                        </div><!--end row-->

                        <h5 class="mt-4">Experience:</h5>

                        <div class="row">
                            <div class="col-12 mt-4">
                                <div class="d-flex">
                                    <div class="text-center">
                                        <img src="${STATIC_URL}images/company/linkedin.png" class="avatar avatar-small bg-white shadow p-2 rounded" alt="">
                                        <h6 class="text-muted mt-2 mb-0">2019-22</h6>
                                    </div>

                                    <div class="ms-3">
                                        <h6 class="mb-0">Full Stack Developer</h6>
                                        <p class="text-muted">Linkedin - U.S.A.</p>
                                        <p class="text-muted mb-0">It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>
                                    </div>
                                </div>
                            </div><!--end col-->
                            
                            <div class="col-12 mt-4">
                                <div class="d-flex">
                                    <div class="text-center">
                                        <img src="${STATIC_URL}images/company/lenovo-logo.png" class="avatar avatar-small bg-white shadow p-2 rounded" alt="">
                                        <h6 class="text-muted mt-2 mb-0">2017-19</h6>
                                    </div>

                                    <div class="ms-3">
                                        <h6 class="mb-0">Back-end Developer</h6>
                                        <p class="text-muted">Lenovo - China</p>
                                        <p class="text-muted mb-0">It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>
                                    </div>
                                </div>
                            </div><!--end col-->
                        </div><!--end row-->

                        <div class="p-4 rounded shadow mt-4">
                            <h5>Get in touch !</h5>
                            <form class="mt-4" method="post" name="myForm" onsubmit="return validateForm()">
                                <p class="mb-0" id="error-msg"></p>
                                <div id="simple-msg"></div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label fw-semibold">Your Name <span class="text-danger">*</span></label>
                                            <input name="name" id="name" type="text" class="form-control" placeholder="Name :">
                                        </div>
                                    </div>
    
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label fw-semibold">Your Email <span class="text-danger">*</span></label>
                                            <input name="email" id="email" type="email" class="form-control" placeholder="Email :">
                                        </div> 
                                    </div><!--end col-->
    
                                    <div class="col-12">
                                        <div class="mb-3">
                                            <label class="form-label fw-semibold">Subject</label>
                                            <input name="subject" id="subject" class="form-control" placeholder="Subject :">
                                        </div>
                                    </div><!--end col-->
    
                                    <div class="col-12">
                                        <div class="mb-3">
                                            <label class="form-label fw-semibold">Comments <span class="text-danger">*</span></label>
                                            <textarea name="comments" id="comments" rows="4" class="form-control" placeholder="Message :"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="d-grid">
                                            <button type="submit" id="submit" name="send" class="btn btn-primary">Send Message</button>
                                        </div>
                                    </div><!--end col-->
                                </div><!--end row-->
                            </form>
                        </div>
                    </div><!--end col-->
                    
                    <div class="col-lg-4 col-md-5 col-12">
                        <div class="card bg-light p-4 rounded shadow sticky-bar">
                            <h5 class="mb-0">Personal Detail:</h5>
                            <div class="mt-3">
                                <div class="d-flex align-items-center justify-content-between mt-3">
                                    <span class="d-inline-flex align-items-center text-muted fw-medium"><i data-feather="mail" class="fea icon-sm me-2"></i> Email:</span>
                                    <span class="fw-medium">${email}</span>
                                </div>

                                <div class="d-flex align-items-center justify-content-between mt-3">
                                    <span class="d-inline-flex align-items-center text-muted fw-medium"><i data-feather="gift" class="fea icon-sm me-2"></i> D.O.B.:</span>
                                    <span class="fw-medium">${dob}</span>
                                </div>

                                <div class="d-flex align-items-center justify-content-between mt-3">
                                    <span class="d-inline-flex align-items-center text-muted fw-medium"><i data-feather="home" class="fea icon-sm me-2"></i> Address:</span>
                                    <span class="fw-medium">${address}</span>
                                </div>

                                <div class="d-flex align-items-center justify-content-between mt-3">
                                    <span class="d-inline-flex align-items-center text-muted fw-medium"><i data-feather="map-pin" class="fea icon-sm me-2"></i> City:</span>
                                    <span class="fw-medium">London</span>
                                </div>

                                <div class="d-flex align-items-center justify-content-between mt-3">
                                    <span class="d-inline-flex align-items-center text-muted fw-medium"><i data-feather="globe" class="fea icon-sm me-2"></i> Country:</span>
                                    <span class="fw-medium">${country}</span>
                                </div>

                                <div class="d-flex align-items-center justify-content-between mt-3">
                                    <span class="d-inline-flex align-items-center text-muted fw-medium"><i data-feather="phone" class="fea icon-sm me-2"></i> Mobile:</span>
                                    <span class="fw-medium">${phone}</span>
                                </div>

                                <div class="d-flex align-items-center justify-content-between mt-3">
                                    <span class="text-muted fw-medium">Social:</span>
                                    
                                    <ul class="list-unstyled social-icon text-sm-end mb-0">
                                        <li class="list-inline-item"><a href="https://dribbble.com/shreethemes" target="_blank" class="rounded"><i data-feather="dribbble" class="fea icon-sm align-middle" title="dribbble"></i></a></li>
                                        <li class="list-inline-item"><a href="http://linkedin.com/company/shreethemes" target="_blank" class="rounded"><i data-feather="linkedin" class="fea icon-sm align-middle" title="Linkedin"></i></a></li>
                                        <li class="list-inline-item"><a href="https://www.facebook.com/shreethemes" target="_blank" class="rounded"><i data-feather="facebook" class="fea icon-sm align-middle" title="facebook"></i></a></li>
                                        <li class="list-inline-item"><a href="https://www.instagram.com/shreethemes/" target="_blank" class="rounded"><i data-feather="instagram" class="fea icon-sm align-middle" title="instagram"></i></a></li>
                                        <li class="list-inline-item"><a href="https://twitter.com/shreethemes" target="_blank" class="rounded"><i data-feather="twitter" class="fea icon-sm align-middle" title="twitter"></i></a></li>
                                    </ul><!--end icon-->
                                </div>

                                <div class="p-3 rounded shadow bg-white mt-2">
                                    <div class="d-flex align-items-center mb-2">
                                        <i data-feather="file-text" class="fea icon-md"></i>
                                        <h6 class="mb-0 ms-2">calvin-carlo-resume.pdf</h6>
                                    </div>

                                    <a href="${STATIC_URL}images/calvin-carlo-resume.pdf" class="btn btn-primary w-100" download><i data-feather="download" class="fea icon-sm me-1"></i> Download CV</a>
                                </div>
                            </div>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->

            <div class="container mt-100 mt-60">
                <div class="row justify-content-center mb-4 pb-2">
                    <div class="col-12">
                        <div class="section-title text-center">
                            <h4 class="title mb-3">Related Candidates</h4>
                            <p class="text-muted para-desc mx-auto mb-0">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->

                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 pt-2">
                        <div class="candidate-card position-relative overflow-hidden text-center shadow rounded p-4">
                            <div class="content">
                                <img src="${STATIC_URL}images/team/02.jpg" class="avatar avatar-md-md rounded-pill shadow-md" alt="">

                                <div class="mt-3">
                                    <a href="{% url 'artist-profile' %}" class="title h5 text-dark">Tiffany Betancourt</a>
                                    <p class="text-muted mt-1">Application Developer</p>

                                    <span class="badge bg-soft-primary rounded-pill">Design</span>
                                    <span class="badge bg-soft-primary rounded-pill">UI</span>
                                    <span class="badge bg-soft-primary rounded-pill">UX</span>
                                    <span class="badge bg-soft-primary rounded-pill">Digital</span>
                                </div>

                                <div class="mt-2 d-flex align-items-center justify-content-between">
                                    <div class="text-center">
                                        <p class="text-muted fw-medium mb-0">Salary:</p>
                                        <p class="mb-0 fw-medium">$5k - $6k</p>
                                    </div>

                                    <div class="text-center">
                                        <p class="text-muted fw-medium mb-0">Experience:</p>
                                        <p class="mb-0 fw-medium">2 Years</p>
                                    </div>
                                </div>
                                
                                <div class="mt-3">
                                    <a href="{% url 'artist-profile' %}" class="btn btn-sm btn-primary me-1">View Profile</a>
                                    <a href="{% url 'contactus' %}" class="btn btn-sm btn-icon btn-soft-primary"><i data-feather="message-circle" class="icons"></i></a>
                                </div>

                                <a href="javascript:void(0)" class="like"><i class="mdi mdi-heart align-middle fs-4"></i></a>
                            </div>
                        </div>
                    </div><!--end col-->

                    <div class="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 pt-2">
                        <div class="candidate-card position-relative overflow-hidden text-center shadow rounded p-4">
                            <div class="content">
                                <img src="${STATIC_URL}images/team/03.jpg" class="avatar avatar-md-md rounded-pill shadow-md" alt="">

                                <div class="mt-3">
                                    <a href="{% url 'artist-profile' %}" class="title h5 text-dark">Jacqueline Burns</a>
                                    <p class="text-muted mt-1">Senior Product Designer</p>

                                    <span class="badge bg-soft-primary rounded-pill">Design</span>
                                    <span class="badge bg-soft-primary rounded-pill">UI</span>
                                    <span class="badge bg-soft-primary rounded-pill">UX</span>
                                    <span class="badge bg-soft-primary rounded-pill">Digital</span>
                                </div>

                                <div class="mt-2 d-flex align-items-center justify-content-between">
                                    <div class="text-center">
                                        <p class="text-muted fw-medium mb-0">Salary:</p>
                                        <p class="mb-0 fw-medium">$5k - $6k</p>
                                    </div>

                                    <div class="text-center">
                                        <p class="text-muted fw-medium mb-0">Experience:</p>
                                        <p class="mb-0 fw-medium">2 Years</p>
                                    </div>
                                </div>
                                
                                <div class="mt-3">
                                    <a href="{% url 'artist-profile' %}" class="btn btn-sm btn-primary me-1">View Profile</a>
                                    <a href="{% url 'contactus' %}" class="btn btn-sm btn-icon btn-soft-primary"><i data-feather="message-circle" class="icons"></i></a>
                                </div>

                                <a href="javascript:void(0)" class="like"><i class="mdi mdi-heart align-middle fs-4"></i></a>
                            </div>
                        </div>
                    </div><!--end col-->

                    <div class="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 pt-2">
                        <div class="candidate-card position-relative overflow-hidden text-center shadow rounded p-4">
                            <div class="ribbon ribbon-left overflow-hidden"><span class="text-center d-block bg-warning shadow small h6"><i class="mdi mdi-star"></i></span></div>
                            <div class="content">
                                <img src="${STATIC_URL}images/team/04.jpg" class="avatar avatar-md-md rounded-pill shadow-md" alt="">

                                <div class="mt-3">
                                    <a href="{% url 'artist-profile' %}" class="title h5 text-dark">Mari Harrington</a>
                                    <p class="text-muted mt-1">C++ Developer</p>

                                    <span class="badge bg-soft-primary rounded-pill">Design</span>
                                    <span class="badge bg-soft-primary rounded-pill">UI</span>
                                    <span class="badge bg-soft-primary rounded-pill">UX</span>
                                    <span class="badge bg-soft-primary rounded-pill">Digital</span>
                                </div>

                                <div class="mt-2 d-flex align-items-center justify-content-between">
                                    <div class="text-center">
                                        <p class="text-muted fw-medium mb-0">Salary:</p>
                                        <p class="mb-0 fw-medium">$5k - $6k</p>
                                    </div>

                                    <div class="text-center">
                                        <p class="text-muted fw-medium mb-0">Experience:</p>
                                        <p class="mb-0 fw-medium">2 Years</p>
                                    </div>
                                </div>
                                
                                <div class="mt-3">
                                    <a href="{% url 'artist-profile' %}" class="btn btn-sm btn-primary me-1">View Profile</a>
                                    <a href="{% url 'contactus' %}" class="btn btn-sm btn-icon btn-soft-primary"><i data-feather="message-circle" class="icons"></i></a>
                                </div>

                                <a href="javascript:void(0)" class="like"><i class="mdi mdi-heart align-middle fs-4"></i></a>
                            </div>
                        </div>
                    </div><!--end col-->

                    <div class="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 pt-2">
                        <div class="candidate-card position-relative overflow-hidden text-center shadow rounded p-4">
                            <div class="content">
                                <img src="${STATIC_URL}images/team/05.jpg" class="avatar avatar-md-md rounded-pill shadow-md" alt="">

                                <div class="mt-3">
                                    <a href="{% url 'artist-profile' %}" class="title h5 text-dark">Floyd Glasgow</a>
                                    <p class="text-muted mt-1">Php Developer</p>

                                    <span class="badge bg-soft-primary rounded-pill">Design</span>
                                    <span class="badge bg-soft-primary rounded-pill">UI</span>
                                    <span class="badge bg-soft-primary rounded-pill">UX</span>
                                    <span class="badge bg-soft-primary rounded-pill">Digital</span>
                                </div>

                                <div class="mt-2 d-flex align-items-center justify-content-between">
                                    <div class="text-center">
                                        <p class="text-muted fw-medium mb-0">Salary:</p>
                                        <p class="mb-0 fw-medium">$5k - $6k</p>
                                    </div>

                                    <div class="text-center">
                                        <p class="text-muted fw-medium mb-0">Experience:</p>
                                        <p class="mb-0 fw-medium">2 Years</p>
                                    </div>
                                </div>
                                
                                <div class="mt-3">
                                    <a href="{% url 'artist-profile' %}" class="btn btn-sm btn-primary me-1">View Profile</a>
                                    <a href="{% url 'contactus' %}" class="btn btn-sm btn-icon btn-soft-primary"><i data-feather="message-circle" class="icons"></i></a>
                                </div>

                                <a href="javascript:void(0)" class="like"><i class="mdi mdi-heart align-middle fs-4"></i></a>
                            </div>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->
        </section>
        `;

            // Insert the preview content into the modal
            $('#previewContent').html(previewContent);


        }



        if (profile_picture) {
            // If a file is selected, read it
            reader.onload = function(e) {
                updatePreview(e.target.result); // Pass the result of the uploaded file
                $('#previewModal').modal('show');

            };
            reader.readAsDataURL(profile_picture);
        } else {
            // If no file is selected, use the default image directly
            updatePreview(defaultImage);
            $('#previewModal').modal('show');

        }
    });
});