# Generated by Django 5.1.2 on 2024-12-26 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0012_experience_currently_working'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artistmasteradditional',
            name='address',
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='address1',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='address2',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='pincode',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='state',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]