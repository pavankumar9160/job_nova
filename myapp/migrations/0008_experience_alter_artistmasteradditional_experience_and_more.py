# Generated by Django 5.1.2 on 2024-12-23 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_skill_remove_artistmasteradditional_primary_skills_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('designation', models.CharField(max_length=255)),
                ('company', models.CharField(max_length=255)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='artistmasteradditional',
            name='experience',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='experience_details',
            field=models.ManyToManyField(blank=True, related_name='artist_experiences', to='myapp.experience'),
        ),
    ]
