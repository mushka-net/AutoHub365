from cars.serializers import CarSerializer, CarDetailSerializer
from cars.models import Car
import base64
import os
from django.conf import settings
from rest_framework_mongoengine import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser
import uuid
from knox.auth import TokenAuthentication

def generate_unique_filename(filename):
    _, file_extension = os.path.splitext(filename)
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    return unique_filename

class CarViewSet(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    parser_classes = (MultiPartParser,)

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
        request.data['image'] = request.data['image_data'].name
        return super(CarViewSet, self).create(request, *args, **kwargs)


    def perform_create(self, serializer):
        image = self.request.data.get('image_data')
        serializer.validated_data['image'] = image.name
        image_name = generate_unique_filename(image.name)

        destination_path = os.path.join(settings.STATIC_ROOT, image_name)
        with open(destination_path, 'wb+') as destination:
            for chunk in image.chunks():
                destination.write(chunk)

        # Save the link to the file in the model
        instance = serializer.save()
        instance.image = f'{settings.STATIC_URL}{image_name}'
        instance.save()

class CarDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Car.objects.all()
    serializer_class = CarDetailSerializer
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        request.data['user_id'] = request.auth.user.id
        if int(request.auth.user.id) != int(Car.objects.get(id=kwargs['id']).user_id):
            raise PermissionDenied()
        return super(CarDetailViewSet, self).update(request, *args, **kwargs)
