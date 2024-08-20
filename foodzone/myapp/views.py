from django.shortcuts import render
from myapp.models import Contact
from django.http import HttpResponse
# Create your views here.
def index(request):
        return render(request,"index.html")

def about(request):
        return render(request,"about.html")
    
def blog(request):
        return render(request,"blog.html")
    
def booking(request):
        return render(request,"booking.html")
    
def contact_us(request):
        context={}
        if request.method =="POST":
                name = request.POST.get("name")
                email = request.POST.get("email")
                subject = request.POST.get("subject")
                message = request.POST.get("message")
                obj = Contact(name=name,email=email,subject=subject,message=message)
                obj.save()
                context['message']=f"Dear {name}, Thanks for spands your Time! in FoodZone Site"
        return render(request,"contact.html",context)
    
def feature(request):
        return render(request,"feature.html")
    
def menu(request):
        return render(request,"menu.html")
    
def single(request):
        return render(request,"single.html")
    
def team(request):
        return render(request,"team.html")

def login(request):
        return render(request,"login.html")

def signup(request):
        return render(request,"signup.html")

def burgermenu(request):
        return render(request,"burgermenu.html")

def checkout(request):
        return render(request,"checkout.html")