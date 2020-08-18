from django.contrib import admin
from django.urls import (
    include,
    path,
    re_path,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(
        '(?P<version>(v1|v2))/',
        include('map.urls')
    ),
]
