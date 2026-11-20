from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'app/home.html')
def collections(request):
    return render(request, 'app/collections.html')
def contact(request):
    return render(request, 'app/contact.html')