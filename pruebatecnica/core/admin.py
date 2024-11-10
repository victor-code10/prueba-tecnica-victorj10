from django.contrib import admin
from .models import UserActivity, LandingPage

# Register your models here.


admin.site.register(UserActivity)
admin.site.register(LandingPage)