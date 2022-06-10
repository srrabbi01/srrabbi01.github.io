from dataclasses import fields
from rest_framework.serializers import ModelSerializer
from app_api.models import Car, RentCar, UserProfile


class UserSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id','email','password','role']
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserProfile.objects.create_user(email=validated_data['email'],role=validated_data['role'],password=validated_data['password'])
        return user

    # def update(self, instance, validated_data):
    #     instance.set_password(validated_data['password'])
    #     instance.save()
    #     return instance


class CarSerializer(ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class RentCarSerializer(ModelSerializer):
    class Meta:
        model = RentCar
        fields = '__all__'