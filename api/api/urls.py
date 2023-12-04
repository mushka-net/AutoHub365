from django.urls import path
from cars.views import CarViewSet, CarDetailViewSet
from personalInfo.views import PersonalInfoViewSet, PersonalInfoDetailViewSet
from knox import views as knox_views
from authService.views import LoginView, CreateUserView, ManageUserView

urlpatterns = [
     path('api/cars', CarViewSet.as_view()),
     path('api/cars/<str:id>', CarDetailViewSet.as_view()),
     path('api/personal', PersonalInfoViewSet.as_view()),
     path('api/personal/<str:id>', PersonalInfoDetailViewSet.as_view()),
     path('api/create/', CreateUserView.as_view()),
     path('api/profile/', ManageUserView.as_view()),
     path('api/login/', LoginView.as_view(), name='knox_login'),
     path('api/logout/', knox_views.LogoutView.as_view()),
]
