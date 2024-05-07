from django.db import models

class users(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=255)
    email = models.EmailField(null=False, default='user@mail.com')
    password = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    familyId = models.ForeignKey('families', on_delete=models.PROTECT)

    def __str__(self):
        return self.username

class families(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class family_budgets(models.Model):
    id = models.IntegerField(primary_key=True)
    familyId = models.ForeignKey('families', on_delete=models.PROTECT)
    balance = models.FloatField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)









class transactions(models.Model):
    id = models.IntegerField(primary_key=True)
    description = models.TextField(default='no description')
    amount = models.FloatField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    familyId = models.ForeignKey('families', on_delete=models.PROTECT)
    # memberId = models.ForeignKey('users', on_delete=models.PROTECT, null=True)
    memberId = models.CharField(max_length=255)
    isFamilyExpense = models.BooleanField(default=False)




from django.contrib.auth.models import User

class Family(models.Model):
    name = models.CharField(max_length=100)

class CustomUser(User):
    familyId = models.ForeignKey(families, on_delete=models.CASCADE)

