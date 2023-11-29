from django.urls import path
from cars.views import CarViewSet, CarDetailViewSet
from personalInfo.views import PersonalInfoViewSet, PersonalInfoDetailViewSet

urlpatterns = [
     path('api/cars', CarViewSet.as_view()),
     path('api/cars/<str:id>', CarDetailViewSet.as_view()),
     path('api/personal', PersonalInfoViewSet.as_view()),
     path('api/personal/<str:id>', PersonalInfoDetailViewSet.as_view()),
]
