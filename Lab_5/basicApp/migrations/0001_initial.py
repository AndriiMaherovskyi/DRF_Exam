# Generated by Django 4.2.7 on 2023-11-04 09:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='families',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='users',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('familyId', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='basicApp.families')),
            ],
        ),
        migrations.CreateModel(
            name='transactions',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('familyId', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='basicApp.families')),
                ('memberId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='basicApp.users')),
            ],
        ),
        migrations.CreateModel(
            name='family_budgets',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('familyId', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='basicApp.families')),
            ],
        ),
        migrations.AddField(
            model_name='families',
            name='member',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='basicApp.users'),
        ),
    ]
