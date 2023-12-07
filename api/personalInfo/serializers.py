from rest_framework_mongoengine import serializers
from personalInfo.models import PersonalInfo

class PersonalInfoSerializer(serializers.DocumentSerializer):
    class Meta:
        model = PersonalInfo
        fields = '__all__'

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