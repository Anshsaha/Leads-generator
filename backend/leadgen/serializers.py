from rest_framework import serializers
from .models import User, Usage, OrganizationData, LeadsData


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usage
        fields = "__all__"


class OrganizationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationData
        fields = "__all__"


class LeadsDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadsData
        fields = "__all__"
