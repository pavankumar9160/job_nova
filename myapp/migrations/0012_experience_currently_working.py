# Generated by Django 5.1.2 on 2024-12-26 06:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0011_artistmasteradditional_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='experience',
            name='currently_working',
            field=models.BooleanField(default=False),
        ),
    ]
