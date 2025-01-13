from django.contrib import admin
from django.urls import path
from myapp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [

   path('',views.index,name="index"),
   path('aboutus/',views.aboutus,name="aboutus"),
   path('blog-detail/<int:blog_id>/',views.blog_detail,name="blog-detail"),
   path('blog-sidebar/',views.blog_sidebar,name="blog-sidebar"),
   path('blogs/',views.blogs,name="blogs"),
   path('artist-profile_updated_one/',views.artist_profile_updated_one,name="artist-profile_updated_one"),
   path('artist-profile-setting_updated_one/',views.artist_profile_setting_updated_one,name="artist-profile-setting_updated_one"),
   path('artist-profile-setting/',views.artist_profile_setting,name="artist-profile-setting"),
   path('artist-profile/',views.artist_profile,name="artist-profile"),
   path('artist-profile_updated_one/<int:id>/',views.artist_profile_updated_one_Id,name="artist-profile_updated_one_id"),

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
   path('index-three/',views.index,name="index-three"),
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
   path('services_post/',views.services_post,name="services-post"),
   path('lock-screen/',views.lock_screen,name="lock-screen"),
   path('login/',views.login_page,name="login"),
   path('maintenance/',views.maintenance,name="maintenance"),
   path('pricing/',views.pricing,name="pricing"),
   path('privacy/',views.privacy,name="privacy"),
   path('reset-password/',views.reset_password_page,name="reset-password"),
   path('services/',views.services,name="services"),
   path('signup/',views.signup_page,name="signup"),
   path('terms/',views.terms,name="terms"),
    path('signup_api/', views.signup_api, name='signup_api'),
    path('login_api/', views.login_api, name='login_api'),
    path('logout/', views.logout_view, name='logout'),
    path('update_artist_details_api/', views.update_artist_details_api, name='update_artist_details_api'),
#     path('update_professional_details_api/', views.update_professional_details_api, name='update_professional_details_api'),
    path('update_other_details_api/', views.update_other_details_api, name='update_other_details_api'),
     path('check-profile-completion/', views.check_profile_completion, name='check_profile_completion'),
      path('search-artists/', views.search_artists, name='search_artists'),
      path('filter-artists/', views.filter_artists, name='filter_artists'),
      path('reset-your-password/',views.reset_user_password,name="reset-your-password"),
      path('reset-password/<int:user_id>/<str:token>/',views.reset_password, name='reset_password'),
     path('remove-book/<int:book_id>/', views.remove_book, name='remove-book'),
    path('remove-award/<int:award_id>/', views.remove_award, name='remove-award'),
    path('remove-image/<int:image_id>/', views.remove_image, name='remove_image'),
    path('upload-gallery-image/', views.upload_gallery_image, name='upload_gallery_image'),
    path('admin-login/',views.admin_login_page,name="admin-login"),
    path('dashboard/',views.dashboard,name="dashboard"),
    path('update-status/', views.update_artist_status, name='update_artist_status'),
    path('delete_artist/',views.delete_artist,name="delete_artist"),
    






     




   





  
]
if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)        
        