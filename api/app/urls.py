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
