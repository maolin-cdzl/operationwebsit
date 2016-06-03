from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
import requests
from .forms import *

def start(request):
    """Start page with a documentation.
    """
    return render(request, "operation/start.html",
                  {"nav_active":"start"})

def dashboard(request):
    """Dashboard page.
    """
    return render(request, "operation/dashboard.html",
                  {"nav_active":"dashboard"})

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

def devset(request):
    print('devset request,method: %s' % request.method)
    if request.method == 'GET':
        try:
            r = requests.get('http://127.0.0.1:3000/rt/dev/info')
            print(r.url)

            print('status: %d,content: %s' % (r.status_code, r.text))
            if r.status_code == 200:
                return HttpResponse(r.text)
            else:
                return HttpResponse(status=r.status_code)
        except Exception as e:
            print(e.message)
            return HttpResponse(status=500)

    return HttpResponse(status=405)

