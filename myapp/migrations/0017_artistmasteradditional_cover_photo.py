# Generated by Django 5.1.2 on 2024-12-31 05:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0016_artistmasteradditional_highest_qualification'),
    ]

    operations = [
        migrations.AddField(
            model_name='artistmasteradditional',
            name='cover_photo',
            field=models.ImageField(blank=True, null=True, upload_to='coverpics/'),
        ),
    ]
