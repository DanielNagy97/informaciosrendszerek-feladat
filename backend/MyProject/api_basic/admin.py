from django.contrib import admin
from .models import Movie, MovieInstance, Renting

admin.site.register(Movie)
admin.site.register(MovieInstance)
admin.site.register(Renting)
