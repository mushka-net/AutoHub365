from rest_framework_mongoengine import generics
from personalInfo.serializers import PersonalInfoDetailSerializer
from personalInfo.models import PersonalInfo


class PersonalInfoViewSet(generics.CreateAPIView):
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoDetailSerializer

class PersonalInfoDetailViewSet(generics.RetrieveUpdateAPIView):
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoDetailSerializer
    lookup_field = 'id'