from django.urls import include, path
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'post', views.MyView)
#
# urlpatterns = [
#     path('', (router.urls_b)),
#     path('api-auth/', include('rest_framework.urls'), namespace = 'rest_framework')
# ]