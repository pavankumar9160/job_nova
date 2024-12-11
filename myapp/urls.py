
from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [

   path('',views.index,name="index"),
   path('aboutus/',views.aboutus,name="aboutus"),
   path('blog-detail/',views.blog_detail,name="blog-detail"),
   path('blog-sidebar/',views.blog_sidebar,name="blog-sidebar"),
   path('blogs/',views.blogs,name="blogs"),
   path('artist-profile_updated_one/',views.artist_profile_updated_one,name="artist-profile_updated_one"),
   path('artist-profile-setting_updated_one/',views.artist_profile_setting_updated_one,name="artist-profile-setting_updated_one"),
   path('artist-profile-setting/',views.artist_profile_setting,name="artist-profile-setting"),
   path('artist-profile/',views.artist_profile,name="artist-profile"),
   path('artists/',views.artists,name="artists"),
   path('career/',views.career,name="career"),
   path('comingsoon/',views.comingsoon,name="comingsoon"),
   path('contactus/',views.contactus,name="contactus"),
   path('services_prvdr-profile/',views.services_prvdr_profile,name="services_prvdr-profile"),
   path('services_prvdr/',views.services_prvdr,name="services_prvdr"),
   path('error/',views.error,name="error"),
   path('helpcenter-faqs/',views.helpcenter_faqs,name="helpcenter-faqs"),
   path('helpcenter-guides/',views.helpcenter_guides,name="helpcenter-guides"),
   path('helpcenter-overview/',views.helpcenter_overview,name="helpcenter-overview"),
   path('helpcenter-support/',views.helpcenter_support,name="helpcenter-support"),
   path('index-three/',views.index_three,name="index-three"),
   path('index-two/',views.index_two,name="index-two"),
   path('services-apply/',views.services_apply,name="services-apply"),
   path('services-categories/',views.services_categories,name="services-categories"),
   path('services-detail-one/',views.services_detail_one,name="services-detail-one"),
   path('services-detail-two/',views.services_detail_two,name="services-detail-two"),
   path('services-detail-three/',views.services_detail_three,name="services-detail-three"),
   path('services-grid-four/',views.services_grid_four,name="services-grid-four"),
   path('services-grid-three/',views.services_grid_three,name="services-grid-three"),
   path('services-grid-two/',views.services_grid_two,name="services-grid-two"),
   path('services-grid-one/',views.services_grid_one,name="services-grid-one"),
   path('services-list-one/',views.services_list_one,name="services-list-one"),
   path('services-list-two/',views.services_list_two,name="services-list-two"),
   path('services/',views.services_post,name="services-post"),
   path('lock-screen/',views.lock_screen,name="lock-screen"),
   path('login/',views.login,name="login"),
   path('maintenance/',views.maintenance,name="maintenance"),
   path('pricing/',views.pricing,name="pricing"),
   path('privacy/',views.privacy,name="privacy"),
   path('reset-password/',views.reset_password,name="reset-password"),
   path('services/',views.services,name="services"),
   path('signup/',views.signup,name="signup"),
   path('terms/',views.terms,name="terms"),
   

   





   
   
 
  
]

