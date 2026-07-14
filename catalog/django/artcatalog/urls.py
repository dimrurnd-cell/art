from django.urls import path

from . import views

app_name = "artcatalog"

urlpatterns = [
    path("lead/", views.lead, name="lead"),
]
