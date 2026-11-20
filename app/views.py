from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'app/home.html')
def collections(request):
    return render(request, 'app/collections.html')
def customorder(request):
    return render(request, 'app/customorder.html')