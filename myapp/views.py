from datetime import datetime
import json

from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.urls import reverse




# Create your views here.


def index(request):
      
    user = request.user
    profile_picture = None
    if user.is_authenticated:  
            try:
                additional_info = ArtistMasterAdditional.objects.get(user=user)
                profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
            except ArtistMasterAdditional.DoesNotExist:
                profile_picture = None 
    artists = ArtistMasterBasic.objects.all().exclude(is_superuser=True).order_by('?')[:3]
    blogs = Blog.objects.all()
    print("blog",blogs)
    # Prefetch related additional details and skills
    additional_details = ArtistMasterAdditional.objects.select_related('user').prefetch_related('skills')

    artists_with_details = []
    for artist in artists:
        additional_info = additional_details.filter(user=artist).first()
        skills = additional_info.skills.all() if additional_info else []
        artists_with_details.append({
            'basic': artist,
            'additional': additional_info,
            'skills': skills
        })             
        
    return render(request, 'index-three.html',{"user":user,'profile_picture': profile_picture,"artists_with_details":artists_with_details,"blogs":blogs})

def aboutus(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    return render(request, 'aboutus.html',{"user":user,'profile_picture': profile_picture})

def blog_detail(request, blog_id):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    # Use get_object_or_404 to handle missing blogs gracefully
    blog = get_object_or_404(Blog, id=blog_id)    
    blog_tags = blog.blog_tags.split(",")

    # Pass a single dictionary with all required data
    context = {
        "user": user,
        "profile_picture": profile_picture,
        "blog": blog,
        "blog_tags": blog_tags,
    }
    return render(request, 'blog-detail.html', context)

def blog_sidebar(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    return render(request, 'blog-sidebar.html',{"user":user,'profile_picture': profile_picture})

def blogs(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    # Fetch all blogs
    blog_list = Blog.objects.all()

    # Implement pagination with 9 blogs per page
    paginator = Paginator(blog_list, 9)
    page_number = request.GET.get('page')  # Get current page number from the query parameter
    blogs = paginator.get_page(page_number)  # Get blogs for the current page

    context = {
        "user": user,
        "profile_picture": profile_picture,
        "blogs": blogs,
    }
    return render(request, 'blogs.html', context)


def artist_profile(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    
    return render(request, 'candidate-profile.html',{"user":user,'profile_picture': profile_picture})

@login_required
def artist_profile_setting_updated_one(request):
    user = request.user
    full_name = None
    description = ''
    profile_picture = None
    additional_info = None
    skills = []
    cover_photo = None
    books =[]
    awards =[]
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        cover_photo = additional_info.cover_photo.url if additional_info.cover_photo else None
        description = additional_info.description if additional_info and additional_info.description else ''
        skills = additional_info.skills.values_list('name', flat=True)
        awards = additional_info.awards_received.all()
        books = additional_info.books_published.all()
        fullname = additional_info.fullname if additional_info.fullname else None
       
        if fullname :
            full_name = f"{fullname}".strip()

    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
        full_name = None
        description = ''
        skills = []
        cover_photo = None
        books =[]
        awards =[]

      
    return render(request, 'candidate-profile-setting_updated_one.html',{"user":user,'profile_picture': profile_picture,'full_name':full_name,'description':description,"additional_info":additional_info,'skills': skills,'cover_photo': cover_photo,'books':books,'awards':awards})

def artist_profile_setting(request):
    user = request.user
    try:
        additional_info = ArtistMasterAdditional.objects.get(user=user)
        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        

    except ArtistMasterAdditional.DoesNotExist:
        profile_picture = None 
    
    return render(request, 'candidate-profile-setting.html',{"user":user,'profile_picture': profile_picture})


from datetime import date

def calculate_experience_duration(start_date, end_date=None):
    """
    Calculate the duration between two dates in years and months.
    If end_date is not provided, it defaults to today's date.
    """
    if not start_date:
        return 0, 0

    end_date = end_date or date.today()
    delta = end_date - start_date

    years = delta.days // 365
    months = (delta.days % 365) // 30

    return years, months


@login_required(login_url='/login/')  
def artist_profile_updated_one(request):
    user = request.user
    profile_picture = None
    additional_info = None
    cover_photo =None
    skills = []
    experience_details = []
    images = []
    full_name = None
    total_experience_years = 0
    total_experience_months = 0

    try:
        # Try fetching the artist's additional data
        additional_info = ArtistMasterAdditional.objects.get(user=request.user)
        cover_photo = additional_info.cover_photo.url if additional_info.cover_photo else None

        profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        fullname = additional_info.fullname if additional_info.fullname else None
        
        
        if fullname:
            full_name = f"{fullname}".strip()
        skills = additional_info.skills.all() if additional_info.skills.exists() else []
        experience_details = additional_info.experience_details.all() if additional_info.experience_details.exists() else []
        images = additional_info.images.all()

        for experience in experience_details:
            start_date = experience.start_date
            end_date = experience.end_date if not experience.currently_working else None

            years, months = calculate_experience_duration(start_date, end_date)
            total_experience_years += years
            total_experience_months += months

        # Normalize months to years and months
        total_experience_years += total_experience_months // 12
        total_experience_months = total_experience_months % 12

    except ArtistMasterAdditional.DoesNotExist:
        # Handle case where additional_info does not exist
        profile_picture = None
        full_name = None 
        skills = []
        experience_details = []
        cover_photo = None

   
    artists_with_details = []

    artists = ArtistMasterBasic.objects.all().exclude(is_superuser=True).exclude(id=user.id).order_by('?')[:3]

    for artist in artists:
  
        additional = ArtistMasterAdditional.objects.filter(user=artist).select_related('user').prefetch_related('skills').first()
     
        skills = additional.skills.all() if additional else []
   
        artists_with_details.append({
            'basic': artist,
            'additional': additional,
            'skills': skills
        })


    return render(request,
                  'candidate-profile_updated_one.html',
                  {
                      "artist_user": user,
                      'profile_picture': profile_picture,
                      'cover_photo':cover_photo,
                      'additional_info': additional_info,
                      'full_name': full_name,
                      "is_logged_in_user": True,
                      'skills': skills,
                      'experience_details': experience_details,
                      'images': images,
                      'total_experience': f"{total_experience_years} years, {total_experience_months} months",
                      "artists_with_details": artists_with_details
                  })


from django.shortcuts import get_object_or_404
from .models import ArtistMasterBasic, ArtistMasterAdditional, Awards, Blog, BooksPublished, Education, Experience, Gallery

def artist_profile_updated_one_Id(request, id):
    
    logged_in_user = request.user
    profile_picture = None
    cover_photo =None
    skills = []
    experience_details = [] # Initialize a list for experience details
    images=[]
    total_experience_years = 0
    total_experience_months = 0
    
    if logged_in_user.is_authenticated:
        try:
            logged_in_additional_info = ArtistMasterAdditional.objects.get(user=logged_in_user)
            profile_picture = (
                logged_in_additional_info.profile_picture.url
                if logged_in_additional_info.profile_picture
                else None
            )
            cover_photo = (
                logged_in_additional_info.cover_photo.url
                if logged_in_additional_info.cover_photo
                else None
            )
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None
            cover_photo = None
        
    artist_basic = get_object_or_404(ArtistMasterBasic, id=id)
    additional_info_user = None
    profile_picture_user = None
    full_name_user = None
    cover_photo_user =None
    
    try:
        additional_info_user = ArtistMasterAdditional.objects.get(user=artist_basic)
        profile_picture_user = additional_info_user.profile_picture.url if additional_info_user.profile_picture else None
        cover_photo_user = additional_info_user.cover_photo.url if additional_info_user.cover_photo else None

        fullname_user = additional_info_user.fullname if additional_info_user.fullname else None
        full_name_user = f"{fullname_user}".strip() if fullname_user  else None
        skills = additional_info_user.skills.all()
        experience_details = additional_info_user.experience_details.all()
        images = additional_info_user.images.all()
        for experience in experience_details:
            start_date = experience.start_date
            end_date = experience.end_date if not experience.currently_working else None

            years, months = calculate_experience_duration(start_date, end_date)
            total_experience_years += years
            total_experience_months += months

        # Normalize months to years and months
        total_experience_years += total_experience_months // 12
        total_experience_months = total_experience_months % 12
    except ArtistMasterAdditional.DoesNotExist:
        profile_picture_user = None
        full_name_user = None
        cover_photo_user = None
    
    artists = ArtistMasterBasic.objects.all().exclude(is_superuser=True).order_by('?')[:3]

    # Prefetch related additional details and skills
    additional_details = ArtistMasterAdditional.objects.select_related('user').prefetch_related('skills')

    artists_with_details = []
    for artist in artists:
        additional_info = additional_details.filter(user=artist).first()
        skills = additional_info.skills.all() if additional_info else []
        artists_with_details.append({
            'basic': artist,
            'additional': additional_info,
            'skills': skills
        })    
        
    return render(request, 'candidate-profile_updated_one.html', {
        "artist_user": artist_basic,
        "profile_picture_user": profile_picture_user,
        'cover_photo_user': cover_photo_user,
        "additional_info_user": additional_info_user,
        "full_name_user": full_name_user,
        "is_logged_in_user": False,
        "profile_picture":profile_picture,
        'skills': skills,
        'experience_details': experience_details,
        'images':images,
        'total_experience': f"{total_experience_years} years, {total_experience_months} months",
        'artists_with_details':artists_with_details
        
    })


from django.db.models import Count
import re

from django.shortcuts import render
from django.db.models import Count, Q
import re
from django.core.paginator import Paginator


def artists(request):
    user = request.user
    search_query = request.GET.get('search_query', '').strip()
    print("searched_query",search_query)# Get and clean search query
    page = request.GET.get('page', 1)

    # Handle profile picture for authenticated users
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None
    else:
        profile_picture = None

    # Filter artists based on the search query
    if search_query:
        artists = ArtistMasterBasic.objects.annotate(
       full_name = F('additional_info__full_name')
                ).filter(
                    Q(additional_info__skills__name__icontains=search_query) |  # Search by skills
                    Q(full_name__icontains=search_query) |  
                    Q(name__icontains=search_query)  # Search by artist name
                ).prefetch_related('additional_info', 'additional_info__skills').exclude(is_superuser=True).distinct()
    else:
        # Return all artists if no search query is provided
        artists = ArtistMasterBasic.objects.all().exclude(is_superuser=True)

    # Prefetch related additional details and skills
    additional_details = ArtistMasterAdditional.objects.select_related('user').prefetch_related('skills')

    artists_with_details = []
    for artist in artists:
        additional_info = additional_details.filter(user=artist).first()
        skills = additional_info.skills.all() if additional_info else []
        artists_with_details.append({
            'basic': artist,
            'additional': additional_info,
            'skills': skills
        })
    # Paginate the artists_with_details list
    paginator = Paginator(artists_with_details,8)  # Show 10 artists per page
    paginated_artists = paginator.get_page(page)    

    # Get skill counts
    skill_counts = (
        ArtistMasterAdditional.objects.prefetch_related('skills')
        .values('skills__name')
        .annotate(count=Count('skills'))
        .order_by('-count')
    )

    skill_counts_dict = {
        re.sub(r'[\s/-]', '_', item['skills__name']): item['count']
        for item in skill_counts if item['skills__name']
    }

    context = {
        "artist_user": user,
        'profile_picture': profile_picture,
        'paginated_artists': paginated_artists, 
        'skill_counts': skill_counts_dict,
        'search_query': search_query,  # Pass the search query to the template
    }

    return render(request, 'candidates.html', context)







def career(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    return render(request, 'career.html',{"user":user,'profile_picture': profile_picture})

def comingsoon(request):
    
    return render(request, 'comingsoon.html')

def contactus(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
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
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    return render(request, 'helpcenter-faqs.html',{"user":user,'profile_picture': profile_picture})

def helpcenter_guides(request):
    user = request.user
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
        profile_picture = None
    return render(request, 'helpcenter-guides.html',{"user":user,'profile_picture': profile_picture})

def helpcenter_overview(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    return render(request, 'helpcenter-overview.html',{"user":user,'profile_picture': profile_picture})

def helpcenter_support(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
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
    profile_picture = None
    if user.is_authenticated:  
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
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    return render(request, 'services.html',{"user":user,'profile_picture': profile_picture})

def lock_screen(request):
    
    return render(request, 'lock-screen.html')

def login_page(request):
    if request.user.is_authenticated:
         return redirect('/artist-profile_updated_one/')
    
    return render(request,'login.html')

def maintenance(request):
    
    return render(request, 'maintenance.html')

def pricing(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    return render(request, 'pricing.html',{"user":user,'profile_picture': profile_picture})

def privacy(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
        profile_picture = None
    return render(request, 'privacy.html',{"user":user,'profile_picture': profile_picture})

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def reset_password_page(request):
    
    return render(request, 'reset-password.html')


def signup_page(request):
    
    if request.user.is_authenticated:
         return redirect('/') 
    return render(request, 'signup.html')


def terms(request):
    user = request.user
    if user.is_authenticated:
        try:
            additional_info = ArtistMasterAdditional.objects.get(user=user)
            profile_picture = additional_info.profile_picture.url if additional_info.profile_picture else None
        except ArtistMasterAdditional.DoesNotExist:
            profile_picture = None 
    else:
       
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
            return JsonResponse({'message': 'Registration successful!','redirect_url': '/login/'}, status=201)
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
            
            return JsonResponse({'message': 'Login successful', 'redirect_url': '/artist-profile_updated_one/'})
        
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
def update_artist_details_api(request):              

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
        artist.save()
        
        dob_input = request.POST.get('dob')
        if dob_input:
            try:
                dob = datetime.strptime(dob_input, '%Y-%m-%d').date()
                artist.dob = dob
            except ValueError:
                return JsonResponse({'error': 'Invalid date format. It must be in YYYY-MM-DD format.'}, status=400)
            
        if request.POST.get('title'):
            artist.title = request.POST.get('title')
            
        if request.POST.get('fullname'):
            artist.fullname = request.POST.get('fullname')
        
        if request.POST.get('penname'):
            artist.penname = request.POST.get('penname')
        
        if request.POST.get('gender'):
            artist.gender = request.POST.get('gender')
        
        if request.POST.get('city'):
            artist.city = request.POST.get('city')    
        
        if request.POST.get('country'):
            artist.country = request.POST.get('country')
        
        if 'profile_picture' in request.FILES:
            artist.profile_picture = request.FILES['profile_picture'] 
        
        if 'cover_photo' in request.FILES:
            artist.cover_photo = request.FILES['cover_photo'] 
        
        if 'files' in request.FILES:
            files = request.FILES.getlist('files')  
            if artist.images.exists():
                artist.images.all().delete()  
            
            for file in files:
                image = Gallery.objects.create(file_name=file)
                artist.images.add(image)       
        
        if request.POST.get('address1'):
            artist.address1 = request.POST.get('address1')
            
        if request.POST.get('address2'):
            artist.address2 = request.POST.get('address2')
            
        if request.POST.get('pincode'):
            artist.pincode = request.POST.get('pincode')
            
        if request.POST.get('state'):
            artist.state = request.POST.get('state')            
        
        if request.POST.get('description'):
            artist.description = request.POST.get('description')
        
        if request.POST.get('introduction'):
            artist.introduction = request.POST.get('introduction')
        
        if request.POST.get('languages_read'):
            artist.languages_read =request.POST.get('languages_read')
        
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
        
        if request.POST.get('twitter_link'):
            artist.twitter_link = request.POST.get('twitter_link')    
            
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
            
        if request.POST.get('highest_qualification'):
            artist.highest_qualification = request.POST.get('highest_qualification')    
            
        
        book_names =request.POST.getlist('book_name[]')
        book_links = request.POST.getlist('book_link[]')
        book_images = request.FILES.getlist('book_image[]')
       
        
        print("book_images",book_images)
        

        if book_names and book_links:
            books = []

            for i, (name, link) in enumerate(zip(book_names, book_links)):
                
                if not name or not link:
                 continue  # Skip if name or year is invalid
                
                book = BooksPublished(book_name=name, book_url=link)

                
                if i < len(book_images) and book_images[i]:  # New image uploaded
                    book.book_image = book_images[i]
                else:  # No image provided
                    book.book_image = None

                # Save the book
                try:
                    book.save()
                    books.append(book)
                except Exception as e:
                    print(f"Error saving book {name}: {e}")

            if books:
                artist.books_published.add(*books)

            # Save the artist instance
            artist.save()

        # Clean up books with no associated artists
            books_without_artists = BooksPublished.objects.annotate(artist_count=Count('artist_books')).filter(artist_count=0)
            books_without_artists.delete()

        if request.POST.get('availability'):
            artist.availability = request.POST.get('availability')
            
        if request.POST.get('skills'):
           
            skill_names = request.POST.get('skills').split(',')
            
            print("skillsinterminal",skill_names)

            if skill_names:
                skills = []
                for skill_name in skill_names:
                    skill_name = skill_name.strip()  # To remove any extra spaces
                    if skill_name:
                        skill, created = Skill.objects.get_or_create(name=skill_name)
                        skills.append(skill)
                if skills:
                    artist.skills.set(skills) 
                    artist.save() 

        if 'experiences_data' in request.POST:
            try:
                experiences_data = json.loads(request.POST['experiences_data'])  
                artist.experience_details.all().delete()
                
                if experiences_data:  
                    if artist.experience_details.exists():
                        artist.experience_details.all().delete()

                    for exp in experiences_data:
                        designation = exp.get('designation')
                        company = exp.get('company')
                        start_date = exp.get('startDate')
                        end_date = exp.get('endDate')
                        currently_working = exp.get('currentlyWorking')

                        if not designation or not company or not start_date:
                            return JsonResponse({'error': 'Missing required experience fields'}, status=400)

                        try:
                            start_date = datetime.strptime(start_date, '%Y-%m-%d').date() 
                        except ValueError:
                            return JsonResponse({'error': 'Invalid start_date format'}, status=400)

                        if end_date:
                            try:
                                end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
                            except ValueError:
                                return JsonResponse({'error': 'Invalid end_date format'}, status=400)
                        else:
                            end_date = None 

                        experience = Experience.objects.create(
                            designation=designation,
                            company=company,
                            start_date=start_date,
                            end_date=end_date,
                            currently_working=currently_working,
                        )

                        artist.experience_details.add(experience)
                else:
                    pass
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid experiences data'}, status=400)
            
        if 'education_data' in request.POST:
            try:
                education_data = json.loads(request.POST['education_data'])  
                artist.education_details.all().delete()
                
                if education_data:  
                    if artist.education_details.exists():
                        artist.education_details.all().delete()

                    for edu in education_data:
                        instituteName = edu.get('instituteName')
                        qualification = edu.get('qualification')
                        yearOfPassing = edu.get('yearOfPassing')
                       

                        if not instituteName or not qualification or not yearOfPassing:
                            return JsonResponse({'error': 'Missing required education fields'}, status=400)

                        education = Education.objects.create(
                            instituteName=instituteName,
                            qualification=qualification,
                            yearOfPassing=yearOfPassing,
                            
                        )

                        artist.education_details.add(education)
                else:
                    pass
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid education data'}, status=400) 
            
        award_names =request.POST.getlist('award_name[]')
        award_years = request.POST.getlist('award_year[]')
        award_images = request.FILES.getlist('award_image[]')
       
        print("award_names",award_names)
        print("award_images",award_images)
        

        if award_names and award_years:
            awards = []

            for i, (name, year) in enumerate(zip(award_names, award_years)):
                if not name or not year:
                 continue  # Skip if name or year is invalid
                
                award = Awards(award_name=name, award_year=year)

                
                if i < len(award_images) and award_images[i]:  # New image uploaded
                    award.award_image = award_images[i]
                else:  # No image provided
                    award.award_image = None

                # Save the book
                try:
                    award.save()
                    awards.append(award)
                except Exception as e:
                    print(f"Error saving award {name}: {e}")

            if awards:
                artist.awards_received.add(*awards)

            # Save the artist instance
            artist.save()

        # Clean up books with no associated artists
            awards_without_artists = Awards.objects.annotate(artist_count=Count('artist_awards')).filter(artist_count=0)
            awards_without_artists.delete()

                

        if request.POST.get('certifications'):
            artist.certifications = request.POST.get('certifications')
        
        if request.POST.get('published_works'):
            artist.published_works = request.POST.get('published_works')
        
        if request.POST.get('awards'):
            artist.awards = request.POST.get('awards')

        artist.save()    
        
        

        return JsonResponse({'message': 'Details Updated successfully!'}, status=200)

    return JsonResponse({'error': 'Invalid method'}, status=400)


# @csrf_exempt
# @login_required
# def update_professional_details_api(request):              

#     if request.method == 'POST':
        
#         try:
#             artist = ArtistMasterAdditional.objects.get(user=request.user)
#         except ArtistMasterAdditional.DoesNotExist:
#             artist = ArtistMasterAdditional(user=request.user)
        
#         # Update only if the field has a value
#         if request.POST.get('job_title'):
#             artist.job_title = request.POST.get('job_title')
        
#         if request.POST.get('company_name'):
#             artist.company_name = request.POST.get('company_name')
        
#         if request.POST.get('experience'):
#             artist.experience = request.POST.get('experience')
        
#         if request.POST.get('portfolio'):
#             artist.portfolio = request.POST.get('portfolio')
        
#         if request.POST.get('short_bio'):
#             artist.short_bio = request.POST.get('short_bio')
        
#         if request.POST.get('availability'):
#             artist.availability = request.POST.get('availability')
        
#         if request.POST.get('skills'):
#             skill_names = request.POST.get('skills').split(',')  
            
#             skills = []
#             for skill_name in skill_names:
#                 skill, created = Skill.objects.get_or_create(name=skill_name)
#                 skills.append(skill)
            
#             artist.skills.set(skills)
        
#         # Handling experiences data
#         if 'experiences_data' in request.POST:
#             try:
#                 experiences_data = json.loads(request.POST['experiences_data'])  # Parse JSON data from the request body

#                 # Check if the artist has any existing experiences and clear them if needed
#                 if artist.experience_details.exists():
                    
#                     artist.experience_details.all().delete()

#                 # Save each new experience
#                 for exp in experiences_data:
#                     designation = exp.get('designation')
#                     company = exp.get('company')
#                     start_date = exp.get('startDate')
#                     end_date = exp.get('endDate')

#                     # Validate that required fields are present
#                     if not designation or not company or not start_date:
#                         return JsonResponse({'error': 'Missing required experience fields'}, status=400)

#                     # Convert start_date and end_date to proper DateField format if needed
#                     try:
#                         start_date = datetime.strptime(start_date, '%Y-%m-%d').date()  # Assuming format is 'YYYY-MM-DD'
#                     except ValueError:
#                         return JsonResponse({'error': 'Invalid start_date format'}, status=400)
                    
#                     if end_date:
#                         try:
#                             end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
#                         except ValueError:
#                             return JsonResponse({'error': 'Invalid end_date format'}, status=400)
#                     else:
#                         end_date = None  # If no end date, set it as None

#                     # Create and save a new Experience object
#                     experience = Experience.objects.create(
#                         designation=designation,
#                         company=company,
#                         start_date=start_date,
#                         end_date=end_date,
#                     )

#                     # Add the new experience to the artist's experience_details
#                     artist.experience_details.add(experience)
#             except json.JSONDecodeError:
#                 return JsonResponse({'error': 'Invalid experiences data'}, status=400)

#         if request.POST.get('certifications'):
#             artist.certifications = request.POST.get('certifications')
        
#         if request.POST.get('published_works'):
#             artist.published_works = request.POST.get('published_works')
        
#         if request.POST.get('awards'):
#             artist.awards = request.POST.get('awards')

#         artist.save()

#         return JsonResponse({'message': 'Professional Details Updated successfully!'}, status=200)
    
#     return JsonResponse({'error': 'Invalid method'}, status=400)



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
        'fullname', 'penname','title', 'gender', 'dob', 'country', 'address1','address2','state','pincode',
        'description', 'introduction', 'languages_read', 'languages_write',
        'languages_speak', 'facebook_link', 'instagram_link', 'linkedin_link',
        'job_title', 'company_name', 'experience', 'portfolio', 'short_bio',
        'availability','certifications',
        'published_works', 'awards', #'payment_method', 'aadhar_front',
        # 'aadhar_back', 'opportunities', 'alternate_email'
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
from django.db.models import Value
from django.db.models.functions import Concat

def search_artists(request):
    search_query = request.GET.get('search_query', '')

    if search_query:
        # Filter artists based on the search query
       artists = ArtistMasterBasic.objects.annotate(
       full_name = F('additional_info__full_name')
                ).filter(
                    Q(additional_info__skills__name__icontains=search_query) |  # Search by skills
                    Q(additional_info__description__icontains=search_query) |
                    Q(additional_info__country__icontains=search_query) |
                    Q(additional_info__state__icontains=search_query) |
                    Q(additional_info__languages_speak__icontains=search_query) |
                    Q(full_name__icontains=search_query) |  
                    Q(name__icontains=search_query)  # Search by artist name
                ).prefetch_related('additional_info', 'additional_info__skills').exclude(is_superuser=True).distinct() # Prefetch related skills

    else:
        artists = ArtistMasterBasic.objects.all().prefetch_related('additional_info', 'additional_info__skills').exclude(is_superuser=True)

    artists_data = []
    for artist in artists:
        additional_info = artist.additional_info.first()  
        
        
        skills = [skill.name for skill in additional_info.skills.all()] if additional_info else []

        artists_data.append({
            'name': artist.name,
            'id':artist.id,
            'skills': skills,  # Include skills in the response
            'short_bio': additional_info.short_bio if additional_info else '',
            'profile_picture': additional_info.profile_picture.url if additional_info and additional_info.profile_picture else ''
        })

    return JsonResponse({'artists_with_details': artists_data})


from datetime import datetime
from django.db.models import F, ExpressionWrapper, IntegerField

def filter_artists(request):
    
    total_experience_years = 0
    total_experience_months = 0
   
    category = request.GET.get('category', '')
    location = request.GET.get('location', '')
    selected_skills = request.GET.getlist('skills[]')
    years_of_experience = request.GET.getlist('years_of_experience[]')
    age = request.GET.get('age', '')
    language= request.GET.get('language', '')
    artists = ArtistMasterAdditional.objects.all()
    
    # Filtering based on years of experience
    if years_of_experience:
        filtered_artists = []
        for artist in artists:
            total_experience_years = 0
            total_experience_months = 0
            experience_details = artist.experience_details.all()
       
            # Calculate total experience for each artist
            for experience in experience_details:
                start_date = experience.start_date
                end_date = experience.end_date if not experience.currently_working else datetime.now().date()  # Consider current date if still working

                years, months = calculate_experience_duration(start_date, end_date)
                total_experience_years += years
                total_experience_months += months

            # Normalize months to years and months
            total_experience_years += total_experience_months // 12
            total_experience_months = total_experience_months % 12

            # Compare total years of experience with the selected filter range
            for range_str in years_of_experience:
                range_parts = range_str.split('-')
                if len(range_parts) == 2:
                    min_exp = int(range_parts[0])
                    max_exp = int(range_parts[1])
                    if min_exp <= total_experience_years <= max_exp:
                        filtered_artists.append(artist)
                        break
                elif range_str == "11+" and total_experience_years >= 11:
                    filtered_artists.append(artist)
                    break

        artists = ArtistMasterAdditional.objects.filter(pk__in=[a.pk for a in filtered_artists])

    if category:
        artists = artists.filter(description=category)
    
    if location:
        artists = artists.filter(country=location)
        
    if language:
        artists = artists.filter(languages_speak__icontains=language)    
  
    if age:
        try:
        
            age_int = int(age)

            current_date = datetime.now()
            current_year = current_date.year

            birth_year = current_year - age_int

            artists = artists.filter(dob__year__lte=birth_year)

        except ValueError:
            return JsonResponse({'error': 'Invalid age provided'}, status=400)
     
    if selected_skills:
        
        skill_filter = Q()
        for skill in selected_skills:
            skill_filter |= Q(skills__name=skill)  
        artists = artists.filter(skill_filter).distinct()

    if artists.exists():
        artist_data = []
        for artist in artists:
            additional_info = artist  
            skills = [skill.name for skill in additional_info.skills.all()] if additional_info else []
            artist_data.append({
                'name': artist.user.name,
                'id':artist.user.id,
                'description': artist.description,
                'skills': skills,
                'short_bio': artist.short_bio   ,
                'country': artist.country,
                'profile_picture': artist.profile_picture.url if artist.profile_picture else None
            })

        return JsonResponse({'artists_with_details': artist_data})
    else:
        return JsonResponse({'artists_with_details': []})

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from django.core.mail import send_mail
@csrf_exempt
def reset_user_password(request):
    if request.method == "POST":
        email = request.POST.get("email")

        if not email:
            return JsonResponse({"error": "Email field is empty."}, status=400)

        try:
            user = ArtistMasterBasic.objects.get(email=email)
        except ArtistMasterBasic.DoesNotExist:
            return JsonResponse({"error": "Email does not exist in our records."}, status=404)

        # Generate the reset token
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        
        # Generate the reset link
        reset_link = f"http://127.0.0.1:8000/reset-password/{user.pk}/{token}/"  # Localhost link for testing
        subject = "Reset Your Password - CreativeComune.com"
        message = (
            "Hello,\n\n"
            "We received a request to reset your password for your account at CreativeComune.com.\n\n"
            "To reset your password, click the link below:\n\n"
            f"{reset_link}\n\n"
            "This link will expire in 1 hour. If you did not request a password reset, please ignore this email, and your password will remain unchanged.\n\n"
            "If you need help, feel free to contact our support team at support@creativecomune.com.\n\n"
            "Thank you,\n"
            "The CreativeComune Team"
        )
       
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email="support@creativecomune.com",  # Uses the sender email
                recipient_list=[email],
                fail_silently=False,
            )
            return JsonResponse({"message": "Password reset email sent successfully."})
        except Exception as e:
            return JsonResponse({"error": f"Failed to send email: {str(e)}"}, status=500)
        
        
        
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from .models import ArtistMasterBasic  # Import your custom user model

@csrf_exempt
def reset_password(request, user_id, token):
    if request.method == "POST":
        new_password = request.POST.get("password")

        if not new_password:
            return JsonResponse({"error": "Password field is empty."}, status=400)

        try:
            user = ArtistMasterBasic.objects.get(pk=user_id)
        except ArtistMasterBasic.DoesNotExist:
            return JsonResponse({"error": "Invalid user."}, status=404)

        token_generator = PasswordResetTokenGenerator()
        if not token_generator.check_token(user, token):
            return JsonResponse({"error": "Invalid or expired token."}, status=400)

        # Reset the password
        user.password = make_password(new_password)
        user.save()
        
        subject = "Your Password Has Been Reset Successfully - CreativeComune.com"
        message = (
            "Hello,\n\n"
            "Your password for your CreativeComune.com account has been reset successfully. "
            "You can now log in using your new password.\n\n"
            "If you did not perform this action, please contact our support team immediately at support@creativecomune.com to secure your account.\n\n"
            "For your security, we recommend keeping your password safe and updating it regularly.\n\n"
            "Thank you,\n"
            "The CreativeComune Team"
        )

        try:
            send_mail(
                subject=subject,
                message=message,
                from_email="support@creativecomune.com",  # Uses the sender email
                recipient_list=[user.email],
                fail_silently=False,
            )
            return JsonResponse({"message": "Password has been reset successfully, and the confirmation email has been sent."})
        except Exception as e:
            return JsonResponse({"error": f"Failed to send email: {str(e)}"}, status=500)
    
    
    return render(request, "helpcenter-support.html", {"user_id": user_id, "token": token})


@csrf_exempt
def remove_book(request, book_id):
    if request.method == 'DELETE':
        try:
            book = BooksPublished.objects.get(id=book_id)
            book.delete()  # Delete the book
            return JsonResponse({'success': True})
        except BooksPublished.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Book not found'})
    return JsonResponse({'success': False, 'error': 'Invalid request method'})



@csrf_exempt
def remove_award(request, award_id):
    if request.method == 'DELETE':
        try:
            award = Awards.objects.get(id=award_id)
            award.delete()  # Delete the award
            return JsonResponse({'success': True})
        except BooksPublished.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Award not found'})
    return JsonResponse({'success': False, 'error': 'Invalid request method'})



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt 
def remove_image(request, image_id):
    if request.method == "DELETE":
        try:
            # Assume `Image` is your model
            image = Gallery.objects.get(id=image_id)
            image.delete()
            return JsonResponse({'message': 'Image removed successfully.'}, status=200)
        except Gallery.DoesNotExist:
            return JsonResponse({'error': 'Image not found.'}, status=404)
    return JsonResponse({'error': 'Invalid request method.'}, status=400)


