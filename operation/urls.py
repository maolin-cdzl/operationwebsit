from django.conf.urls import include, url
from django.contrib.auth import views as auth_views
from django.contrib import admin
from . import views as opt_views

urlpatterns = [
    url(r'^$', opt_views.login, name='login'),
    url(r'^admin/', admin.site.urls),
    url(r'login/$', opt_views.login,name='login' ),
    url(r'runtime/$', opt_views.runtime, name='runtime'),
    url(r'runtime/device/$', opt_views.device, name='device'),
    url(r'runtime/server/$', opt_views.server,name='server'),
    url(r'runtime/user/detail/$', opt_views.user_detail,name='user_detail'),
    url(r'runtime/company/detail/$', opt_views.company_detail,name='company_detail'),
    url(r'runtime/group/detail/$', opt_views.group_detail,name='group_detail'),
]
