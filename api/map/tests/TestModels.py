from rest_framework.test import APITestCase

from .util import (
    createFeature,
    createTaxonomy,
    createTerm,
)


FEATURE = {
    'name': 'Some Feature',
    'address_city': 'Hamburg',
    'address_country': 'de',
    'address_line1': 'Neuer Kamp 32',
    'address_line2': None,
    'description': None,
    'latitude': 50,
    'longitude': 10,
    'terms': [],
    'url': 'https://www.goldeimer.de',
}

TAXONOMY = {
    'name': 'Some Taxonomy',
}

TERM = {
    'name': 'Some Term',
}


class TestModels(APITestCase):
    def setUp(self):
        self.taxonomy = createTaxonomy(TAXONOMY['name'])
        self.term = createTerm(TERM['name'], self.taxonomy)
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

    def test_ModelFeature(self):
        self.assertEqual(self.feature.name, FEATURE['name'])
        self.assertEqual(self.feature.address_city, FEATURE['address_city'])
        self.assertEqual(self.feature.address_country, FEATURE['address_country'])
        self.assertEqual(self.feature.address_line1, FEATURE['address_line1'])
        self.assertEqual(self.feature.address_line2, FEATURE['address_line2'])
        self.assertEqual(self.feature.description, FEATURE['description'])
        self.assertEqual(self.feature.latitude, FEATURE['latitude'])
        self.assertEqual(self.feature.longitude, FEATURE['longitude'])
        # TODO: Better assert w/o casting to list.
        self.assertEqual(list(self.feature.terms.all()), FEATURE['terms'])
        self.assertEqual(self.feature.url, FEATURE['url'])
        self.assertEqual(str(self.feature), FEATURE['name'])

    def test_ModelTaxonomy(self):
        self.assertEqual(self.taxonomy.name, TAXONOMY['name'])
        self.assertEqual(str(self.taxonomy), TAXONOMY['name'])

    def test_ModelTerm(self):
        self.assertEqual(self.term.name, TERM['name'])
        self.assertEqual(str(self.term), TERM['name'])
        self.assertEqual(self.term.taxonomy, self.taxonomy)
