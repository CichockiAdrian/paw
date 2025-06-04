"""
URL configuration for meble_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from meble_app import views

urlpatterns = [
    path('', views.lista_mebli, name='lista_mebli'),
    path('mebel/<int:pk>/', views.szczegoly_mebla, name='szczegoly_mebla'),
    path('dodaj-mebel/', views.dodaj_mebel, name='dodaj_mebel'),
    path('dodaj-kategorie/', views.dodaj_kategorie, name='dodaj_kategorie'),
]
