# Generated by Django 4.2.7 on 2023-11-04 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basicApp', '0002_remove_families_member'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='email',
            field=models.EmailField(default='user@mail.com', max_length=254),
        ),
    ]