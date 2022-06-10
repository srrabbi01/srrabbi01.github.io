from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.viewsets import ModelViewSet
from app_api.models import Car, RentCar, UserProfile
from app_api.serializers import CarSerializer, RentCarSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
# Create your views here.

class UserViewSet(ModelViewSet):
    # permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = UserProfile.objects.all()

class CarViewSet(ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'brand']


class RentCarViewSet(ModelViewSet):
    serializer_class = RentCarSerializer
    queryset = RentCar.objects.all()