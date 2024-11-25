from django.urls import path
from myapp import views

urlpatterns = [
    path('',views.index,name="index"),
    path('about',views.about,name="about"),
    path('booking',views.booking,name="booking"),
    path('contact',views.contact_us,name="contact"),
    path('feature',views.feature,name="feature"),
    path('menu',views.menu,name="menu"),
    path('single',views.single,name="single"),
    path('team',views.team,name="team"),
    # path('login',views.login,name="login"),
    # path('signup',views.signup,name="signup"),
    path('burgermenu',views.burgermenu,name="burgermenu"),
    path('snacksmenu',views.snacksmenu,name="snacksmenu"),
    path('checkout',views.checkout,name="checkout"),
    path('checkoutsteps',views.checkoutsteps,name="checkoutsteps"),
    path('dashboard',views.dashboard,name="dashboard"),

    
]