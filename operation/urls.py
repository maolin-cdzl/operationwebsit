from django.conf.urls import patterns, include, url
from django.contrib.auth import views as auth_views
from . import views as opt_views

urlpatterns = [
    url(r'^$', opt_views.start, name='sb_admin_start'),
    url(r'login/$', opt_views.login, { 'template_name' : 'operation/login.html'}),
    url(r'runtime/$', opt_views.runtime, name='runtime'),
    url(r'runtime/server/$', opt_views.runtime_server,name='runtime_server'),
    url(r'charts/$', opt_views.charts, name='sb_admin_charts'),
    url(r'tables/$', opt_views.tables, name='sb_admin_tables'),
    url(r'forms/$', opt_views.forms, name='sb_admin_forms'),
    url(r'bootstrap-elements/$', opt_views.bootstrap_elements, name='sb_admin_bootstrap_elements'),
    url(r'bootstrap-grid/$', opt_views.bootstrap_grid, name='sb_admin_bootstrap_grid'),
    url(r'rtl-dashboard/$', opt_views.rtl_dashboard, name='sb_admin_rtl_dashboard'),
    url(r'blank/$', opt_views.blank, name='sb_admin_blank'),
]
