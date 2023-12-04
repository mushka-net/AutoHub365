from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        using = 'default'
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class AuthSerializer(serializers.Serializer):
    class Meta:
        using = 'default'
    username = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=username,
            password=password
        )

        if not user:
            msg = 'Unable to authenticate with provided credentials'
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return