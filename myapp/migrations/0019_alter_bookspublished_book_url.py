# Generated by Django 5.1.2 on 2024-12-31 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0018_bookspublished_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookspublished',
            name='book_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]