from map.models import (
    Feature,
    Taxonomy,
    Term,
)


def createFeature(
    name,
    addressCity,
    addressCountry,
    addressLine1,
    latitude,
    longitude,
    terms=[],
    url=None,
    addressLine2=None,
    description=None
):
    feature = Feature.objects.create(
        name=name,
        address_city=addressCity,
        address_country=addressCountry,
        address_line1=addressLine1,
        address_line2=addressLine2,
        description=description,
        latitude=latitude,
        longitude=longitude,
        url=url
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
