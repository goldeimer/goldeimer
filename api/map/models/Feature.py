from django.db.models import ManyToManyField

from .base.ModelBase import ModelBase
from .util import makeUuidField
from .Term import Term


class Feature(ModelBase):
    class Meta:
        verbose_name = 'Eintrag'
        verbose_name_plural = 'Einträge'

    uuid = makeUuidField()

    terms = ManyToManyField(
        Term,
        related_name='terms'
    )
