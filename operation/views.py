from django.shortcuts import render
from django.http import HttpResponse,JsonResponse,HttpResponseRedirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as djangoLogin 
from django.contrib.auth.decorators import login_required
from .forms import *

def start(request):
    return render(request, "operation/start.html",{"nav_active":"start"})

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                print('login success!')
                djangoLogin(request,user)
                return HttpResponseRedirect('/runtime/')
    
    return render(request, "operation/login.html")

@login_required
def runtime(request):
    return render(request, "operation/runtime.html",{"nav_active":"runtime"})

@login_required
def device(request):
    return render(request, "operation/device.html",
                  {"nav_active":"device"})

@login_required
def server(request):
    return render(request, "operation/server.html",{"nav_active":"server"})

@login_required
def user_detail(request):
    return render(request, "operation/user_detail.html",{"nav_active":"user"})

@login_required
def company_detail(request):
    return render(request, "operation/company_detail.html",{"nav_active":"company"})

@login_required
def group_detail(request):
    return render(request, "operation/group_detail.html",{"nav_active":"group"})


