from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class DoctorModel (models.Model):
    GENDER_CHOICES=(
        ('M','Male'),
        ('F','Female'),
    )

    SPCEIALITIES=(
        ('Eye','Eyes'),
        ('BRAIN','BRAIN'),
        ('CHEST','CHEST'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fname=models.CharField( verbose_name="FIRST_NAME", max_length=50)
    lname=models.CharField( verbose_name="LAST_NAME", max_length=50)
    age=models.IntegerField( verbose_name="AGE")
    gender=models.CharField( verbose_name="GENDER", max_length=1, choices=GENDER_CHOICES)
    speciality=models.CharField( verbose_name="SPECIALITY", max_length=10, choices=SPCEIALITIES)
    mobile=models.CharField( verbose_name="MOBILE", max_length=10)
    email=models.EmailField( verbose_name="EMAIL", max_length=254)
            
    class Meta:
        verbose_name = "Doctor"
        verbose_name_plural ="Doctors"

    def __str__(self):
        return self.email

class PatientModel (models.Model):
    GENDER_CHOICES=(
        ('M','Male'),
        ('F','Female'),
    )

    fname=models.CharField( verbose_name="FIRST_NAME", max_length=50)
    lname=models.CharField( verbose_name="LAST_NAME", max_length=50)
    age=models.IntegerField( verbose_name="AGE")
    gender=models.CharField( verbose_name="GENDER", max_length=1, choices=GENDER_CHOICES)
    mobile=models.CharField( verbose_name="MOBILE", max_length=10)
    email=models.EmailField( verbose_name="EMAIL", max_length=254)
    doctor=models.ForeignKey(DoctorModel,verbose_name="DOCTOR", on_delete=models.CASCADE)

            
    class Meta:
        verbose_name = "Patient"
        verbose_name_plural ="Patients"

    def __str__(self):
        return self.email

class ImageModel(models.Model):
    name=models.CharField(verbose_name="SCAN_NAME", max_length=50)
    patient=models.ForeignKey(PatientModel, verbose_name="PATIENT", on_delete=models.CASCADE)
    scan=models.ImageField(verbose_name="SCAN", upload_to='', height_field=None, width_field=None, max_length=None)
    date=models.DateField(verbose_name="DATE", auto_now=True)
    description=models.CharField(verbose_name="DESCRIPTION", max_length=550,default="Nothing")

    class Meta:
        verbose_name = "SCAN"
        verbose_name_plural ="SCANS"

    def __str__(self):
        return self.patient.email+"_"+self.name

