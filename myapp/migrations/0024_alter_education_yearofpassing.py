# Generated by Django 5.1.2 on 2025-01-05 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0023_education_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='education',
            name='yearOfPassing',
            field=models.CharField(max_length=10),
        ),
    ]
