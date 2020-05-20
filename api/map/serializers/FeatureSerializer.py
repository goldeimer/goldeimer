from rest_framework import serializers
from map.models.Feature import Feature


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ("title",)
