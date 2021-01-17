from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import DoctorModel,ImageModel,PatientModel
from rest_framework.views import APIView
from .serializers import ImageSerializer,DoctorSerializer,PatientSerializer
from requirements import success,error
from rest_framework.pagination import PageNumberPagination
from .pagination import PaginationHandlerMixin


class BasicPagination(PageNumberPagination):
    page_size_query_param = 10


class PatientView(APIView,PaginationHandlerMixin):
    pagination_class=BasicPagination
    serializer_class=PatientSerializer
    
    def get(self,request,pk):
        try:
            queryset=PatientModel.objects.filter(doctor=pk)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_paginated_response(self.serializer_class(page,many=True).data)
            else:
                serializer = self.serializer_class(queryset,many=True)
            return Response(success.APIResponse(200,serializer.data).respond())
        except Exception as e:
            return Response(error.APIErrorResponse(404,str(e)))


@api_view(['GET',])
@permission_classes([IsAuthenticated])
def getScans(request,pk):
    try:
        queryset=ImageModel.objects.filter(patient=pk)
        serializer=ImageSerializer(queryset,many=True)
        return Response(success.APIResponse(200,serializer.data).respond())
    except Exception as e:
        return Response(error.APIErrorResponse(404,str(e)))

@api_view(['GET',])
@permission_classes([IsAuthenticated])

def getPatient(request,pk):
    try:
        queryset=PatientModel.objects.get(pk=pk)
        serializer = PatientSerializer(queryset)
        return Response(success.APIResponse(200,serializer.data).respond())
    except Exception as e:
        return Response(error.APIErrorResponse(404,str(e)))

@api_view(['POST',])
@permission_classes([IsAuthenticated])
def loginUser(request):
        username=request.data['username']
        password=request.data['password']
        user=authenticate(username=username,password=password)
        if user is not None:
            try:
                profile=get_object_or_404(DoctorModel,email=username)
                serializer=DoctorSerializer(profile)
                return Response(success.APIResponse(200,serializer.data).respond())
            except Exception as e:
                return Response(error.APIErrorResponse(401,(str(e))).respond())  
        else:
            return Response(error.APIErrorResponse(500,"Unexpected Error Occurred").respond())




