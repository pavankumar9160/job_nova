# Generated by Django 5.1.2 on 2024-12-26 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0010_remove_artistmasteradditional_experience_details_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='artistmasteradditional',
            name='city',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
