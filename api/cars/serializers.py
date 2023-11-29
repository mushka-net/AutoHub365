from rest_framework_mongoengine import serializers
from cars.models import Car

class CarSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Car
        fields = '__all__'

class CarDetailSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Car
        fields = '__all__'
        lookup_field = 'id'





