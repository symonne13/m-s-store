
from django.shortcuts import render


def home(request):
    return render(request, 'app/home.html')


def collections(request):
    return render(request, 'app/collections.html')


def wishlist(request):
    return render(request, 'app/wishlist.html')


def contact(request):
    return render(request, 'app/contact.html')
