from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

class UserAccountManager(BaseUserManager):
  def create_user(self, email, password=None, **extra_fields):
    if not email:
      raise ValueError('User must have an email')

    email = self.normalize_email(email)
    user = self.model(email=email, **extra_fields)

    user.set_password(password)
    user.save()

    return user

  def create_superuser(self, email, name, password=None):
    if not email:
      raise ValueError('User must have an email')
    email = self.normalize_email(email)
    user = self.model(email=email, name=name)

    user.set_password(password)

    user.is_staff = True
    user.is_superuser = True
    user.save()

    return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(max_length=255, unique=True)
  first_name = models.CharField(max_length=200)
  last_name = models.CharField(max_length=200)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  
  objects =UserAccountManager()

  USERNAME_FIELD = 'email'

  REQUIRED_FIELDS = ['first_name', 'last_name']

  def get_full_name(self):
    return self.first_name + ' ' + self.last_name
  
  def get_short_name(self):
    return self.first_name

  def get_email(self):
    return self.email

  def __str__(self):
    return self.email



