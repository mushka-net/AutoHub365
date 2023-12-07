from cars.serializers import CarSerializer, CarDetailSerializer
from cars.models import Car

from rest_framework_mongoengine import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from knox.auth import TokenAuthentication

class CarViewSet(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    def get_queryset(self):
        queryset = Car.objects.all()
        is_sold = self.request.query_params.get('is_sold', None)
        brand = self.request.query_params.get('brand', None)
        model = self.request.query_params.get('model', None)
        year = self.request.query_params.get('year', None)
        user_id = self.request.query_params.get('user_id', None)
        if is_sold is not None:
            queryset = queryset.filter(is_sold=is_sold)
        if brand is not None:
            queryset = queryset.filter(brand=brand)
        if model is not None:
            queryset = queryset.filter(model=model)
        if year is not None:
            queryset = queryset.filter(year=year)
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        return queryset

    def create(self, request, *args, **kwargs):
        request.data['user_id'] = request.auth.user.id
        return super(CarViewSet, self).create(request, *args, **kwargs)


class CarDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Car.objects.all()
    serializer_class = CarDetailSerializer
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        request.data['user_id'] = request.auth.user.id
        return super(CarDetailViewSet, self).update(request, *args, **kwargs)

