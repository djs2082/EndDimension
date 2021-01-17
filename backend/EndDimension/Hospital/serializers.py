from rest_framework import serializers
from .models import ImageModel,PatientModel,DoctorModel

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model=PatientModel
        fields='__all__'

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model=DoctorModel
        fields='__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=ImageModel
        fields='__all__'


