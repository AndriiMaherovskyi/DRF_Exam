# Generated by Django 4.2.7 on 2023-11-04 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basicApp', '0003_users_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='family_budgets',
            name='balance',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='transactions',
            name='amount',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='transactions',
            name='description',
            field=models.TextField(default='no description'),
        ),
        migrations.AddField(
            model_name='transactions',
            name='isFamilyExpense',
            field=models.BooleanField(default=False),
        ),
    ]
