from django.db.models import (
    CASCADE,
    ForeignKey,
)

from .base.ModelBase import ModelBase
from .util import makeUuidField
from .Taxonomy import Taxonomy


class Term(ModelBase):
    class Meta:
        verbose_name = 'Term'
        verbose_name_plural = 'Terme'

    uuid = makeUuidField()

    taxonomy = ForeignKey(
        Taxonomy,
        on_delete=CASCADE,
        related_name='terms'
    )

    def __str__(self):
        return str(f'{self.name}')
