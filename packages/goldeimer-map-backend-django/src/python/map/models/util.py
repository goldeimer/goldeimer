from django.db.models import UUIDField
from uuid import uuid4


def makeUuidField():
    return UUIDField(
        db_index=True,
        default=uuid4,
        editable=False,
        unique=True
    )
