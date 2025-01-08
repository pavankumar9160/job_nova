from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(Skill)
admin.site.register(Gallery)
admin.site.register(Experience)
admin.site.register(BooksPublished)
admin.site.register(Awards)
admin.site.register(Education)
admin.site.register(Blog)


from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import ArtistMasterBasic
from django.contrib import admin
from django import forms
from .models import ArtistMasterBasic, ArtistMasterAdditional
from django.contrib.auth.forms import UserCreationForm

# Custom form for creating an artist account
class ArtistMasterBasicAdminForm(forms.ModelForm):
    class Meta:
        model = ArtistMasterBasic
        fields = ('email', 'password', 'name', 'contact_number', 'is_active', 'is_staff')

    def clean_email(self):
        email = self.cleaned_data.get('email')
        instance = self.instance

        # Allow the email to be the same as the current instance if it's an update.
        if instance and instance.pk:
            # Check if the email already exists for other artists (not the current one).
            if ArtistMasterBasic.objects.filter(email=email).exclude(pk=instance.pk).exists():
                raise forms.ValidationError("This email is already registered.")
        else:
            # If it's a new instance (creating a new artist).
            if ArtistMasterBasic.objects.filter(email=email).exists():
                raise forms.ValidationError("This email is already registered.")
        
        return email


class ArtistMasterBasicAdmin(admin.ModelAdmin):
    form = ArtistMasterBasicAdminForm
    list_display = ('name', 'email', 'contact_number', 'is_active', 'is_staff')
    search_fields = ('name', 'email')
    list_filter = ('is_active', 'is_staff')
    actions = ['disable_selected']

    def disable_selected(self, request, queryset):
        queryset.update(is_active=False)
    disable_selected.short_description = "Disable selected artists"
    
    def view_profile(self, obj):
        return f'/admin/yourapp/artists/{obj.pk}/'
    view_profile.short_description = 'View Profile'


admin.site.register(ArtistMasterBasic, ArtistMasterBasicAdmin)
class ArtistMasterAdditionalAdmin(admin.ModelAdmin):
    list_display = ('user', 'fullname', 'gender', 'dob', 'country', 'profile_picture')
    search_fields = ('user__name', 'user__email')
    list_filter = ('gender', 'country')
    readonly_fields = ('experience',)

admin.site.register(ArtistMasterAdditional, ArtistMasterAdditionalAdmin)
