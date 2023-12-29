from django.db import models

class Administration(models.Model):
   page_title = models.CharField(max_length=64, blank=True, null=True, default=None)

   def __str__(self):
      return "%s" % self.page_title

   class Meta:
      verbose_name = 'Page title'
      verbose_name_plural = 'Pages titles'
