from django.db.models import (
    CharField,
    DateTimeField,
    Model,
)


MAX_LENGTH = 60


class ModelBase(Model):
    class Meta:
        abstract = True
        ordering = ['name']

    name = CharField(
        # TODO: Less rigid / move to children?!
        max_length=MAX_LENGTH,
        null=False,
        verbose_name='Name'
    )

    creation_timestamp = DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name='Erstellt'
    )

    update_timestamp = DateTimeField(
        auto_now=True,
        editable=False,
        verbose_name='Zuletzt geändert'
    )

    def __str__(self):
        return str(f'{self.name}')
