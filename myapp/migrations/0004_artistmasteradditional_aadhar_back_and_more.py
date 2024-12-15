# Generated by Django 5.1.2 on 2024-12-14 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_artistmasteradditional_availability_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='artistmasteradditional',
            name='aadhar_back',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='aadhar_front',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='alternate_email',
            field=models.EmailField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='feedback',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='hide_email',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='hide_phone',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='new_password',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='newsletter_subscribe',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='old_password',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='opportunities',
            field=models.CharField(blank=True, choices=[('writing', 'Writing'), ('publishing', 'Publishing'), ('editing', 'Editing'), ('consulting', 'Consulting')], max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='payment_method',
            field=models.CharField(blank=True, choices=[('paypal', 'PayPal'), ('upi', 'UPI'), ('bank_transfer', 'Bank Transfer')], max_length=20, null=True),
        ),
    ]
