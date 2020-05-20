from rest_framework.test import (
    APIClient,
    APITestCase,
)

from map.models import Feature


class BaseViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def createFeature(title=''):
        if title != '':
            Feature.objects.create(
                title=title
            )

    def setUp(self):
        self.createFeature('Tante Emma')
        self.createFeature('Alnatura')
        self.createFeature('Kiosk')
