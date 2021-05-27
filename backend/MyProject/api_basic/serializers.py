from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.fields import ReadOnlyField
from .models import Movie, MovieInstance, Renting
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import Group


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'director', 'storyLine', 'genre', 'releaseDate', 'ageRating']

class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title','releaseDate']

class MovieInstanceSerializer(serializers.ModelSerializer):
    movieTitle = serializers.StringRelatedField(source="movie", read_only=True)
    class Meta:
        model = MovieInstance
        fields = ['id', 'movie', 'movieTitle', 'format', 'price', 'isAvailable']

class RentingSerializer(serializers.ModelSerializer):
    userName = serializers.StringRelatedField(source="user", read_only=True)
    movieTitle = serializers.StringRelatedField(source="movieInstance", read_only=True)
    
    class Meta:
        model = Renting
        fields = ['id', 'user', 'userName', 'movieInstance', 'movieTitle', 'startingDate', 'deadLine', 'closed']

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required = True,
                                   validators = [UniqueValidator(queryset = User.objects.all())]
                                   )

    password = serializers.CharField(write_only = True,
                                     required = True,
                                     validators = [validate_password])

    password2 = serializers.CharField(write_only = True,
                                      required = True)

    class Meta:
        model = User
        fields = ['username', 'password', 'password2', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        )
        
        user.set_password(validated_data['password'])
        user.save()

        group = Group.objects.get(name='UsersGroup') 
        group.user_set.add(user)

        return user
