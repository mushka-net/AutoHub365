from cars.serializers import CarSerializer, CarDetailSerializer
from cars.models import Car
import base64
import os
from django.conf import settings
from rest_framework_mongoengine import generics
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
        is_sold = bool(self.request.query_params.get('is_sold', None))
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

    def perform_create(self, serializer):
        image_data = self.request.data.get('image', None)
        if image_data:
            image_data = base64.b64decode(image_data)
            image_name = f"{serializer.validated_data['brand']}_{serializer.validated_data['model']}_{serializer.validated_data['year']}_{serializer.validated_data['price']}.png"
            image_path = os.path.join(settings.STATIC_ROOT, 'images', image_name)

            with open(image_path, 'wb') as image_file:
                image_file.write(image_data)

            serializer.validated_data['image'] = image_path

        serializer.save()


class CarDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Car.objects.all()
    serializer_class = CarDetailSerializer
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        request.data['user_id'] = request.auth.user.idis
        if int(request.auth.user.id) != int(Car.objects.get(id=kwargs['id']).user_id):
            raise PermissionDenied()
        return super(CarDetailViewSet, self).update(request, *args, **kwargs)
