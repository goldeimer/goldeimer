from django.db.models import (
    CharField,
    DecimalField,
    ManyToManyField,
    URLField,
)

from .base.ModelBase import ModelBase
from .util import makeUuidField
from .Term import Term


def makeCoordinateField(verboseName):
    return DecimalField(
        db_index=True,
        decimal_places=4,
        max_digits=7,
        verbose_name=verboseName
    )


class Feature(ModelBase):
    class Meta:
        verbose_name = 'Eintrag'
        verbose_name_plural = 'Einträge'

    # TODO:
    # app-level `baseEnum.py` module?
    # geography model(s)?
    SUPPORTED_COUNTRIES = [
        ('de', 'Deutschland',),
        ('li', 'Liechtenstein',),
        ('at', 'Österreich',),
        ('ch', 'Schweiz',),
    ]

    uuid = makeUuidField()

    terms = ManyToManyField(
        Term,
        related_name='terms'
    )

    latitude = makeCoordinateField('Längengrad')
    longitude = makeCoordinateField('Breitengrad')

    address_city = CharField(
        max_length=50,
        verbose_name='Stadt'
    )

    address_country = CharField(
        choices=SUPPORTED_COUNTRIES,
        max_length=2,
        verbose_name='Land'
    )

    address_line1 = CharField(
        max_length=100,
        verbose_name='Straße & Hausnummer (Adresszeile 1)'
    )

    address_line2 = CharField(
        max_length=100,
        null=True,
        verbose_name='Addresszusatz (Adresszeile 2)'
    )

    address_zip_code = CharField(
        max_length=7,
        verbose_name='Postleitzahl'
    )

    description = CharField(
        max_length=1023,
        null=True,
        verbose_name='Freie Beschreibung'
    )

    url = URLField(
        null=True,
        verbose_name='Webseite (URL)'
    )
