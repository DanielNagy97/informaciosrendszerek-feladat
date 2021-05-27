from django.contrib.auth.models import User
from django.http.response import HttpResponse

from rest_framework import viewsets, mixins, status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import AllowAny, DjangoModelPermissions
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .models import Movie, MovieInstance, Renting
from .serializers import MovieSerializer, MovieInstanceSerializer, RentingSerializer, UserSerializer, RegisterSerializer


def homePageView(request):
    """
    API endpoint just for the welcome text
    """
    return HttpResponse("API is working...")


class RegisterView(viewsets.GenericViewSet,
                   mixins.CreateModelMixin):
    """
    API endpoint that allow guests to register.
    """
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class CustomObtainAuthToken(ObtainAuthToken):
    """
    API endpoint that provides tokens and userIDs
    """
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [DjangoModelPermissions]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        else:
            return User.objects.filter(id = self.request.user.id)


class MovieViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows movies to be viewed or edited.
    """
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = [DjangoModelPermissions]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    """
    def list(self, request, *args, **kwargs):
        movies = Movie.objects.all()
        serializer = MovieListSerializer(movies, many = True)
        return Response(serializer.data)
    """


class MovieInstanceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows movie instances to be viewed or edited.
    """
    serializer_class = MovieInstanceSerializer
    queryset = MovieInstance.objects.all()
    permission_classes = [DjangoModelPermissions]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def get_queryset(self):
        movies = MovieInstance.objects.all()

        available_param = self.request.query_params.get('available')
        if available_param == "true":
            movies = movies.filter(isAvailable = True)
        elif available_param == "false":
            movies = movies.filter(isAvailable = False)

        movie_param = self.request.query_params.get('movie')
        if movie_param:
            movies = movies.filter(movie=movie_param)

        format_param = self.request.query_params.get('formatType')
        if format_param:
            movies = movies.filter(format = format_param)

        order = self.request.query_params.get('order')
        if order:
            if order == "1":
                movies = movies.order_by('price')
            else:
                movies = movies.order_by('-price')

        return movies

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class RentingViewSet(viewsets.GenericViewSet,
                     mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin):
    """
    API endpoint that allows user's rentings to be viewed or edited.
    """
    serializer_class = RentingSerializer
    permission_classes = [DjangoModelPermissions]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def get_queryset(self):
        rentings = Renting.objects.all()
        if not self.request.user.is_staff:
            rentings = rentings.filter(user = self.request.user.id)

        closed_param = self.request.query_params.get('closed')
        if closed_param == "true":
            rentings = rentings.filter(closed=True)
        elif closed_param == "false":
            rentings = rentings.filter(closed=False)

        user_param = self.request.query_params.get('user')
        if user_param != None:
            rentings = rentings.filter(user = user_param)

        return rentings.order_by('deadLine')

    def create(self, request, *args, **kwargs):
        print(request.data)
        movieInstance = MovieInstance.objects.get(id=request.data['movieInstance'])
        if(movieInstance.isAvailable):
            # request.data._mutable = True
            new_renting = request.data
            if(not self.request.user.is_staff):
                new_renting['user'] = str(self.request.user.id)
            # request.data._mutable = False

            if(not new_renting['closed']):
                movieInstance.isAvailable=False
                movieInstance.save()

            serializer = RentingSerializer(data=new_renting)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("The selected movie is not available", status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        if self.request.data['closed']:
            movieInstance = MovieInstance.objects.get(id=request.data['movieInstance'])
            movieInstance.isAvailable=True
            movieInstance.save()
        return super().update(request, *args, **kwargs)
