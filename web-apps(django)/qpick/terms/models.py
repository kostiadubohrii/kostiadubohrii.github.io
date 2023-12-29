from django.db import models

class Terms(models.Model):
    title = models.TextField(blank=True, null=True, default=None)
    text = models.TextField(blank=True, null=True, default=None)

    def __str__(self):
        return "%s" % self.title

    class Meta:
        verbose_name = 'Term'
        verbose_name_plural = 'Terms'
