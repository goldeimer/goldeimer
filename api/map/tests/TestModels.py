from rest_framework.test import APITestCase

from .util import (
    createFeature,
    createTaxonomy,
    createTerm,
)


FEATURE_NAME = "Some Feature"
TAXONOMY_NAME = "Some Taxonomy"
TERM_NAME = "Some Term"


class TestModels(APITestCase):
    def setUp(self):
        self.taxonomy = createTaxonomy(TAXONOMY_NAME)
        self.term = createTerm(TERM_NAME, self.taxonomy)
        self.feature = createFeature(FEATURE_NAME)

    def test_ModelFeature(self):
        self.assertEqual(self.feature.name, FEATURE_NAME)
        self.assertEqual(str(self.feature), FEATURE_NAME)

    def test_ModelTaxonomy(self):
        self.assertEqual(self.taxonomy.name, TAXONOMY_NAME)
        self.assertEqual(str(self.taxonomy), TAXONOMY_NAME)

    def test_ModelTerm(self):
        self.assertEqual(self.term.name, TERM_NAME)
        self.assertEqual(str(self.term), TERM_NAME)
        self.assertEqual(self.term.taxonomy, self.taxonomy)
