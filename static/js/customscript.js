$(document).ready(function() {
    console.log("loaded")

    // update personal details form
    $('#ArtistDetailsForm').on('submit', function(event) {




        console.log("hi")

        event.preventDefault();

        var formData = new FormData();

        var fullname = document.getElementById("fullname").value;
        var penname = document.getElementById("penname").value;
        var title = document.getElementById("title").value;

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
        var twitter_link = document.getElementById("twitter_link").value;
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


        // var job_title = document.getElementById("job_title").value;
        // var company_name = document.getElementById("company_name").value;
        var experience = document.getElementById("experience").value;
        var portfolio = document.getElementById("portfolio").value;
        var short_bio = document.getElementById("short_bio").value;

        // var highest_qualification = document.getElementById("highest_qualification").value;
        // var availability = document.getElementById("availability").value;

        // var certifications = document.getElementById("certifications").value;
        // var published_works = document.getElementById("published_works").value;

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

                    experiences.push({
                        designation,
                        company,
                        startDate,
                        endDate: currentlyWorking ? null : endDate,
                        currentlyWorking,
                    });
                }
            });
        }

        console.log("experience_data", experiences);

        const education = []; // Initialize an empty array to store education details

        // Select all list items in the education list
        const EducationlistItems = document.querySelectorAll('.list-group-item-education');


        if (EducationlistItems.length > 0) { // Loop through each list item and extract the details
            EducationlistItems.forEach((item) => {
                const div = item.querySelector('div');
                const strong = div ? div.querySelector('strong') : null; // Ensure div exists before querying for strong
                const fullText = div ? div.textContent.trim() : ''; // Check if div is not null
                const qualification = strong ? strong.textContent.trim() : ''; // Ensure strong exists
                const yearOfPassingMatch = item.innerHTML.match(/Year of Passing: (\d{4})/); // Regex to extract year of passing
                const yearOfPassing = yearOfPassingMatch ? yearOfPassingMatch[1] : null;

                let instituteName = fullText
                    .replace(qualification, '') // Remove qualification text
                    .replace(/Year of Passing:.*/, '') // Remove "Year of Passing" and everything after
                    .replace(/from\s*/i, '') // Remove "from" at the beginning
                    .replace(/\n/g, '') // Remove newline characters
                    .replace(/\(\s*$/, '') // Remove leftover "(" at the end
                    .trim(); // Trim any extra spaces

                if (instituteName && qualification && yearOfPassing) {
                    // Push the extracted details into the education array
                    education.push({
                        instituteName,
                        qualification,
                        yearOfPassing,
                    });
                }
            });
        }
        // Log the result to verify
        console.log('education_data', education);



        $(".skill-checkbox:checked").each(function() {
            selectedSkills.push($(this).val());
        });



        if (!address1 || !address2 || !state || !fullname || !penname || !country || !gender || !dob || !contact_number || !email || !selectedSkills || !languages_read || !languages_write || !languages_speak || languages_speak.length === 0 || languages_write.length === 0 || languages_read.length === 0 || selectedSkills.length === 0 || !description) {
            toastr.error("please fill all the required details")

            return
        }

        var awardNames = [];
        var awardYears = [];
        var awardByOrganisations = [];

        var awardImages = [];


        // Gather book names, links, and images from the inputs
        document.querySelectorAll('input[name="award_name[]"]').forEach(input => awardNames.push(input.value));
        document.querySelectorAll('input[name="award_year[]"]').forEach(input => awardYears.push(input.value));
        document.querySelectorAll('input[name="award_by_organisation[]"]').forEach(input => awardByOrganisations.push(input.value));

        document.querySelectorAll('input[name="award_image[]"]').forEach((input) => {
            if (input.files.length > 0 && input.files[0]) {
                awardImages.push(input.files[0]); // Add the uploaded file to bookImages

            } else {
                awardImages.push(null); // Push null for no new image


            }
        });

        // Append the book details including image to formData
        awardNames.forEach((name, index) => {
            formData.append('award_name[]', name);
            formData.append('award_year[]', awardYears[index]);
            formData.append('award_by_organisation[]', awardByOrganisations[index]);


            if (awardImages[index]) {
                formData.append('award_image[]', awardImages[index]);
            } else {
                return
            }


        });


        console.log('awardnames', awardNames);
        console.log('awardImages', awardImages);


        console.log('skills updating are :', selectedSkills)



        var bookNames = [];
        var bookLinks = [];
        var bookImages = [];


        // Gather book names, links, and images from the inputs
        document.querySelectorAll('input[name="book_name[]"]').forEach(input => bookNames.push(input.value));
        document.querySelectorAll('input[name="book_link[]"]').forEach(input => bookLinks.push(input.value));
        document.querySelectorAll('input[name="book_image[]"]').forEach((input) => {
            if (input.files.length > 0 && input.files[0]) {
                bookImages.push(input.files[0]); // Add the uploaded file to bookImages

            } else {
                bookImages.push(null); // Push null for no new image


            }
        });

        // Append the book details including image to formData
        bookNames.forEach((name, index) => {
            formData.append('book_name[]', name);
            formData.append('book_link[]', bookLinks[index]);

            if (bookImages[index]) {
                formData.append('book_image[]', bookImages[index]);
            } else {
                return
            }


        });


        console.log('booknames', bookNames);
        console.log('bookImages', bookImages);


        formData.append('title', title);
        formData.append('fullname', fullname);
        formData.append('penname', penname);
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
        formData.append('twitter_link', twitter_link);
        formData.append('email', email);


        formData.append('contact_number', contact_number);
        formData.append('profile_picture', profile_picture);
        formData.append('cover_photo', cover_photo);
        // formData.append('job_title', job_title);
        // formData.append('company_name', company_name);
        formData.append('experience', experience);
        formData.append('portfolio', portfolio);
        formData.append('short_bio', short_bio);

        // formData.append('highest_qualification', highest_qualification);
        // formData.append('availability', availability);
        // formData.append('certifications', certifications);
        // formData.append('published_works', published_works);
        formData.append('skills', selectedSkills.join(','));
        formData.append('experiences_data', JSON.stringify(experiences));
        formData.append('education_data', JSON.stringify(education));



        $.ajax({
            url: '/update_artist_details_api/',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                toastr.success('Details Updated successfully!', 'Success');
                window.location.href = '/artist-profile-setting_updated_one/'

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

        // var payment_method = document.getElementById("payment_method").value;
        var aadhar_front = document.getElementById("aadhar_front").files[0];
        var aadhar_back = document.getElementById("aadhar_back").files[0];
        // var opportunities = document.getElementById("opportunities").value;
        var alternate_email = document.getElementById("alternate_email").value;
        var newsletter_subscribe = document.getElementById("newsletter_subscribe").checked;
        var old_password = document.getElementById("old_password").value;
        var new_password = document.getElementById("new_password").value;
        var confirm_password = document.getElementById("confirm_password").value;
        var hide_phone = document.getElementById("hide_phone").checked;
        var hide_email = document.getElementById("hide_email").checked;
        // var feedback = document.getElementById("feedback").value;

        if (!payment_method || !aadhar_front || !aadhar_back || !opportunities || !alternate_email || !old_password || !new_password || !confirm_password || !feedback) {
            toastr.error("please fill all the details")

            return
        }

        var formData = new FormData();

        // formData.append('payment_method', payment_method);
        formData.append('aadhar_front', aadhar_front);
        formData.append('aadhar_back', aadhar_back);
        // formData.append('opportunities', opportunities);
        formData.append('alternate_email', alternate_email);
        formData.append('newsletter_subscribe', newsletter_subscribe);
        formData.append('old_password', old_password);
        formData.append('new_password', new_password);
        formData.append('confirm_password', confirm_password);
        formData.append('hide_phone', hide_phone);
        formData.append('hide_email', hide_email);
        // formData.append('feedback', feedback);

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

                    console.log(response.missing_fields)

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
                            <div class="artist-card-container col-md-6 col-12">
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
                            <div class="artist-card-container col-md-6 col-12">
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
            $('#previewButton').on('click', async function() {
                        // Get form values
                        var title = $('#title').val();
                        var fullName = $('#fullname').val();
                        var penName = $('#penname').val();
                        var name = fullName;
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
                        var twitterLink = $('#twitter_link').val();





                        async function getRenderedProfilePhotoAsFile() {

                            const hiddenPreview = document.getElementById("hiddenProfilePicturePreview")

                            const fileInput = document.getElementById("profile_picture");

                            if (fileInput && fileInput.files && fileInput.files[0]) {
                                return fileInput.files[0]; // Return the uploaded file
                            }

                            if (hiddenPreview && hiddenPreview.src) {

                                const coverPhotoURL = hiddenPreview.src;
                                const response = await fetch(coverPhotoURL);
                                const blob = await response.blob();

                                const file = new File([blob], "profile_photo.jpg", { type: blob.type });
                                console.log("Rendered Profile Photo as File:", file);

                                return file;
                            } else {

                                return document.getElementById("profile_picture").files[0];;
                            }

                        }

                        const profile_picture = await getRenderedProfilePhotoAsFile();

                        async function getRenderedCoverPhotoAsFile() {
                            const coverPhotoURL = document.getElementById("coverPhotoPreview").src;
                            const response = await fetch(coverPhotoURL);
                            const blob = await response.blob();

                            const file = new File([blob], "cover_photo.jpg", { type: blob.type });
                            console.log("Rendered Cover Photo as File:", file);

                            return file;
                        }
                        const cover_photo = await getRenderedCoverPhotoAsFile();


                        var defaultImage = `${STATIC_URL}images/blank_pic.png`;

                        var defaultCoverImage = `${STATIC_URL}images/hero/bg5.jpg`;

                        var experience = document.getElementById("experience").value;
                        // var certifications = document.getElementById("certifications").value;


                        // var published_works = document.getElementById("published_works").value;
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


                        const listItems = document.querySelectorAll('.list-group-item-experience');
                        const experiences = [];

                        listItems.forEach((listItem) => {
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

                            const currentlyWorking = endDate === 'Present';

                            if (designation && company && startDate) {

                                experiences.push({
                                    designation,
                                    company,
                                    startDate,
                                    endDate: currentlyWorking ? null : endDate,
                                    currentlyWorking,
                                });
                            }
                        });
                        $(".skill-checkbox:checked").each(function() {
                            selectedSkills.push($(this).val());
                        });




                        async function getRenderedImagesAsFiles() {
                            const hiddenPreviews = document.querySelectorAll(".hidden-preview");
                            const fileInput = document.getElementById("documents");

                            let filesArray = [];

                            if (hiddenPreviews.length > 0) {
                                for (let preview of hiddenPreviews) {
                                    const fileURL = preview.dataset.fileUrl;
                                    const fileName = preview.dataset.fileName;

                                    const response = await fetch(fileURL);
                                    const blob = await response.blob();

                                    const file = new File([blob], fileName, { type: blob.type });
                                    filesArray.push(file);
                                }
                            }

                            if (fileInput && fileInput.files && fileInput.files.length > 0) {

                                filesArray = filesArray.concat(Array.from(fileInput.files));
                            }

                            return filesArray;
                        }
                        var files = await getRenderedImagesAsFiles();

                        let profileImage = defaultImage;
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
                           <div class="d-flex flex-column gap-3" id="education-container">
                                    <!-- Experience cards will be dynamically added here -->
                                </div>
                            <h5 class="mt-4">Professional Details:</h5>
                            <div class="d-flex flex-column gap-3" id="experience-container">
                                    <!-- Experience cards will be dynamically added here -->
                                </div>
                             <h5 class="mt-4">Awards & Recognitions:</h5>
                            <div class="d-flex flex-wrap gap-2" id="awards_received">
                                <!-- Books Published will be dynamically added here -->
                               
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
                                            <li class="list-inline-item"><a href="${twitterLink}" target="_blank" class="rounded"><i data-feather="twitter" class="fea icon-sm align-middle" title="twitter"></i></a></li>
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


                            $('#previewContent').html(previewContent);

                            feather.replace();
                            var skillsContainer = document.getElementById("skills-container");
                            skillsContainer.innerHTML = '';

                            selectedSkills.forEach(function(skill) {
                                var badge = document.createElement("span");
                                badge.classList.add("badge", "bg-soft-primary", "rounded-pill");
                                badge.textContent = skill;
                                skillsContainer.appendChild(badge);
                            });

                            const experienceContainer = document.getElementById('experience-container');
                            experienceContainer.innerHTML = '';

                            if (experiences.length > 0) {


                                experiences.forEach((experience) => {
                                            const card = document.createElement('div');
                                            card.classList.add('card', 'shadow-sm', 'p-3', 'mb-2', 'bg-light', 'rounded');

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
        
                experienceContainer.appendChild(card);


                
            });

        } else{
            experienceContainer.innerHTML = '<p>No experience available.</p>';
        
        }

        const educationContainer = document.getElementById('education-container');
        educationContainer.innerHTML = '';

        if (educations.length > 0) {
            educations.forEach((education, index) => {
                const card = document.createElement('div');
                card.classList.add('card', 'shadow-sm', 'p-3', 'mb-2', 'bg-light', 'rounded');

                card.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="card-title mb-2">${education.qualification} from ${education.schoolInstitute}</h6>
                        <span class="badge bg-info text-white">Year of Passing: ${education.yearOfPassing}</span>
                    </div>
                `;

               

                educationContainer.appendChild(card);
            });
        } else {
            educationContainer.innerHTML = '<p>No education details available.</p>';
        }

        // Variables for existing books
var existingBookNames = [];
var existingBookLinks = [];
var existingBookImages = [];

        var bookNames = [];
        var bookLinks = [];
        var bookImages = [];
        
        // Gather book names, links, and images from the inputs
        document.querySelectorAll('input[name="book_name[]"]').forEach(input => bookNames.push(input.value));
        document.querySelectorAll('input[name="book_link[]"]').forEach(input => bookLinks.push(input.value));
        
        document.querySelectorAll('input[name="book_image[]"]').forEach(input => {
            if (input.files[0]) {
                bookImages.push(input.files[0]);
            } else {
                bookImages.push(null); // No image selected
            }
        });


// Gather existing book data
document.querySelectorAll('input[name="existing_book_name[]"]').forEach(input => existingBookNames.push(input.value));
document.querySelectorAll('input[name="existing_book_link[]"]').forEach(input => existingBookLinks.push(input.value));
document.querySelectorAll('input[name="existing_book_image[]"]').forEach(input => {
    existingBookImages.push(input.value || null); // Push the image URL or null
});

        
        // Combine new books and existing books into one array
var books = [
    ...existingBookNames.map((name, index) => ({
        book_name: name,
        book_link: existingBookLinks[index],
        book_image: existingBookImages[index] ? existingBookImages[index] : null,
        is_existing: true // Mark as existing
    })),
    ...bookNames.map((name, index) => ({
        book_name: name,
        book_link: bookLinks[index],
        book_image: bookImages[index] ? bookImages[index] : null,
        is_existing: false // Mark as new
    }))
];
        
        const booksContainer = document.getElementById("books_published");
        booksContainer.innerHTML = "";
        
        if (books && books.length > 0) {
            books.forEach(book => {
                if (book.book_name && book.book_link) {
                    // Create a div for each book entry
            const bookEntry = document.createElement("div");
            bookEntry.className = "book-entry mb-3 text-center";
            bookEntry.style.width = "100px"; // Fixed width for proper alignment
        
                    // Create image preview element (Image should be on top)
                    if (book.book_image) {
                        const img = document.createElement("img");
                         // Set the preview image src
                            img.alt = book.book_name;
                            img.style.width = "50px"; // Fixed width for image
                img.style.height = "50px"; // Fixed height for image
                img.style.objectFit = "cover"; // Ensure proper fit
                img.style.borderRadius = "8px"; // Rounded corners
                img.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"; // Shadow for better visual appeal
                img.style.cursor = "pointer"; // Indicate it's clickable
                             // Set image source
                if (book.is_existing) {
                    img.src = `/media/${book.book_image}`;// Use the existing image URL
                } else {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        img.src = e.target.result; // Set the preview image src
                    };
                    reader.readAsDataURL(book.book_image); // Read the image file as a DataURL
                }
                            // Add click event to open the image in a new tab
                            img.addEventListener("click", function() {
                                window.open(img.src, "_blank"); // Open image in a new tab
                            });
                            
                            // Append the image to the book entry first (it should be the first child)
                            bookEntry.appendChild(img);
                        
                
                        // Read the image file as a DataURL
                    }
        
                    // Create book name and link (The book name should be below the image)
                    const bookInfo = document.createElement("div");
                    
                    bookInfo.className = "mt-2"; // Add margin for spacing

            // Create the anchor element for the book name
            const anchor = document.createElement("a");
            anchor.href = book.book_link; // Link to the book
            anchor.target = "_blank"; // Open the link in a new tab
            anchor.className = "text-decoration-none"; // Remove default text decoration
            anchor.style.color = "#0d6efd"; // Bootstrap primary color
            anchor.innerText = book.book_name; // Set the book name as the link text
        
                    // Append the book name and link to the book info
                    bookInfo.appendChild(anchor);
                    
                    // Append the book info (name and link) below the image
                    bookEntry.appendChild(bookInfo);
        
                    // Append the entire book entry to the books container
                    booksContainer.appendChild(bookEntry);
                }
            });
        } else {
            const noBooksMessage = document.createElement("span");
            noBooksMessage.innerText = "No Books Published.";
            booksContainer.appendChild(noBooksMessage);
        }
        


                // Variables for existing books
var existingAwardNames = [];
var existingAwardYears = [];
var existingAwardByOrganisations = [];

var existingAwardImages = [];

        var awardNames = [];
        var awardYears = [];
        var awardImages = [];
        var awardByOrganisations = [];

        
        // Gather book names, links, and images from the inputs
        document.querySelectorAll('input[name="award_name[]"]').forEach(input => awardNames.push(input.value));
        document.querySelectorAll('input[name="award_year[]"]').forEach(input => awardYears.push(input.value));
        document.querySelectorAll('input[name="award_by_organisation[]"]').forEach(input => awardByOrganisations.push(input.value));

        document.querySelectorAll('input[name="award_image[]"]').forEach(input => {
            if (input.files[0]) {
                awardImages.push(input.files[0]);
            } else {
                awardImages.push(null); // No image selected
            }
        });


// Gather existing book data
document.querySelectorAll('input[name="existing_award_name[]"]').forEach(input => existingAwardNames.push(input.value));
document.querySelectorAll('input[name="existing_award_year[]"]').forEach(input => existingAwardYears.push(input.value));
document.querySelectorAll('input[name="existing_award_by_organisation[]"]').forEach(input => existingAwardByOrganisations.push(input.value));


document.querySelectorAll('input[name="existing_award_image[]"]').forEach(input => {
    existingAwardImages.push(input.value || null); // Push the image URL or null
});

        
        // Combine new books and existing books into one array
var awards = [
    ...existingAwardNames.map((name, index) => ({
        award_name: name,
        award_year: existingAwardYears[index],
        award_by_organisation: existingAwardByOrganisations[index],
        award_image: existingAwardImages[index] ? existingAwardImages[index] : null,
        is_existing: true // Mark as existing
    })),
    ...awardNames.map((name, index) => ({
        award_name: name,
        award_year: awardYears[index],
        award_by_organisation: awardByOrganisations[index],

        award_image: awardImages[index] ? awardImages[index] : null,
        is_existing: false // Mark as new
    }))
];
        
const awardsContainer = document.getElementById("awards_received");
awardsContainer.innerHTML = "";

if (awards && awards.length > 0) {
    awards.forEach(award => {
        if (award.award_name && award.award_year && award.award_by_organisation) {
            // Create the card container
            const card = document.createElement("div");
            card.className = "card shadow-sm bg-light";
            card.style.width = "150px";
            card.style.borderRadius = "10px";

            // Create the card body
            const cardBody = document.createElement("div");
            cardBody.className = "card-body p-2 text-center";

            // Award Image
            if (award.award_image) {
                const imageLink = document.createElement("a");
                imageLink.href = award.is_existing
                    ? `/media/${award.award_image}`
                    : "#"; // Fallback if image is not existing
                imageLink.target = "_blank";

                const img = document.createElement("img");
                img.alt = award.award_name;
                img.className = "img-fluid rounded-square";
                img.style.width = "70px";
                img.style.height = "70px";
                img.style.objectFit = "cover";
                img.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";

                if (award.is_existing) {
                    img.src = `/media/${award.award_image}`;
                } else {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(award.award_image);
                }

                imageLink.appendChild(img);
                cardBody.appendChild(imageLink);
            }

            // Award Details
            const detailsContainer = document.createElement("div");
            detailsContainer.className = "mt-2";

            // Award Name
            const awardName = document.createElement("div");
            awardName.className = "font-weight-bold text-dark";
            awardName.style.fontSize = "14px";
            awardName.innerText = award.award_name;
            detailsContainer.appendChild(awardName);

            // Award Year
            const awardYear = document.createElement("div");
            awardYear.className = "text-muted";
            awardYear.style.fontSize = "12px";
            awardYear.innerText = award.award_year;
            detailsContainer.appendChild(awardYear);

            // Award By Organisation
            const awardByOrganisation = document.createElement("div");
            awardByOrganisation.className = "text-muted";
            awardByOrganisation.style.fontSize = "10px";
            awardByOrganisation.innerText = award.award_by_organisation;
            detailsContainer.appendChild(awardByOrganisation);

            cardBody.appendChild(detailsContainer);
            card.appendChild(cardBody);
            awardsContainer.appendChild(card);
        }
    });
} else {
    const noAwardsMessage = document.createElement("span");
    noAwardsMessage.innerText = "No Awards & Recognitions.";
    awardsContainer.appendChild(noAwardsMessage);
}

        

                    const imagePreviewContainer = document.getElementById('image-preview-container');
                    imagePreviewContainer.innerHTML = '';
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
                                img.style.width = '50px';
                                img.style.height = '50px';
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
     
    
    if (profile_picture) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImage = e.target.result;

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

    if (cover_photo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            coverImage = e.target.result;

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

    if (!profile_picture && !cover_photo) {
        updatePreview(profileImage,files, coverImage);
        $('#previewModal').modal('show');

    }

    });
});



$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var searchQuery = urlParams.get('search_query');

    if (searchQuery) {
        console.log("Search query:", searchQuery);

        var newURL = window.location.origin + window.location.pathname; 
        window.history.replaceState({}, document.title, newURL);
    }
});