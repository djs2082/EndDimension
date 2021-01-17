# Generated by Django 3.0.3 on 2021-01-13 15:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DoctorModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fname', models.CharField(max_length=50, verbose_name='FIRST_NAME')),
                ('lname', models.CharField(max_length=50, verbose_name='LAST_NAME')),
                ('age', models.IntegerField(verbose_name='AGE')),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1, verbose_name='GENDER')),
                ('speciality', models.CharField(choices=[('Eye', 'Eyes'), ('BRAIN', 'BRAIN'), ('CHEST', 'CHEST')], max_length=10, verbose_name='SPECIALITY')),
                ('mobile', models.CharField(max_length=10, verbose_name='MOBILE')),
                ('email', models.EmailField(max_length=254, verbose_name='EMAIL')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Doctor',
                'verbose_name_plural': 'Doctors',
            },
        ),
        migrations.CreateModel(
            name='PatientModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fname', models.CharField(max_length=50, verbose_name='FIRST_NAME')),
                ('lname', models.CharField(max_length=50, verbose_name='LAST_NAME')),
                ('age', models.IntegerField(verbose_name='AGE')),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1, verbose_name='GENDER')),
                ('mobile', models.CharField(max_length=10, verbose_name='MOBILE')),
                ('email', models.EmailField(max_length=254, verbose_name='EMAIL')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hospital.DoctorModel', verbose_name='DOCTOR')),
            ],
            options={
                'verbose_name': 'Patient',
                'verbose_name_plural': 'Patients',
            },
        ),
        migrations.CreateModel(
            name='ImageModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='SCAN_NAME')),
                ('scan', models.ImageField(upload_to='scans/', verbose_name='SCAN')),
                ('date', models.DateField(auto_now=True, verbose_name='DATE')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hospital.PatientModel', verbose_name='PATIENT')),
            ],
            options={
                'verbose_name': 'SCAN',
                'verbose_name_plural': 'SCANS',
            },
        ),
    ]
