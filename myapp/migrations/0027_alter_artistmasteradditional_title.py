# Generated by Django 5.1.2 on 2025-01-06 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0026_blog'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artistmasteradditional',
            name='title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
