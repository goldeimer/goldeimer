from rest_framework import generics

from map.models import Feature
from map.serializers import FeatureSerializer


class ViewListFeatures(generics.ListAPIView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
