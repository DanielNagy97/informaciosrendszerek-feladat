from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieInstanceViewSet, MovieViewSet, RentingViewSet, UserViewSet, RegisterView, CustomObtainAuthToken
from .views import homePageView

router = DefaultRouter()
router.register('movie', MovieViewSet, basename='movie')
router.register('movieInstance', MovieInstanceViewSet, basename='movieInstance')
router.register('renting', RentingViewSet, basename='renting')
router.register(r'users', UserViewSet)
router.register('register', RegisterView, basename='register')

urlpatterns = [
    path('', homePageView, name="home" ),
    path('viewset/', include(router.urls)),
    path('viewset/<int:id>', include(router.urls)),
    path('api-token-auth/', CustomObtainAuthToken.as_view(), name='api_token_auth'),
]
