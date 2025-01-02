from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin

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
    
    
class BooksPublished(models.Model):
    book_name = models.CharField(max_length=255)
    book_url = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return self.book_name 
      
        
class Gallery(models.Model):
    file_name = models.ImageField(upload_to='gallery/', blank=True, null=True)
    def __str__(self):
        return self.file_name.url if self.file_name else "No image"
    

class ArtistMasterAdditional(models.Model):
    
    Gender_choices = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    Location_choices = [('India', 'India'), ('USA', 'USA'), ('Canada', 'Canada'), ('UK', 'UK'), ('Australia', 'Australia')]
    Literacy_world_choices = [('Writer', 'Writer'), ('Publisher', 'Publisher'),
                              ('Editor', 'Editor'), ('Poet', 'Poet'), 
                              ('Essayist', 'Essayist'), ('Novelist', 'Novelist'),
                              ('Blogger', 'Blogger'), ('Short Story Writer', 'Short Story Writer'),
                              ('Motivational Speaker', 'Motivational Speaker'), 
                              ('Spiritual Leader', 'Spiritual Leader'),
                              ('Literary Critic', 'Literary Critic')]
    
    availability_choices=[
            ('full_time', 'Full-time'),
            ('part_time', 'Part-time'),
            ('freelance', 'Freelance')
        ]
    
    PAYMENT_METHOD_CHOICES = [
        ('paypal', 'PayPal'),
        ('upi', 'UPI'),
        ('bank_transfer', 'Bank Transfer'),
    ]

    OPPORTUNITY_CHOICES = [
        ('writing', 'Writing'),
        ('publishing', 'Publishing'),
        ('editing', 'Editing'),
        ('consulting', 'Consulting'),
    ]
    user = models.ForeignKey(ArtistMasterBasic, on_delete=models.CASCADE,related_name='additional_info')
    firstname = models.CharField(max_length=100, blank=True, null=True)
    lastname = models.CharField(max_length=100, blank=True, null=True)
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
    job_title = models.CharField(max_length=255, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    experience = models.CharField(blank=True, null=True,max_length=500)
    experience_details = models.ManyToManyField(Experience, related_name='artist_experiences', blank=True)  
    portfolio = models.URLField(blank=True, null=True) 
    short_bio = models.TextField(blank=True, null=True)    
    books_published = models.ManyToManyField(BooksPublished, related_name='artist_books', blank=True)  
    highest_qualification = models.TextField(blank=True, null=True)       
    availability = models.CharField(max_length=50, choices=availability_choices,blank=True,null=True)
    skills = models.ManyToManyField(Skill, related_name='skills', blank=True)    
    images = models.ManyToManyField(Gallery, related_name='images', blank=True) 
    
 
    certifications = models.TextField(blank=True, null=True)  
    published_works = models.TextField(blank=True, null=True) 
    awards = models.TextField(blank=True, null=True) 
    
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES,blank=True, null=True)
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
        return f"{self.firstname} {self.lastname}"



    