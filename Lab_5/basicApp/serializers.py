from rest_framework import serializers
from .models import users, families, family_budgets, transactions, CustomUser
from django.contrib.auth.models import User


# class Meta:
#     model = users
#     fields = ('id', 'username', 'password', 'email',
#               'createdAt', 'updatedAt', 'familyId')

class usersSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ('id', 'username', 'password', 'email',
              'createdAt', 'updatedAt', 'familyId_id')
    id = serializers.IntegerField()
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=255)
    createdAt = serializers.DateTimeField(read_only=True)
    updatedAt = serializers.DateTimeField(read_only=True)
    familyId_id = serializers.CharField()

    def create(self, validated_data):
        return users.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # instance.id = validated_data.get('id', instance.id)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.createdAt = validated_data.get('createdAt', instance.createdAt)
        instance.updatedAt = validated_data.get('updatedAt', instance.updatedAt)
        instance.familyId_id = validated_data.get('familyId_id', instance.familyId_id)
        instance.save()
        return instance

class familySerializer(serializers.ModelSerializer):
    class Meta:
        model = families
        fields = ('id', 'name')

    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)

    def create(self, validated_data):
        return families.objects.create(**validated_data)

    def update(self, instance, validated_data):
        #instance.id = validated_data.get('id', instance.id)
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class family_budgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = family_budgets
        fields = ('id', 'familyId_id', 'balance', 'createdAt', 'updatedAt')

    id = serializers.IntegerField()
    familyId_id = serializers.CharField()
    balance = serializers.FloatField()
    createdAt = serializers.DateTimeField(read_only=True)
    updatedAt = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return family_budgets.objects.create(**validated_data)

    def update(self, instance, validated_data):
        #instance.id = validated_data.get('id', instance.id)
        instance.familyId_id = validated_data.get('familyId_id', instance.familyId)
        instance.balance = validated_data.get('balance', instance.balance)
        instance.save()
        return instance

class transactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = family_budgets
        fields = ('id', 'description', 'amount', 'date', 'familyId_id', 'memberId', 'isFamilyExpense')

    id = serializers.IntegerField()
    description = serializers.CharField(style={'base_template': 'textarea.html'})
    amount = serializers.FloatField()
    date = serializers.DateTimeField(read_only=True)
    familyId_id = serializers.CharField()
    memberId = serializers.CharField(max_length=255)
    isFamilyExpense = serializers.BooleanField()

    def create(self, validated_data):
        return transactions.objects.create(**validated_data)

##########################################

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'first_name', 'email', 'password')
#         extra_kwargs = {'password': {'write_only': True}}
#
#     def create(self, validated_data):
#         return User.objects.create_user(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('user_ptr', 'familyId')  # Поля для розширеної інформації
        extra_kwargs = {'user_ptr': {'read_only': True}}