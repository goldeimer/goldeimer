from django.urls import path
from .views import ViewListFeatures


urlpatterns = [
    path(
        'features/',
        ViewListFeatures.as_view(),
        name='features-list'
    ),
]
