from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin
from django.forms import ValidationError
from PIL import Image


class ArtistMasterBasicManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)
    

class ArtistMasterBasic(AbstractBaseUser,PermissionsMixin):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=15)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    delete1 = models.IntegerField(default=0)

    objects = ArtistMasterBasicManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['contact_number']

    def __str__(self):
        return self.name


from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    
from django.db import models

class Experience(models.Model):
    designation = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    currently_working = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.designation} at {self.company}"


class Education(models.Model):
    instituteName = models.CharField(max_length=255)
    qualification = models.CharField(max_length=255)
    yearOfPassing = models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.qualification} at {self.instituteName}"    
    
    
class BooksPublished(models.Model):
    book_name = models.CharField(max_length=255)
    book_url = models.URLField(blank=True, null=True)
    book_image = models.ImageField(upload_to='book_images/', blank=True, null=True)
    
    
    
    
class Awards(models.Model):
    award_name = models.CharField(max_length=255)
    award_year = models.CharField(blank=True, null=True,max_length=10)
    award_by_organisation = models.CharField(blank=True, null=True,max_length=100)
    award_image = models.ImageField(upload_to='award_images/', blank=True, null=True)    

    
    
    def __str__(self):
        return self.award_name 
      
        
class Gallery(models.Model):
    file_name = models.ImageField(upload_to='gallery/', blank=True, null=True)
    def __str__(self):
        return self.file_name.url if self.file_name else "No image"
    

class ArtistMasterAdditional(models.Model):
    
    Gender_choices = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    Location_choices = [('India', 'India'), ('USA', 'USA'), ('Canada', 'Canada'), ('UK', 'UK'), ('Australia', 'Australia')]
    Literacy_world_choices = [('Writer', 'Writer'), ('Publisher', 'Publisher'),
                              ('Editor', 'Editor'), ('Poet', 'Poet'), ('Printer', 'Printer'),('Standup Comedian','Standup Comedian'),('Compere/Emcee','Compere/Emcee'),
                              ('Essayist', 'Essayist'),('Book Store Owner','Book Store Owner'),('Digital Marketplace/Platform','Digital Marketplace/Platform'), ('Novelist', 'Novelist'),('Artist', 'Artist'),('Social Media Influencer','Social Media Influencer'),
                              ('Blogger', 'Blogger'),('Entertainment Troupe Owner','Entertainment Troupe Owner'), ('Short Story Writer', 'Short Story Writer'),('Digital Marketer','Digital Marketer'),
                              ('Motivational Speaker', 'Motivational Speaker'), ('Digital Graphics Designer','Digital Graphics Designer'),('Event Manager','Event Manager'),('Columnist','Columnist'),('Journalist','Journalist'),
                              ('Digital Content Creator','Digital Content Creator'),('Spiritual Leader', 'Spiritual Leader'),('Public Relations Manager','Public Relations Manager'),
                              ('Literary Critic', 'Literary Critic'),('Literary Reviewer', 'Literary Reviewer'),('Lyricist','Lyricist'),('Scriptwriter-Drama','Scriptwriter-Drama'),('Scriptwriter-Screen','Scriptwriter-Screen'),('Translator','Translator')]
    
    
    

    OPPORTUNITY_CHOICES = [
        ('writing', 'Writing'),
        ('publishing', 'Publishing'),
        ('editing', 'Editing'),
        ('consulting', 'Consulting'),
    ]
    
    
    
    user = models.ForeignKey(ArtistMasterBasic, on_delete=models.CASCADE,related_name='additional_info')
    title = models.CharField(max_length=100,blank=True, null=True)
    fullname = models.CharField(max_length=80, blank=True, null=True)
    penname = models.CharField(max_length=80, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=Gender_choices, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    country = models.CharField(max_length=100, choices=Location_choices, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    cover_photo = models.ImageField(upload_to='coverpics/', blank=True, null=True)
    address1 = models.CharField(max_length=100, blank=True, null=True)
    address2 = models.CharField(max_length=100, blank=True, null=True)
    pincode=models.CharField(max_length=10, blank=True, null=True) 
    state =models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=100, choices=Literacy_world_choices, blank=True, null=True)
    introduction = models.TextField(blank=True, null=True)
    languages_read = models.TextField(blank=True, null=True)
    languages_write = models.TextField(blank=True, null=True)
    languages_speak = models.TextField(blank=True, null=True)
    facebook_link = models.URLField(blank=True, null=True)
    instagram_link = models.URLField(blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)
    twitter_link = models.URLField(blank=True, null=True)
    job_title = models.CharField(max_length=255, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    experience = models.CharField(blank=True, null=True,max_length=500)
    experience_details = models.ManyToManyField(Experience, related_name='artist_experiences', blank=True)  
    portfolio = models.URLField(blank=True, null=True) 
    short_bio = models.TextField(blank=True, null=True)    
    books_published = models.ManyToManyField(BooksPublished, related_name='artist_books', blank=True)  
    awards_received = models.ManyToManyField(Awards, related_name='artist_awards', blank=True)  

    education_details = models.ManyToManyField(Education, related_name='artist_education', blank=True)  
    skills = models.ManyToManyField(Skill, related_name='skills', blank=True)    
    images = models.ManyToManyField(Gallery, related_name='images', blank=True) 
    aadhar_front = models.ImageField(upload_to='uploads/', blank=True, null=True)
    aadhar_back = models.ImageField(upload_to='uploads/', blank=True, null=True)
    opportunities = models.CharField(max_length=20, choices=OPPORTUNITY_CHOICES,blank=True, null=True)
    alternate_email = models.EmailField(max_length=255, blank=True, null=True)
    newsletter_subscribe = models.BooleanField(default=False)
    old_password = models.CharField(max_length=128, blank=True, null=True) 
    new_password = models.CharField(max_length=128, blank=True, null=True)
    hide_phone = models.BooleanField(default=False)
    hide_email = models.BooleanField(default=False)
    feedback = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.fullname}"




class Blog(models.Model):
    author = models.CharField(max_length=255, blank=False)  
    blog_date = models.DateField(auto_now_add=True)  
    blog_banner = models.ImageField(upload_to='blog_banners/', blank=False)  
    blog_heading = models.CharField(max_length=100, blank=False)  
    blog_body = models.TextField(max_length=3000, blank=False) 
    blog_tags = models.CharField(max_length=255, blank=True) 
    
    
    def clean(self):
        # Image validation for fixed size (1920x1080)
        if self.blog_banner:
            try:
                img = Image.open(self.blog_banner)
                if img.size != (1920, 1080):
                    raise ValidationError("The blog banner must be 1920x1080 pixels.")
            except IOError:
                raise ValidationError("Invalid image file.")

    def clean(self):
        
        tags = self.blog_tags.split(',')
        if len(tags) > 5:
            raise ValidationError("You can only add up to 5 tags.")
    
    def __str__(self):
        return self.blog_heading

    class Meta:
        verbose_name = 'Blog'
        verbose_name_plural = 'Blogs'
 