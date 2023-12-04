from rest_framework_mongoengine import viewsets, generics
from cars.serializers import CarSerializer, CarDetailSerializer
from cars.models import Car


class CarViewSet(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class CarDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarDetailSerializer
    lookup_field = 'id'