from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(null=True, blank=True)
    button_click_count = models.IntegerField(default=0)
    button_click_count_2 = models.IntegerField(default=0)
    is_active = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.user.username} activity"
    
    def session_duration(self):
        if self.logout_time:
            return (self.logout_time - self.login_time).total_seconds()


class LandingPage(models.Model):
    logo = models.ImageField(upload_to='logos/')
    description = models.TextField()
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return "Landing Page Content"
    
    
