from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .forms import *

def start(request):
    """Start page with a documentation.
    """
    return render(request, "operation/start.html",
                  {"nav_active":"start"})

def login(request):
    """Start page with a documentation.
    """
    return render(request, "operation/login.html",
                  {"nav_active":"start"})

def runtime(request):
    return render(request, "operation/runtime.html",{"nav_active":"runtime"})

def device(request):
    return render(request, "operation/device.html",
                  {"nav_active":"device"})

def server(request):
    return render(request, "operation/server.html",
                  {"nav_active":"server"})

def charts(request):
    """Charts page.
    """
    return render(request, "operation/sb_admin_charts.html",
                  {"nav_active":"charts"})
def tables(request):
    """Tables page.
    """
    return render(request, "operation/sb_admin_tables.html",
                  {"nav_active":"tables"})
def forms(request):
    """Forms page.
    """
    return render(request, "operation/sb_admin_forms.html",
                  {"nav_active":"forms"})
def bootstrap_elements(request):
    """Bootstrap elements page.
    """
    return render(request, "operation/sb_admin_bootstrap_elements.html",
                  {"nav_active":"bootstrap_elements"})
def bootstrap_grid(request):
    """Bootstrap grid page.
    """
    return render(request, "operation/sb_admin_bootstrap_grid.html",
                  {"nav_active":"bootstrap_grid"})
def dropdown(request):
    """Dropdown  page.
    """
    return render(request, "operation/sb_admin_dropdown.html",
                  {"nav_active":"dropdown"})
def rtl_dashboard(request):
    """RTL Dashboard page.
    """
    return render(request, "operation/sb_admin_rtl_dashboard.html",
                  {"nav_active":"rtl_dashboard"})

def blank(request):
    """Blank page.
    """
    return render(request, "operation/sb_admin_blank.html",
                  {"nav_active":"blank"})

