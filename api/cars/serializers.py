from rest_framework_mongoengine import serializers as mongoserializers
from cars.models import Car
import base64

class CarSerializer(mongoserializers.DocumentSerializer):
    class Meta:
        model = Car
        using = 'mongo'
        fields = '__all__'


class CarDetailSerializer(mongoserializers.DocumentSerializer):
    class Meta:
        model = Car
        using = 'mongo'
        fields = '__all__'
        lookup_field = 'id'