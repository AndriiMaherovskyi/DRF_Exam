from rest_framework import serializers
from .models import users, families, family_budgets


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
    balance = serializers.IntegerField()
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