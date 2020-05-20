from rest_framework.test import (
    APIClient,
    APITestCase,
)

from .util import createFeature


class BaseViewTest(APITestCase):
    client = APIClient()

    def setUp(self):
        createFeature('Tante Emma')
        createFeature('Alnatura')
        createFeature('Kiosk')
