# Generated by Django 5.1.2 on 2024-12-31 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0017_artistmasteradditional_cover_photo'),
    ]

    operations = [
        migrations.CreateModel(
            name='BooksPublished',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book_name', models.CharField(max_length=255)),
                ('book_url', models.CharField(max_length=255)),
            ],
        ),
        migrations.RemoveField(
            model_name='artistmasteradditional',
            name='books_published',
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='books_published',
            field=models.ManyToManyField(blank=True, related_name='artist_books', to='myapp.bookspublished'),
        ),
    ]
