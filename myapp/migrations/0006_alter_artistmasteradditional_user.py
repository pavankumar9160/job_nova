# Generated by Django 5.1.2 on 2024-12-14 12:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_artistmasteradditional_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artistmasteradditional',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='additional_info', to=settings.AUTH_USER_MODEL),
        ),
    ]
