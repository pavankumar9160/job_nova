from django.shortcuts import render

# Create your views here.


def index(request):
    
    return render(request, 'index.html')

def aboutus(request):
    
    return render(request, 'aboutus.html')

def blog_detail(request):
    
    return render(request, 'blog-detail.html')

def blog_sidebar(request):
    
    return render(request, 'blog-sidebar.html')

def blogs(request):
    
    return render(request, 'blogs.html')

def artist_profile_updated_one(request):
    
    return render(request, 'candidate-profile_updated_one.html')

def artist_profile_setting_updated_one(request):
    
    return render(request, 'candidate-profile-setting_updated_one.html')

def artist_profile_setting(request):
    
    return render(request, 'candidate-profile-setting.html')


def artist_profile(request):
    
    return render(request, 'candidate-profile.html')

def artists(request):
    
    return render(request, 'candidates.html')

def career(request):
    
    return render(request, 'career.html')

def comingsoon(request):
    
    return render(request, 'comingsoon.html')

def contactus(request):
    
    return render(request, 'contactus.html')

def services_prvdr_profile(request):
    
    return render(request, 'employer-profile.html')

def services_prvdr(request):
    
    return render(request, 'employers.html')

def error(request):
    
    return render(request, 'error.html')

def helpcenter_faqs(request):
    
    return render(request, 'helpcenter-faqs.html')

def helpcenter_guides(request):
    
    return render(request, 'helpcenter-guides.html')

def helpcenter_overview(request):
    
    return render(request, 'helpcenter-overview.html')

def helpcenter_support(request):
    
    return render(request, 'helpcenter-support.html')

def index_three(request):
    
    return render(request, 'index-three.html')

def index_two(request):
    
    return render(request, 'index-two.html')

def services_apply(request):
    
    return render(request, 'job-apply.html')

def services_categories(request):
    
    return render(request, 'job-categories.html')

def services_detail_one(request):
    
    return render(request, 'job-detail-one.html')

def services_detail_two(request):
    
    return render(request, 'job-detail-two.html')

def services_detail_three(request):
    
    return render(request, 'job-detail-three.html')

def services_grid_one(request):
    
    return render(request, 'job-grid-one.html')

def services_grid_two(request):
    
    return render(request, 'job-grid-two.html')

def services_grid_three(request):
    
    return render(request, 'job-grid-three.html')

def services_grid_four(request):
    
    return render(request, 'job-grid-four.html')

def services_list_one(request):
    
    return render(request, 'job-list-one.html')

def services_list_two(request):
    
    return render(request, 'job-list-two.html')

def services_post(request):
    
    return render(request, 'job-post.html')

def services(request):
    
    return render(request, 'services.html')

def lock_screen(request):
    
    return render(request, 'lock-screen.html')

def login(request):
    
    return render(request, 'login.html')

def maintenance(request):
    
    return render(request, 'maintenance.html')

def pricing(request):
    
    return render(request, 'pricing.html')

def privacy(request):
    
    return render(request, 'privacy.html')

def reset_password(request):
    
    return render(request, 'reset-password.html')


def signup(request):
    
    return render(request, 'signup.html')


def terms(request):
    
    return render(request, 'terms.html')
    