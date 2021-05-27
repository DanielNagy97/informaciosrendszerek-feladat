from django.db import models
from django.contrib.auth.models import User

class Movie(models.Model):
    title = models.CharField(max_length=400)
    director = models.CharField(max_length=200)
    storyLine = models.CharField(max_length=1000)
    genre = models.CharField(max_length=100)
    releaseDate = models.DateField()
    ageRating = models.IntegerField()

    def __str__(self):
        return '%s' % (self.title)

class MovieInstance(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    format = models.CharField(max_length=100)
    price = models.IntegerField()
    isAvailable = models.BooleanField(default=True)

    def __str__(self):
        return '%s, %s' % (self.movie, self.format)

class Renting(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    movieInstance = models.ForeignKey(MovieInstance, on_delete=models.CASCADE, default=1 )
    startingDate = models.DateField(auto_now_add=True)
    deadLine = models.DateField()
    closed = models.BooleanField(default=False)
