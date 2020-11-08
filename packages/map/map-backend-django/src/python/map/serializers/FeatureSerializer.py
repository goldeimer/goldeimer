from rest_framework.serializers import ModelSerializer
from map.models.Feature import Feature


class FeatureSerializer(ModelSerializer):
    class Meta:
        model = Feature
        fields = (
            'name',
            'terms',
        )
