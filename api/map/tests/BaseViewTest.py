from rest_framework.test import (
    APIClient,
    APITestCase,
)

from .util import createFeature
from .TestModels import FEATURE

class BaseViewTest(APITestCase):
    client = APIClient()

    def setUp(self):
        self.feature = createFeature(
            FEATURE['name'],
            FEATURE['address_city'],
            FEATURE['address_country'],
            FEATURE['address_line1'],
            FEATURE['latitude'],
            FEATURE['longitude'],
            FEATURE['terms'],
            FEATURE['url'],
            FEATURE['address_line2'],
            FEATURE['description']
        )
