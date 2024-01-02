from django.contrib.auth import login

from rest_framework import generics,  permissions, status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response

from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication
from knox.models import AuthToken

from personalInfo.models import PersonalInfo
from core.serializers import UserSerializer, AuthSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        response_data = {
            'token': AuthToken.objects.create(user)[1],
            'user_id': user.id,
        }
        # create new document in personalInfo collection with user_id
        PersonalInfo.objects.create(user_id=str(user.id))
        return Response(response_data, status=status.HTTP_200_OK)


class LoginView(KnoxLoginView):
    serializer_class = AuthSerializer
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        response_data = {
            'token': AuthToken.objects.create(user)[1],
            'user_id': user.id,
        }

        return Response(response_data, status=status.HTTP_200_OK)


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user