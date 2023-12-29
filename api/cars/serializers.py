from rest_framework_mongoengine import serializers
from cars.models import Car
import base64

class CarSerializer(serializers.DocumentSerializer):
    image = serializers.FileField(required=False)
    class Meta:
        model = Car
        using = 'mongo'
        fields = '__all__'


class CarDetailSerializer(serializers.DocumentSerializer):
    image = serializers.FileField(required=False)
    class Meta:
        model = Car
        using = 'mongo'
        fields = '__all__'
        lookup_field = 'id'