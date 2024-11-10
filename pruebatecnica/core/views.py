from rest_framework.views import APIView
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework_simplejwt.tokens import Token
from .models import UserActivity, LandingPage
from .serializers import UserActivitySerializer, LandingPageSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def registro_login(request):
    user = request.user
    if user.is_authenticated:
        if user.is_superuser:
            return Response({"message": "El superusuario no necesita registro"})
        
        activity, created = UserActivity.objects.update_or_create(
            user=user,
            is_active=False,
            defaults={'login_time':timezone.now(), 'is_active': True}
        )
        
        message ="inicio de sesion creado" if created else "inicio de sesion actualizao"
        return Response({"message": message})
    return Response({"error": "el usuario no ha iniciado sesión"}, status=401)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def registro_logout(request):
    user = request.user
    if user.is_authenticated:
        if user.is_superuser:
            return Response({"message": "El superusuario no necesita registro"})
        try:
            activity = UserActivity.objects.filter(user=user, is_active=True).latest("login_time")
            activity.logout_time = timezone.now()
            activity.is_active=False
            activity.save()
            return Response({"message": "Cierre de sesión registrao"})
        except UserActivity.DoesNotExist:
            return Response({"error": "No se encontró actividad"}, status=400)
    return Response({"error": "Usuario no autenticado"}, status=401)
        

def get_user_activity(request):
    activities = UserActivity.objects.select_related('user').all()
    return render(request, 'template.html', {'activities': activities})

#VALIDAR SUPERUSUARIO
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['is_superuser'] = user.is_superuser
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
#OBTENER CANTIDAD DE CLICS EN BOTON1
class UserActivityViewSet(viewsets.ModelViewSet):
    queryset = UserActivity.objects.all()
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user_activity, created = UserActivity.objects.get_or_create(user=request.user)
        user_activity.button_click_count +=1
        user_activity.save()
        return Response({'status':'boton 1 presionado'})
    
#OBTENER CANTIDAD DE CLICS EN BOTON2
class UserActivityViewSet2(viewsets.ModelViewSet):
    queryset = UserActivity.objects.all()
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user_activity, created = UserActivity.objects.get_or_create(user=request.user)
        user_activity.button_click_count_2 +=1
        user_activity.save()
        return Response({'status':'boton 2 presionado'})
        
class LandingPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LandingPage.objects.all()
    serializer_class = LandingPageSerializer
    permission_classes = [permissions.AllowAny]