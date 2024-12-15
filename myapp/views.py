from datetime import datetime

from django.shortcuts import redirect, render

# Create your views here.


def index(request):
    
    user = request.user
    print('user',user)
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'index.html',{"user":user,'profile_picture': profile_picture})

def aboutus(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'aboutus.html',{"user":user,'profile_picture': profile_picture})


def blog_detail(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None  
    
    return render(request, 'blog-detail.html',{"user":user,'profile_picture': profile_picture})

def blog_sidebar(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'blog-sidebar.html',{"user":user,'profile_picture': profile_picture})

def blogs(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'blogs.html',{"user":user,'profile_picture': profile_picture})

def artist_profile_updated_one(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    
    return render(request, 'candidate-profile_updated_one.html',{"user":user,'profile_picture': profile_picture})

def artist_profile_setting_updated_one(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
      
    return render(request, 'candidate-profile-setting_updated_one.html',{"user":user,'profile_picture': profile_picture})

def artist_profile_setting(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'candidate-profile-setting.html',{"user":user,'profile_picture': profile_picture})


def artist_profile(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'candidate-profile.html',{"user":user,'profile_picture': profile_picture,'additional_info':additional_info})

from django.db.models import Count

def artists(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None

    artists = ArtistMasterBasic.objects.all().exclude(is_superuser=True)

    additional_details = ArtistMasterAdditional.objects.select_related('user').prefetch_related('skills').all()

    artists_with_details = []
    for artist in artists:

        additional_info = additional_details.filter(user=artist).first()
        
        skills = additional_info.skills.all() if additional_info else []

        artists_with_details.append({
            'basic': artist,
            'additional': additional_info,
            'skills': skills
        })
    skill_counts = (
        ArtistMasterAdditional.objects.prefetch_related('skills')
        .values('skills__name')  # Group by skill name
        .annotate(count=Count('skills'))  # Count each skill
        .order_by('-count')  # Optional: Order by descending count
    )

    # Transform skill_counts to a dictionary for easier usage in templates
    skill_counts_dict = {item['skills__name']: item['count'] for item in skill_counts if item['skills__name']}

    context = {
        'user': user,
        'profile_picture': profile_picture,
        'artists_with_details': artists_with_details,
        'skill_counts': skill_counts_dict,  # Add skill counts to the context
    }    

    context = {
        'user': user,
        'profile_picture': profile_picture,
        'artists_with_details': artists_with_details,
        'skill_counts': skill_counts_dict
    }
    
    return render(request, 'candidates.html', context)





def career(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'career.html',{"user":user,'profile_picture': profile_picture})

def comingsoon(request):
    
    return render(request, 'comingsoon.html')

def contactus(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'contactus.html',{"user":user,'profile_picture': profile_picture})

def services_prvdr_profile(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'employer-profile.html',{"user":user,'profile_picture': profile_picture})

def services_prvdr(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'employers.html',{"user":user,'profile_picture': profile_picture})

def error(request):
    
    return render(request, 'error.html')

def helpcenter_faqs(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'helpcenter-faqs.html',{"user":user,'profile_picture': profile_picture})

def helpcenter_guides(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'helpcenter-guides.html',{"user":user,'profile_picture': profile_picture})

def helpcenter_overview(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'helpcenter-overview.html',{"user":user,'profile_picture': profile_picture})

def helpcenter_support(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'helpcenter-support.html',{"user":user,'profile_picture': profile_picture})

def index_three(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    return render(request, 'index-three.html',{"user":user,'profile_picture': profile_picture})


def index_two(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'index-two.html',{"user":user,'profile_picture': profile_picture})

def services_apply(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-apply.html',{"user":user,'profile_picture': profile_picture})

def services_categories(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-categories.html',{"user":user,'profile_picture': profile_picture})

def services_detail_one(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-detail-one.html',{"user":user,'profile_picture': profile_picture})

def services_detail_two(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-detail-two.html',{"user":user,'profile_picture': profile_picture})

def services_detail_three(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-detail-three.html',{"user":user,'profile_picture': profile_picture})

def services_grid_one(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-grid-one.html',{"user":user,'profile_picture': profile_picture})

def services_grid_two(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-grid-two.html',{"user":user,'profile_picture': profile_picture})

def services_grid_three(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-grid-three.html',{"user":user,'profile_picture': profile_picture})

def services_grid_four(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-grid-four.html',{"user":user,'profile_picture': profile_picture})

def services_list_one(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-list-one.html',{"user":user,'profile_picture': profile_picture})

def services_list_two(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-list-two.html',{"user":user,'profile_picture': profile_picture})

def services_post(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'job-post.html',{"user":user,'profile_picture': profile_picture})

def services(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'services.html',{"user":user,'profile_picture': profile_picture})

def lock_screen(request):
    
    return render(request, 'lock-screen.html')

def login_page(request):
    if request.user.is_authenticated:
         return redirect('/artist-profile/')
    
    return render(request,'login.html')

def maintenance(request):
    
    return render(request, 'maintenance.html')

def pricing(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'pricing.html',{"user":user,'profile_picture': profile_picture})

def privacy(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'privacy.html',{"user":user,'profile_picture': profile_picture})

def reset_password(request):
    
    return render(request, 'reset-password.html')


def signup_page(request):
    
    if request.user.is_authenticated:
         return redirect('/') 
    return render(request, 'signup.html')


def terms(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'terms.html',{"user":user,'profile_picture': profile_picture})



import requests
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login


User = get_user_model()

def verify_recaptcha(token):
    secret_key = settings.RECAPTCHA_SECRET_KEY  
    url = 'https://www.google.com/recaptcha/api/siteverify'
    response = requests.post(url, data={'secret': secret_key, 'response': token})
    result = response.json()
    return result.get('success', False)

@csrf_exempt
def signup_api(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        contact_number = request.POST.get('contact_number')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')
        recaptcha_token = request.POST.get('recaptcha_token')

        if not verify_recaptcha(recaptcha_token):
            return JsonResponse({'error': 'Invalid reCAPTCHA. Please try again.'}, status=400)

        if password != password2:
            return JsonResponse({'error': 'Passwords do not match.'}, status=400)

        if User.objects.filter(email=email).exists():
                return JsonResponse({"email": ["Email already in use."]}, status=400)
       
        try:
            user = User(name=name, 
                        email=email,
                        contact_number=contact_number
                        )
            user.set_password(password)
            user.save()
            return JsonResponse({'message': 'Registration successful!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        
@csrf_exempt        
def login_api(request):
    if request.method =="POST":
        email_or_contact = request.POST.get("email_or_contact") 
        password = request.POST.get("password") 
        recaptcha_token = request.POST.get('recaptcha_token') 
        print('email', email_or_contact)
        print('password', password)
        if not verify_recaptcha(recaptcha_token):
            return JsonResponse({'error': 'Invalid reCAPTCHA. Please try again.'}, status=400)
        
        user = authenticate(request, username=email_or_contact, password=password)
        
        if user is not None:        
            login(request,user)
            
            return JsonResponse({'message': 'Login successful', 'redirect_url': '/artist-profile/'})
        
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


from django.shortcuts import redirect
from django.contrib.auth import logout
def logout_view(request):
    if request.user.is_authenticated: 
        logout(request) 
        return redirect('login')  
   

from .models import ArtistMasterAdditional, ArtistMasterBasic, Skill
from django.contrib.auth.decorators import login_required
@csrf_exempt
@login_required
def update_personal_details_api(request):              

    if request.method == 'POST':
    
        
        email = request.POST.get('email')
        contact_number = request.POST.get('contact_number')
    
        
        artist_master = User.objects.get(id=request.user.id)
        
        if email:
            artist_master.email = email
        
        if contact_number:
            artist_master.contact_number = contact_number
            
        artist_master.save()
        
        try:
            artist = ArtistMasterAdditional.objects.get(user=request.user)
        except ArtistMasterAdditional.DoesNotExist:
            artist = ArtistMasterAdditional(user=request.user)
        
        dob_input = request.POST.get('dob')
        if dob_input:
            try:
                dob = datetime.strptime(dob_input, '%Y-%m-%d').date()
                artist.dob = dob
            except ValueError:
                return JsonResponse({'error': 'Invalid date format. It must be in YYYY-MM-DD format.'}, status=400)
       
        if request.POST.get('firstname'):
            artist.firstname = request.POST.get('firstname')
        
        if request.POST.get('lastname'):
            artist.lastname = request.POST.get('lastname')
        
        if request.POST.get('gender'):
            artist.gender = request.POST.get('gender')
        
        if request.POST.get('country'):
            artist.country = request.POST.get('country')
        
        if 'profile_picture' in request.FILES:
            artist.profile_picture = request.FILES['profile_picture']    
        
        if request.POST.get('address'):
            artist.address = request.POST.get('address')
        
        if request.POST.get('description'):
            artist.description = request.POST.get('description')
        
        if request.POST.get('introduction'):
            artist.introduction = request.POST.get('introduction')
        
        if request.POST.get('languages_read'):
            artist.languages_read = request.POST.get('languages_read')
        
        if request.POST.get('languages_write'):
            artist.languages_write = request.POST.get('languages_write')
        
        if request.POST.get('languages_speak'):
            artist.languages_speak = request.POST.get('languages_speak')
        
        if request.POST.get('facebook_link'):
            artist.facebook_link = request.POST.get('facebook_link')
        
        if request.POST.get('instagram_link'):
            artist.instagram_link = request.POST.get('instagram_link')
        
        if request.POST.get('linkedin_link'):
            artist.linkedin_link = request.POST.get('linkedin_link')
        
        artist.save()

        return JsonResponse({'message': 'Personal Details Updated successfully!'}, status=200)

    return JsonResponse({'error': 'Invalid method'}, status=400)


@csrf_exempt
@login_required
def update_professional_details_api(request):              

    if request.method == 'POST':
        
        try:
            artist = ArtistMasterAdditional.objects.get(user=request.user)
        except ArtistMasterAdditional.DoesNotExist:
            artist = ArtistMasterAdditional(user=request.user)
        
        # Update only if the field has a value
        if request.POST.get('job_title'):
            artist.job_title = request.POST.get('job_title')
        
        if request.POST.get('company_name'):
            artist.company_name = request.POST.get('company_name')
        
        if request.POST.get('experience'):
            artist.experience = request.POST.get('experience')
        
        if request.POST.get('portfolio'):
            artist.portfolio = request.POST.get('portfolio')
        
        if request.POST.get('short_bio'):
            artist.short_bio = request.POST.get('short_bio')
        
        if request.POST.get('availability'):
            artist.availability = request.POST.get('availability')
        
        if request.POST.get('skills'):
            skill_names = request.POST.get('skills').split(',')  
            
            skills = []
            for skill_name in skill_names:
                
                skill, created = Skill.objects.get_or_create(name=skill_name)
                if created:
                  
                    skills.append(skill)
                else:
                  
                    skills.append(skill)
           
            artist.skills.set(skills)
        
        if request.POST.get('certifications'):
            artist.certifications = request.POST.get('certifications')
        
        if request.POST.get('published_works'):
            artist.published_works = request.POST.get('published_works')
        
        if request.POST.get('awards'):
            artist.awards = request.POST.get('awards')

        artist.save()

        return JsonResponse({'message': 'Professional Details Updated successfully!'}, status=200)
    
    return JsonResponse({'error': 'Invalid method'}, status=400)


from django.contrib.auth import update_session_auth_hash
@login_required
@csrf_exempt
def update_other_details_api(request):
    if request.method == 'POST':
        user = request.user  
        old_password = request.POST.get('old_password')
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')

        if not user.check_password(old_password):
            return JsonResponse({'error': 'Old password is incorrect'}, status=400)

        if new_password != confirm_password:
            return JsonResponse({'error': 'New password and confirm password do not match'}, status=400)
        if new_password: 
            user.set_password(new_password)
            user.save()

        try:
            artist = ArtistMasterAdditional.objects.get(user=request.user)
        except ArtistMasterAdditional.DoesNotExist:
            artist = ArtistMasterAdditional(user=request.user)
            
        if old_password:
            artist.old_password = old_password
        if new_password:
            artist.new_password = new_password

        if  request.POST.get('hide_phone'):
            artist.hide_phone = request.POST.get('hide_phone').lower() == 'true'
        if request.POST.get('hide_email'):
            artist.hide_email = request.POST.get('hide_email').lower() == 'true'
        if request.POST.get('feedback'):
            artist.feedback =  request.POST.get('feedback')
        
        if  request.POST.get('payment_method'):
            artist.payment_method = request.POST.get('payment_method')
        if request.POST.get('newsletter_subscribe'):
            artist.newsletter_subscribe = request.POST.get('newsletter_subscribe').lower() == 'true'
        if request.POST.get('opportunities'):
            artist.opportunities =  request.POST.get('opportunities')
            
        if  request.POST.get('alternate_email'):
            artist.alternate_email = request.POST.get('alternate_email')
    

        if 'aadhar_front' in request.FILES:
            artist.aadhar_front = request.FILES['aadhar_front']
        if 'aadhar_back' in request.FILES:
            artist.aadhar_back = request.FILES['aadhar_back']

        artist.save()

        update_session_auth_hash(request, user)

        return JsonResponse({'message': 'Password and details updated successfully'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)




@login_required
def check_profile_completion(request):
    user = request.user

    try:
        profile = ArtistMasterAdditional.objects.get(user=user)
    except ArtistMasterAdditional.DoesNotExist:
        return JsonResponse({
            'status': 'incomplete',
            'message': 'Profile does not exist. Please contact support.'
        })

    # Fields to check for completion
    required_fields = [
        'firstname', 'lastname', 'gender', 'dob', 'country', 'address',
        'description', 'introduction', 'languages_read', 'languages_write',
        'languages_speak', 'facebook_link', 'instagram_link', 'linkedin_link',
        'job_title', 'company_name', 'experience', 'portfolio', 'short_bio',
        'availability','certifications',
        'published_works', 'awards', 'payment_method', 'aadhar_front',
        'aadhar_back', 'opportunities', 'alternate_email'
    ]

    # Check for incomplete fields
    incomplete_fields = []
    for field in required_fields:
        if not getattr(profile, field, None): 
            incomplete_fields.append(field)

    if incomplete_fields:
        return JsonResponse({
            'status': 'incomplete',
            'message': 'Profile update pending',
            'missing_fields': incomplete_fields, 
        })
    else:
        return JsonResponse({
            'status': 'complete',
            'message': 'Profile is complete.'
        })
        
from django.db.models import Q
from django.http import JsonResponse
from .models import ArtistMasterBasic, Skill

def search_artists(request):
    search_query = request.GET.get('search_query', '')

    if search_query:
        # Filter artists based on the search query
        artists = ArtistMasterBasic.objects.filter(
            Q(additional_info__skills__name__icontains=search_query) |  # Search by skills
            Q(additional_info__description__icontains=search_query) |  # Search by description
            Q(name__icontains=search_query)  # Search by artist name
        ).prefetch_related('additional_info', 'additional_info__skills').distinct()  # Prefetch related skills

    else:
        artists = ArtistMasterBasic.objects.all().prefetch_related('additional_info', 'additional_info__skills')

    # Serialize the artists' data
    artists_data = []
    for artist in artists:
        additional_info = artist.additional_info.first()  
        
        
        skills = [skill.name for skill in additional_info.skills.all()] if additional_info else []

        artists_data.append({
            'name': artist.name,
            'skills': skills,  # Include skills in the response
            'job_title': additional_info.job_title if additional_info else '',
            'profile_picture': additional_info.profile_picture.url if additional_info.profile_picture else ''
        })

    return JsonResponse({'artists_with_details': artists_data})




def filter_artists(request):
   
    category = request.GET.get('category', '')
    location = request.GET.get('location', '')
    selected_skills = request.GET.getlist('skills[]')
    
    artists = ArtistMasterAdditional.objects.all()

    if category:
        artists = artists.filter(description=category)
    
    if location:
        artists = artists.filter(country=location)
        
    if selected_skills:
        for skill in selected_skills:
            artists = artists.filter(skills__name=skill)   

    if artists.exists():
        artist_data = []
        for artist in artists:
            additional_info = artist  
            skills = [skill.name for skill in additional_info.skills.all()] if additional_info else []
            artist_data.append({
                'name': artist.user.name,
                'description': artist.description,
                'skills': skills,
                'job_title': artist.job_title   ,
                'country': artist.country,
                'profile_picture': artist.profile_picture.url if artist.profile_picture else None
            })

        return JsonResponse({'artists_with_details': artist_data})
    else:
        # Return an empty list if no artists match the filters
        return JsonResponse({'artists_with_details': []})

