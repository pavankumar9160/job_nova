# Generated by Django 5.1.2 on 2025-01-06 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0027_alter_artistmasteradditional_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='awards',
            name='award_by_organisation',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
