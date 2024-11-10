from rest_framework import serializers
from .models import UserActivity, LandingPage
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class UserActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)   
    
    class Meta:
        model = UserActivity
        fields = ['id','user', 'login_time', 'logout_time', 'button_click_count', 'button_click_count_2']


class LandingPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandingPage
        fields = ['logo', 'description', 'image']