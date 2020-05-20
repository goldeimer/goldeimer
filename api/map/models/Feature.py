from django.db import models

class Feature(models.Model):
    class Meta:
        verbose_name = 'Eintrag'
        verbose_name_plural = 'Einträge'

    title = models.CharField(max_length=255, null=False)

    def __str__(self):
        return str(f'{self.title}')
