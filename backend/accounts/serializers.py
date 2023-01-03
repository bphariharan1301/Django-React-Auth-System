from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

# Retriving Custom User Model
User = get_user_model()

class UserCreateSerializers(UserCreateSerializer):
  class Meta(UserCreateSerializer.Meta):
    model = User
    fields = ('id', 'email', 'name', 'password')


  