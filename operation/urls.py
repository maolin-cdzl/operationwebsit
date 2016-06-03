from django.conf.urls import patterns, include, url
from django.contrib.auth import views as auth_views

urlpatterns = patterns('',
    url(r'^$', 'operation.views.start', name='sb_admin_start'),
    url(r'^login/$', 'django.contrib.auth.views.login', { 'template_name' : 'operation/login.html'}),
    url(r'^dashboard/$', 'operation.views.dashboard', name='dashboard'),
    url(r'^charts/$', 'operation.views.charts', name='sb_admin_charts'),
    url(r'^tables/$', 'operation.views.tables', name='sb_admin_tables'),
    url(r'^forms/$', 'operation.views.forms', name='sb_admin_forms'),
    url(r'^bootstrap-elements/$', 'operation.views.bootstrap_elements', name='sb_admin_bootstrap_elements'),
    url(r'^bootstrap-grid/$', 'operation.views.bootstrap_grid', name='sb_admin_bootstrap_grid'),
    url(r'^rtl-dashboard/$', 'operation.views.rtl_dashboard', name='sb_admin_rtl_dashboard'),
    url(r'^blank/$', 'operation.views.blank', name='sb_admin_blank'),
    url(r'^rt/dev/info/$', 'operation.views.devset', name='devset'),
)
