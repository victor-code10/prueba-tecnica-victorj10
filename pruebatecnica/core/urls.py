from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'user-activity', views.UserActivityViewSet, basename='user-activity')
router.register(r'landing-page', views.LandingPageViewSet, basename='landing-page')
router.register(r'user-activitybutton2', views.UserActivityViewSet2, basename='user-activityButton2')


urlpatterns = [
    path('', include(router.urls)),
    path('registro_login/', views.registro_login, name='registro_login'),
    path('registro_logout/', views.registro_logout, name='registro_logout')
]