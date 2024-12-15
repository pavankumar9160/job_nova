# Generated by Django 5.1.2 on 2024-12-14 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0006_alter_artistmasteradditional_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='artistmasteradditional',
            name='primary_skills',
        ),
        migrations.RemoveField(
            model_name='artistmasteradditional',
            name='secondary_skills',
        ),
        migrations.AddField(
            model_name='artistmasteradditional',
            name='skills',
            field=models.ManyToManyField(blank=True, related_name='skills', to='myapp.skill'),
        ),
    ]
