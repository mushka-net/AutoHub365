"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path, include
from cars.views import CarViewSet, CarDetailViewSet
from personalInfo.views import PersonalInfoDetailViewSet
from orders.views import OrderViewSet, OrderDetailViewSet


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/cars', CarViewSet.as_view()),
    path('api/cars/<str:id>', CarDetailViewSet.as_view()),
    path('api/personal/<str:user_id>', PersonalInfoDetailViewSet.as_view()),
    path('api/orders', OrderViewSet.as_view()),
    path('api/orders/<str:id>', OrderDetailViewSet.as_view()),
]
