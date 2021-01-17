from django.contrib import admin

# Register your models here.
from .models import DoctorModel,PatientModel, ImageModel
admin.site.register(DoctorModel)
admin.site.register(PatientModel)
admin.site.register(ImageModel)
