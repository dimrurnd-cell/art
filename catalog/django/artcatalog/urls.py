# -*- coding: utf-8 -*-
from __future__ import unicode_literals

try:  # Django 2.0+
    from django.urls import re_path
except ImportError:  # Django 1.8–1.11
    from django.conf.urls import url as re_path

from . import views

urlpatterns = [
    re_path(r"^lead/$", views.lead, name="artcatalog_lead"),
]
