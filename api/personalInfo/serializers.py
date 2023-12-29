from rest_framework_mongoengine import serializers
from personalInfo.models import PersonalInfo
import base64

class PersonalInfoSerializer(serializers.DocumentSerializer):
    class Meta:
        model = PersonalInfo
        fields = '__all__'

        def to_representation(self, instance):
            representation = super().to_representation(instance)
            representation['image'] = base64.b64encode(representation['image']).decode('utf-8')
            return representation

        def to_internal_value(self, data):
            data['image'] = base64.b64encode(data['image'].encode('utf-8')).decode('utf-8')
            return super().to_internal_value(data)

class PersonalInfoDetailSerializer(serializers.DocumentSerializer):
    class Meta:
        model = PersonalInfo
        fields = '__all__'
        lookup_field = 'user_id'
        extra_kwargs = {
            'user_id': {
                'required': False,
            }
        }


        def to_representation(self, instance):
            representation = super().to_representation(instance)
            representation['image'] = base64.b64encode(representation['image']).decode('utf-8')
            return representation

        def to_internal_value(self, data):
            data['image'] = base64.b64encode(data['image'].encode('utf-8')).decode('utf-8')
            return super().to_internal_value(data)