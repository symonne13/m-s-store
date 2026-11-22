
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('collections/', views.collections, name='collections'),
    path('wishlist/', views.wishlist, name='wishlist'),
    path('contact/', views.contact, name='contact'),
]
