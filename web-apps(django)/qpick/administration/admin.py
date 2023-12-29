from django.contrib import admin
from administration.models import Administration


class AdministrationAdmin (admin.ModelAdmin):
    list_display = [field.name for field in Administration._meta.fields]

    class Meta:
        model = Administration

admin.site.register(Administration, AdministrationAdmin)
