# Generated by Django 5.1.2 on 2025-01-04 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0021_bookspublished_book_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artistmasteradditional',
            name='firstname',
        ),
        migrations.RemoveField(
            model_name='artistmasteradditional',
            name='lastname',
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='fullname',
            field=models.CharField(blank=True, max_length=80, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='penname',
            field=models.CharField(blank=True, max_length=80, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='title',
            field=models.CharField(blank=True, choices=[('Mr', 'Mr'), ('Mrs', 'Mrs')], max_length=100, null=True),
        ),
    ]
