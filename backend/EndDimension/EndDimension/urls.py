"""EndDimension URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from Hospital.views import loginUser,PatientView,getScans,getPatient
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.models import Group, User



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/',loginUser),
    path('api/patients/<int:pk>/',PatientView.as_view()),
    path('api/scans/<int:pk>/',getScans),
    path('api/patientInfo/<int:pk>/',getPatient)
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



admin.site.unregister(User)
admin.site.unregister(Group)

admin.site.site_header = "Hosptial Admin"
admin.site.site_title = "Hospital Admin Portal"
admin.site.index_title = "Welcome to Hospital Admin Portal"
admin.site.site_url="http://localhost:3000/"
admin.empty_value_display="Nothing to Display, Add by clicking on right side"