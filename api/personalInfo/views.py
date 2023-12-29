from rest_framework_mongoengine import generics
from rest_framework.exceptions import PermissionDenied
from personalInfo.serializers import PersonalInfoDetailSerializer
from personalInfo.models import PersonalInfo
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

class PersonalInfoDetailViewSet(generics.RetrieveUpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoDetailSerializer
    lookup_field = 'user_id'

    def update(self, request, *args, **kwargs):
        request.data['user_id'] = kwargs['user_id']
        if int(request.auth.user.id) != int(PersonalInfo.objects.get(user_id=kwargs['user_id']).user_id):
            raise PermissionDenied("You can only update your own personal info. Your id {} does not match the user_id {} in the url.".format(request.auth.user.id, kwargs['user_id']))
        return super(PersonalInfoDetailViewSet, self).update(request, *args, **kwargs)

