from django.urls import reverse
from rest_framework.views import status

from map.models import Feature
from map.serializers import FeatureSerializer

from .BaseViewTest import BaseViewTest


class TestGetAllFeatures(BaseViewTest):
    def test_getAllFeatures(self):
        """
        Test a GET request to the features/ endpoint
        """
        expected = FeatureSerializer(
            Feature.objects.all(),
            many=True
        )

        response = self.client.get(
            reverse('features-list', kwargs={'version': 'v1'})
        )

        self.assertEqual(response.data, expected.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
