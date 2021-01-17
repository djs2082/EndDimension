from django.db import models
from django.contrib.auth.models import User
class UserProfile(models.Model):  
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    fname=models.CharField(max_length=50) 
# Create your models here.
