from map.models import (
    Feature,
    Taxonomy,
    Term,
)


def createFeature(
    name,
    terms=[]
):
    feature = Feature.objects.create(
        name=name
    )
    feature.terms.set(terms)

    return feature


def createTaxonomy(name):
    return Taxonomy.objects.create(name=name)


def createTerm(
    name,
    taxonomy
):
    return Term.objects.create(
        name=name,
        taxonomy=taxonomy
    )
