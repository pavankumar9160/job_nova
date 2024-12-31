$(document).ready(function() {
    console.log("loaded")

    // update personal details form
    $('#ArtistDetailsForm').on('submit', function(event) {




        console.log("hi")

        event.preventDefault();

        var formData = new FormData();

        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var gender = document.getElementById("gender").value;
        var dob = document.getElementById("dob").value;

        var country = document.getElementById("Country").value;
        var address1 = document.getElementById("houseNumber").value;
        var address2 = document.getElementById("roadName").value;
        var pincode = document.getElementById("pincode").value;
        var state = document.getElementById("state").value;
        var description = document.getElementById("description").value;
        var introduction = document.getElementById("introduction").value;
        var facebook_link = document.getElementById("facebook_link").value;
        var instagram_link = document.getElementById("instagram_link").value;
        var linkedin_link = document.getElementById("linkedin_link").value;
        var email = document.getElementById("email2").value;
        var contact_number = document.getElementById("phone").value;
        var profile_picture = document.getElementById("profile_picture").files[0];
        var cover_photo = document.getElementById("uploadCoverPhoto").files[0];


        var languages_read = []
        document.querySelectorAll('input[name="languages_read[]"]:checked').forEach(function(checkbox) {
            languages_read.push(checkbox.value);
        })
        console.log(languages_read);

        var languages_write = []
        document.querySelectorAll('input[name="languages_write[]"]:checked').forEach(function(checkbox) {
            languages_write.push(checkbox.value);
        })
        console.log(languages_write);

        var languages_speak = []
        document.querySelectorAll('input[name="languages_speak[]"]:checked').forEach(function(checkbox) {
            languages_speak.push(checkbox.value);
        })
        console.log(languages_speak);


        var job_title = document.getElementById("job_title").value;
        var company_name = document.getElementById("company_name").value;
        var experience = document.getElementById("experience").value;
        var portfolio = document.getElementById("portfolio").value;
        var short_bio = document.getElementById("short_bio").value;

        var highest_qualification = document.getElementById("highest_qualification").value;
        var availability = document.getElementById("availability").value;

        var certifications = document.getElementById("certifications").value;
        var published_works = document.getElementById("published_works").value;
        var awards = document.getElementById("awards").value;
        var selectedSkills = [];

        const fileArray = [];
        const fileInput = document.getElementById('documents');
        const files = fileInput.files;
        console.log('files are: ', files)

        // Create an array to hold the selected files

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i])
                fileArray.push(files[i]);
            }

            console.log('Selected files:', fileArray); // Check if files are populated
        } else {
            console.log('No files selected');
        }

        const experiences = [];

        // Select all list items
        const listItems = document.querySelectorAll('.list-group-item-experience');

        if (listItems.length > 0) {
            listItems.forEach((listItem) => {
                // Get the entire text content of the <div> containing the data
                const divElement = listItem.querySelector('div');
                const divContent = divElement ? divElement.textContent.trim() : '';

                // Extract designation
                const designationMatch = divContent.match(/^(.*) at/);
                const designation = designationMatch ? designationMatch[1].trim() : '';

                // Extract company name
                const companyMatch = divContent.match(/at\s+(.*?)\s+\(/)
                const company = companyMatch ? companyMatch[1].trim() : '';

                // Extract the full date range
                const dateRangeMatch = divContent.match(/\(([^)]+)\)/);
                const dateRange = dateRangeMatch ? dateRangeMatch[1].trim() : '';
                const [startDate, endDate] = dateRange.split('to').map(date => date.trim());

                // Determine if currently working
                const currentlyWorking = endDate === 'Present';
                if (designation && company && startDate) {
                    // Push data to the experiences array
                    experiences.push({
                        designation,
                        company,
                        startDate, // Full start date
                        endDate: currentlyWorking ? null : endDate, // Full end date or null if "Present"
                        currentlyWorking,
                    });
                }
            });
        }

        console.log("experience_data", experiences);




        $(".skill-checkbox:checked").each(function() {
            selectedSkills.push($(this).val());
        });

        if (!address1 || !address2 || !state || !firstname || !lastname || !country || !gender || !dob || !contact_number || !email || !selectedSkills || !languages_read || !languages_write || !languages_speak || languages_speak.length === 0 || languages_write.length === 0 || languages_read.length === 0 || selectedSkills.length === 0 || !description) {
            toastr.error("please fill all the required details")

            return
        }
        var bookNames = [];
        var bookLinks = [];

        // Gather book names and links from the inputs
        document.querySelectorAll('input[name="book_name[]"]').forEach(input => bookNames.push(input.value));
        document.querySelectorAll('input[name="book_link[]"]').forEach(input => bookLinks.push(input.value));

        // Perform validation to ensure both book names and links are not empty
        if (bookNames.length === 0 || bookLinks.length === 0) {
            alert('Please enter at least one book with a name and a link.');
            return;
        }
        bookNames.forEach((name, index) => {
            formData.append('book_name', name); // Append each book name individually
            formData.append('book_link', bookLinks[index]); // Append each book link
        });

        console.log('booknames', bookNames)

        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('gender', gender);
        formData.append('dob', dob);
        formData.append('country', country);
        formData.append('address1', address1);
        formData.append('address2', address2);
        formData.append('pincode', pincode);
        formData.append('state', state);
        formData.append('description', description);
        formData.append('introduction', introduction);
        formData.append('languages_read', languages_read.join(','));
        formData.append('languages_write', languages_write.join(','));
        formData.append('languages_speak', languages_speak.join(','));
        formData.append('facebook_link', facebook_link);
        formData.append('instagram_link', instagram_link);
        formData.append('linkedin_link', linkedin_link);
        formData.append('email', email);


        formData.append('contact_number', contact_number);
        formData.append('profile_picture', profile_picture);
        formData.append('cover_photo', cover_photo);
        formData.append('job_title', job_title);
        formData.append('company_name', company_name);
        formData.append('experience', experience);
        formData.append('portfolio', portfolio);
        formData.append('short_bio', short_bio);

        formData.append('highest_qualification', highest_qualification);
        formData.append('availability', availability);
        formData.append('certifications', certifications);
        formData.append('published_works', published_works);
        formData.append('awards', awards);
        formData.append('skills', selectedSkills.join(','));
        formData.append('experiences_data', JSON.stringify(experiences));


        $.ajax({
            url: '/update_artist_details_api/',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                toastr.success('Details Updated successfully!', 'Success');
                window.location.href = '/artist-profile_updated_one/'

            },
            error: function(xhr) {
                var errors = xhr.responseJSON;
                var firstKey = Object.keys(errors)[0];
                var firstError = errors[firstKey][0];
                toastr.error(errors, 'error');
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
        var artistProfileBaseURL = "/artist-profile_updated_one/"; // Base URL
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
                                <div class="candidate-card position-relative overflow-hidden text-center shadow rounded p-4"  style="min-height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                                    <div class="ribbon ribbon-left overflow-hidden">
                                        <span class="text-center d-block bg-warning shadow small h6">
                                            <i class="mdi mdi-star"></i>
                                        </span>
                                    </div>
                                    <div class="content" style="flex-grow: 1;">
                                        <!-- Profile Picture (if available, otherwise default) -->
                                        <img src="${artist.profile_picture ? artist.profile_picture : STATIC_URL + 'images/blank_pic.png'}" class="avatar avatar-md-md rounded-pill shadow-md" alt="">
                                        <div class="mt-3">
                                            <a href="${artistProfileURL}"  class="title h5 text-dark">${artist.name}</a>
                                            <p class="text-muted mt-1">${artist.short_bio || ''}</p>
                                             ${skillBadges || '<span class="text-muted">No skills Listed</span>'}
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

        // Get filter values
        var category = $('#description').val();
        var location = $('#Country').val();
        let selectedSkills = [];
        var ageRange = $('#ageRange').val();
        let experienceRange = [];
        var language = $('#languageSelect').val();

        $('input[type="checkbox"].experience_checkbox:checked').each(function() {
            experienceRange.push($(this).val());
        });


        $('input[type="checkbox"].skills_checkbox:checked').each(function() {
            selectedSkills.push($(this).val());
        });

        // Prepare filter data
        var filterData = {
            'category': category,
            'location': location,
            'skills[]': selectedSkills,
            'years_of_experience[]': experienceRange,
            'age': ageRange,
            'language': language
        };
        console.log("exp", experienceRange)
        console.log('skills', selectedSkills)
        var artistProfileBaseURL = "/artist-profile_updated_one/"; // Base URL

        // Send AJAX request to get filtered artists
        $.ajax({
            url: '/filter-artists/',
            type: 'GET',
            data: filterData,
            success: function(response) {
                var container = $(".col-lg-8.col-md-6.col-12 .row.g-4");

                container.empty();


                // $('input[type="checkbox"]:checked').prop('checked', false); // Uncheck all checkboxes

                console.log(response.artists_with_details);



                if (response.artists_with_details.length > 0) {
                    response.artists_with_details.forEach(function(artist) {
                        var skillBadges = '';
                        if (artist.skills && artist.skills.length > 0) {
                            artist.skills.forEach(function(skill) {
                                skillBadges += `<span class="badge bg-soft-primary rounded-pill me-1">${skill}</span>`;
                            });
                        }

                        var artistProfileURL = artistProfileBaseURL + artist.id + "/"; // Construct URL dynamically
                        // Build the artist HTML content
                        var artistHTML = `
                            <div class="col-md-6 col-12">
                                <div class="candidate-card position-relative overflow-hidden text-center shadow rounded p-4"style="min-height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                                    <div class="ribbon ribbon-left overflow-hidden">
                                        <span class="text-center d-block bg-warning shadow small h6">
                                            <i class="mdi mdi-star"></i>
                                        </span>
                                    </div>
                                    <div class="content" style="flex-grow: 1;">
                                        <!-- Profile Picture -->
                                        <img src="${artist.profile_picture ? artist.profile_picture : STATIC_URL + 'images/blank_pic.png'}" class="avatar avatar-md-md rounded-pill shadow-md" alt="">
                                        <div class="mt-3">
                                            <a href="${artistProfileURL}" class="title h5 text-dark">${artist.name}</a>
                                            <p class="text-muted mt-1">${artist.short_bio || ''}</p>
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
                    // If no artists found, display "No artists found" message
                    var noArtistsMessage = `
                        <div class="col-12 text-center">
                            <p class="h5 text-muted">No artists found</p>
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
                        var dob = $('#dob').val();
                        var phone = $('#phone').val();
                        var email = $('#email2').val();

                        var country = $('#Country').val();
                        var address1 = $('#houseNumber').val();
                        var address2 = $('#roadName').val();
                        var state = $('#state').val();
                        var pincode = $('#pincode').val();
                        var description = $('#description').val();
                        var introduction = $('#introduction').val();
                        var facebookLink = $('#facebook_link').val();
                        var instagramLink = $('#instagram_link').val();
                        var linkedinLink = $('#linkedin_link').val();
                        var profile_picture = $('#profile_picture').prop('files')[0];
                        var cover_photo = $('#uploadCoverPhoto').prop('files')[0];

                        var defaultImage = `${STATIC_URL}images/blank_pic.png`;

                        var defaultCoverImage = `${STATIC_URL}images/hero/bg5.jpg`;

                        var experience = document.getElementById("experience").value;
                        var certifications = document.getElementById("certifications").value;

                        var highest_qualification = $('#highest_qualification').val();
                        var published_works = document.getElementById("published_works").value;
                        var portfolio = document.getElementById("portfolio").value;
                        var languages_read = []
                        document.querySelectorAll('input[name="languages_read[]"]:checked').forEach(function(checkbox) {
                            languages_read.push(checkbox.value);
                        })
                        console.log(languages_read);

                        var languages_write = []
                        document.querySelectorAll('input[name="languages_write[]"]:checked').forEach(function(checkbox) {
                            languages_write.push(checkbox.value);
                        })
                        console.log(languages_write);

                        var languages_speak = []
                        document.querySelectorAll('input[name="languages_speak[]"]:checked').forEach(function(checkbox) {
                            languages_speak.push(checkbox.value);
                        })
                        console.log(languages_speak);

                        var selectedSkills = [];






                        // Select all list items
                        const listItems = document.querySelectorAll('.list-group-item-experience');
                        const experiences = [];

                        listItems.forEach((listItem) => {
                            // Get the entire text content of the <div> containing the data
                            const divElement = listItem.querySelector('div');
                            const divContent = divElement ? divElement.textContent.trim() : '';
                            d

                            // Extract designation
                            const designationMatch = divContent.match(/^(.*) at/);
                            const designation = designationMatch ? designationMatch[1].trim() : '';

                            // Extract company name
                            const companyMatch = divContent.match(/at\s+(.*?)\s+\(/)
                            const company = companyMatch ? companyMatch[1].trim() : '';

                            // Extract the full date range
                            const dateRangeMatch = divContent.match(/\(([^)]+)\)/);
                            const dateRange = dateRangeMatch ? dateRangeMatch[1].trim() : '';
                            const [startDate, endDate] = dateRange.split('to').map(date => date.trim());

                            // Determine if currently working
                            const currentlyWorking = endDate === 'Present';

                            // Push data to the experiences array
                            experiences.push({
                                designation,
                                company,
                                startDate, // Full start date
                                endDate: currentlyWorking ? null : endDate, // Full end date or null if "Present"
                                currentlyWorking,
                            });
                        });
                        $(".skill-checkbox:checked").each(function() {
                            selectedSkills.push($(this).val());
                        });




                        var fileInput = document.getElementById('documents');
                        var files = fileInput.files;
                        let profileImage = defaultImage; // Default profile image
                        let coverImage = defaultCoverImage;

                        function updatePreview(previewImage, files, previewCoverImage) {




                            var previewContent = `<section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="position-relative">
                            <div class="candidate-cover">
                                <img src="${previewCoverImage}" class="img-fluid rounded shadow" alt="">
                            </div>
                            <div class="candidate-profile d-flex align-items-end justify-content-between mx-2">
                                <div class="d-flex align-items-end">
                                    <img src="${previewImage}" class="rounded-pill shadow border border-3 avatar avatar-medium" alt="">
                                    <div class="ms-2">
                                        <h5 class="mb-0">${name}</h5>
                                        <p class="text-muted mb-0">${description}</p>
                                    </div>
                                    
                                </div>
                             <a href="{% url 'artist-profile-setting' %}" class="btn btn-sm btn-icon btn-pills btn-soft-primary"><i data-feather="settings" class="icons"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mt-4">
                <div class="row g-4">
                   
                    <div class="col-lg-8 col-md-7 col-12">
                        <h5 class="mb-4">Introduction:</h5>
                        <p class="text-muted">I am <strong>${name},</strong>${introduction}</p>
                       
                             <h5 class="mt-4">Languages:</h5>
                        <div class="d-flex flex-wrap gap-2">
                            <h6>Languages Speak:</h6>
                          
                                <span>${languages_speak}</span>
                           
                        </div>

                        <div class="d-flex flex-wrap gap-2">
                            <h6>Languages Read:</h6>
                           
                                <span>${languages_read}</span>
                           
                        </div>

                        <div class="d-flex flex-wrap gap-2">
                            <h6>Languages Write:</h6>
                                <span>${languages_write}</span>
                        </div>
                                <h5 class="mt-4">Skills:</h5>
                            <div class="d-flex flex-wrap gap-2" id="skills-container">
                                <!-- Skills will be dynamically added here -->
                            </div>
                             <h5 class="mt-4">Education:</h5>
                            <div class="d-flex flex-wrap gap-2" id="highest_qualification">
                                <!-- Books Published will be dynamically added here -->
                                <span>${highest_qualification}</span>
                            </div> 
                            <h5 class="mt-4">Experience Details:</h5>
                            <div class="d-flex flex-column gap-3" id="experience-container">
                                    <!-- Experience cards will be dynamically added here -->
                                </div>

                              <h5 class="mt-4">Books Published:</h5>
                            <div class="d-flex flex-wrap gap-2" id="books_published">
                                <!-- Books Published will be dynamically added here -->
                               
                            </div>   

                    </div>

                   
                        <div class="col-lg-4 col-md-5 col-12">
                            <div class="card bg-light p-4 rounded shadow sticky-bar">
                                <h5 class="mb-0">Personal Detail:</h5>
                                <div class="mt-3">
                                    <div class="d-flex align-items-center justify-content-between mt-3">
                                        <span class="d-inline-flex align-items-center text-muted fw-medium"><i data-feather="mail" class="fea icon-sm me-2"></i> Email:</span>
                                        <span class="fw-medium">${email }</span>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between mt-3">
                                        <span class="d-inline-flex align-items-center text-muted fw-medium"><i data-feather="gift" class="fea icon-sm me-2"></i> D.O.B.:</span>
                                        <span class="fw-medium">${dob}</span>
                                    </div>
                                   <div class="d-flex align-items-start justify-content-between mt-3" style="flex-wrap: wrap; line-height: 1.5; word-break: break-word;">
                                        <span class="d-inline-flex align-items-center text-muted fw-medium" style="margin-right: 10px; white-space: nowrap;"><i data-feather="home" class="fea icon-sm me-2"></i> Address:</span>
                                        <span class="fw-medium" style="flex: 1; line-height: 1.5; text-align: right;"> ${address1 }<br>
                                            ${address2}<br>
                                            ${state}<br>
                                            ${pincode}
                                        </span>
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
                                        <span class="d-inline-flex align-items-center text-muted fw-medium"><i data-feather="globe" class="fea icon-sm me-2"></i> Website:</span>
                                        <span class="fw-medium">${portfolio}</span>
                                    </div>
                                    
                                    <div class="d-flex align-items-center justify-content-between mt-3">
                                        <span class="text-muted fw-medium">Social:</span>
                                        
                                        <ul class="list-unstyled social-icon text-sm-end mb-0">
                                            <li class="list-inline-item"><a href="https://dribbble.com/shreethemes" target="_blank" class="rounded"><i data-feather="dribbble" class="fea icon-sm align-middle" title="dribbble"></i></a></li>
                                            <li class="list-inline-item"><a href="${linkedinLink}" target="_blank" class="rounded"><i data-feather="linkedin" class="fea icon-sm align-middle" title="Linkedin"></i></a></li>
                                            <li class="list-inline-item"><a href="${facebookLink}" target="_blank" class="rounded"><i data-feather="facebook" class="fea icon-sm align-middle" title="facebook"></i></a></li>
                                            <li class="list-inline-item"><a href="${instagramLink}" target="_blank" class="rounded"><i data-feather="instagram" class="fea icon-sm align-middle" title="instagram"></i></a></li>
                                            <li class="list-inline-item"><a href="https://twitter.com/shreethemes" target="_blank" class="rounded"><i data-feather="twitter" class="fea icon-sm align-middle" title="twitter"></i></a></li>
                                        </ul><!--end icon-->
                                    </div>
                                     <div class="mt-4">
                                        <h5 class="mb-3">Gallery:</h5>
                                        <div class="row" id ="image-preview-container">
                                
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                  
               `;


                            // Insert the preview content into the modal
                            $('#previewContent').html(previewContent);

                            feather.replace();

                            // Now render the skills in the skills container
                            var skillsContainer = document.getElementById("skills-container");
                            skillsContainer.innerHTML = ''; // Clear previous content

                            selectedSkills.forEach(function(skill) {
                                var badge = document.createElement("span");
                                badge.classList.add("badge", "bg-soft-primary", "rounded-pill");
                                badge.textContent = skill; // Set the skill name as the badge text
                                skillsContainer.appendChild(badge); // Append the badge to the container
                            });

                            const experienceContainer = document.getElementById('experience-container');
                            experienceContainer.innerHTML = ''; // Clear previous content

                            if (experiences.length === 0) {
                                experienceContainer.innerHTML = '<p>No experience available.</p>';
                                return;
                            }

                            experiences.forEach((experience) => {
                                        // Create a card for each experience
                                        const card = document.createElement('div');
                                        card.classList.add('card', 'shadow-sm', 'p-3', 'mb-2', 'bg-light', 'rounded');

                                        // Create the content of the card
                                        card.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="card-title mb-2">${experience.designation} at ${experience.company}</h6>
                        <span class="badge bg-info text-white">
                            ${experience.startDate} - ${experience.currentlyWorking ? 'Present' : experience.endDate}
                        </span>
                    </div>
                    <p class="card-text">
                        <strong>Start Date:</strong> ${new Date(experience.startDate).toLocaleDateString('en-US')}<br>
                        ${experience.endDate ? `<strong>End Date:</strong> ${new Date(experience.endDate).toLocaleDateString('en-US')}<br>` : ''}
                        <strong>Company:</strong> ${experience.company}<br>
                    </p>
                `;
        
                // Append the card to the container
                experienceContainer.appendChild(card);


                
            });

            // Gather book names and links from the inputs
            var bookNames = [];
            var bookLinks = [];

            document.querySelectorAll('input[name="book_name[]"]').forEach(input => bookNames.push(input.value));
            document.querySelectorAll('input[name="book_link[]"]').forEach(input => bookLinks.push(input.value));

            // Perform validation to ensure both book names and links are not empty
            if (bookNames.length === 0 || bookLinks.length === 0 || bookNames.some(name => !name) || bookLinks.some(link => !link)) {
                alert('Please enter at least one book with a valid name and link.');
                return;
            }

            // Combine book names and links into a single array of objects
            var books = bookNames.map((name, index) => {
                return {
                    book_name: name,
                    book_link: bookLinks[index]
                };
            });

            // Get the container for displaying the books
            const booksContainer = document.getElementById("books_published");

            // Clear previous content before appending new books
            booksContainer.innerHTML = "";

            // Append the books to the container
            if (books && books.length > 0) {
                books.forEach(book => {
                    if (book.book_name && book.book_link) {
                        // Create a span element
                        const span = document.createElement("span");

                        // Create an anchor element
                        const anchor = document.createElement("a");
                        anchor.href = book.book_link;
                        anchor.target = "_blank"; // Open link in a new tab
                        anchor.className = "text-decoration-none";
                        anchor.innerText = book.book_name;

                        // Append the anchor to the span
                        span.appendChild(anchor);

                        // Add a margin for spacing
                        span.style.marginRight = "10px";

                        // Append the span to the container
                        booksContainer.appendChild(span);
                    }
                });
            } else {
                // If no books are available, display a default message
                const noBooksMessage = document.createElement("span");
                noBooksMessage.innerText = "No Books Published.";
                booksContainer.appendChild(noBooksMessage);
            }
                
                    const imagePreviewContainer = document.getElementById('image-preview-container');
                    imagePreviewContainer.innerHTML = ''; // Clear previous content
                    console.log("preview the files",files)
                    if (files.length > 0) {
                        for (let i = 0; i < files.length; i++) {
                        
                            const reader = new FileReader();

                            reader.onload = function (e) {
                                const col = document.createElement('div');
                                col.classList.add('col-6', 'col-md-3', 'mb-4');

                                const imageBlock = document.createElement('div');
                                imageBlock.classList.add('image-block', 'border', 'rounded', 'p-1');

                                const img = document.createElement('img');
                                img.src = e.target.result;
                                img.alt = 'Preview Image';
                                img.classList.add('img-fluid', 'rounded');
                                img.style.width = '100%';
                                img.style.height = '100%';
                                img.style.objectFit = 'cover';

                                imageBlock.appendChild(img);
                                col.appendChild(imageBlock);
                                imagePreviewContainer.append(col);
                            };

                            reader.readAsDataURL(files[i]);
                        };
                    } else {
                        imagePreviewContainer.innerHTML = '<p>No images selected.</p>';
                    }
}

        


          // Handle profile_picture
    if (profile_picture) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImage = e.target.result;

            // Check if cover_photo was already handled or is not present
            if (!cover_photo) {
                updatePreview(profileImage,files, coverImage);
                $('#previewModal').modal('show');

            } else if (cover_photo && coverImage !== defaultCoverImage) {
                updatePreview(profileImage,files, coverImage);
                $('#previewModal').modal('show');

            }
        };
        reader.readAsDataURL(profile_picture);
    }

    // Handle cover_photo
    if (cover_photo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            coverImage = e.target.result;

            // Check if profile_picture was already handled or is not present
            if (!profile_picture) {
                updatePreview(profileImage,files, coverImage);
                $('#previewModal').modal('show');

            } else if (profile_picture && profileImage !== defaultImage) {
                updatePreview(profileImage,files, coverImage);
                $('#previewModal').modal('show');

            }
        };
        reader.readAsDataURL(cover_photo);
    }

    // Fallback for when neither file is selected
    if (!profile_picture && !cover_photo) {
        updatePreview(profileImage,files, coverImage);
        $('#previewModal').modal('show');

    }

    });
});



$(document).ready(function() {
    // Check if there is a search query in the URL
    var urlParams = new URLSearchParams(window.location.search);
    var searchQuery = urlParams.get('search_query');

    if (searchQuery) {
        console.log("Search query:", searchQuery);

        // After rendering the results (e.g., your AJAX request or template rendering), remove the query parameter
        var newURL = window.location.origin + window.location.pathname; // Remove query string
        window.history.replaceState({}, document.title, newURL); // Replace URL without query parameter
    }
});