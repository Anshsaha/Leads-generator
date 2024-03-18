from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.contrib.postgres.fields import ArrayField
import uuid


class KeywordTypes(models.TextChoices):
    ORGANIZATION = "ORGANIZATION"
    LEADS = "LEADS"


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email Id is Required")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=100, null=True)
    email = models.EmailField(unique=True)
    user_role = models.CharField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    last_modified_at = models.DateTimeField(auto_now=True, null=True)
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password"]

    class Meta:
        db_table = "auth_user"

    def __str__(self):
        return self.email


class Usage(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    industries = ArrayField(models.CharField(null=True), null=True)
    locations = ArrayField(models.CharField(null=True), null=True)
    employee_range = models.CharField(null=True)
    designations = ArrayField(models.CharField(null=True), null=True)
    keyword = models.CharField(choices=KeywordTypes.choices, max_length=100, null=True)
    status = models.CharField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    last_modified_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        db_table = "usage"

    def __str__(self):
        return self.id


class OrganizationData(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    name = models.CharField(null=True)
    website_url = models.CharField(null=True)
    linkedin_url = models.CharField(null=True)
    twitter_url = models.CharField(null=True)
    founded_year = models.IntegerField(null=True)
    location = models.CharField(null=True)
    usage = models.ForeignKey(Usage, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    last_modified_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        db_table = "organization_data"

    def __str__(self):
        return self.name
