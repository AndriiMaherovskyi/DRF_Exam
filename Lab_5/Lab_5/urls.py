"""
URL configuration for Lab_5 project.

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
import os

from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


from basicApp.views import (basicAppAPIView, SingleGetView, basicAppAPIViewFamilies,
                            SingleGetViewFamily, basicAppAPIViewFamilyBudgets,
                            SingleGetViewFamilyBudget, MyTemplateView, MyTemplatePutView,
                            FamilyView, FamilyViewPut, FamilyBudgetView, FamilyBudgetViewPut,
                            UserView, UserViewPut, HomeView)

schema_view = get_schema_view(
   openapi.Info(
      title="Your Project API",
      default_version='v1',
      description="Your project description",
      terms_of_service="http://127.0.0.1:8000/terms/",
      contact=openapi.Contact(email="contact@yourapp.com"),
      license=openapi.License(name="Your License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/usersList', basicAppAPIView.as_view(), name='user_list'), # get list of users or add one more
    path('api/v1/usersList/<int:pk>', basicAppAPIView.as_view(), name='user_list_detail'), # update current user
    path('api/v1/users/<int:pk>/', SingleGetView.as_view()), # get single user info
    path('api/v1/familiesList', basicAppAPIViewFamilies.as_view(), name='family_list'), # get list of families or add one more
    path('api/v1/familiesList/<int:pk>', basicAppAPIViewFamilies.as_view(), name='family_list_detail'), # update current family
    path('api/v1/families/<int:pk>', SingleGetViewFamily.as_view()), # get single family info
    path('api/v1/family_budgetsList', basicAppAPIViewFamilyBudgets.as_view(), name='budget_list'), # get list of budgets or add one more
    path('api/v1/family_budgetsList/<int:pk>', basicAppAPIViewFamilyBudgets.as_view(), name='budget_list_detail'), # update current budget
    path('api/v1/family_budgets/<int:pk>', SingleGetViewFamilyBudget.as_view()), # get single budget info
    #path('', include('basicApp.urls_b')),
    path('', HomeView.as_view()),
    path('my-template/', MyTemplateView.as_view(), name='my_template'),
    path('my-template/put/', MyTemplatePutView.as_view(), name='put'),
    path('family/', FamilyView.as_view(), name='family'),
    path('family/put', FamilyViewPut.as_view(), name='familyPut'),
    path('familyBudget/', FamilyBudgetView.as_view(), name='familyBudget'),
    path('familyBudget/put', FamilyBudgetViewPut.as_view(), name='familyBudgetPut'),
    path('user/', UserView.as_view(), name='user'),
    path('user/put', UserViewPut.as_view(), name='userPut'),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/v1/docs/', lambda r: JsonResponse(schema_view.get_schema(request=r, public=True))),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Додаємо шлях до вашого YAML файлу від кореня проекту (припускається, що файл у директорії docs)
# yaml_path = os.path.join(settings.BASE_DIR, 'docs', 'api_documentation.yaml')
# if os.path.exists(yaml_path):
#    urlpatterns.append(path('api/v1/docs/yaml/', lambda r: JsonResponse(open(yaml_path).read()), name='api-docs-yaml'))

#PUT query
# {
#     "id": 4,
#     "username": "Julia",
#     "password": "123",
#     "familyId_id": 1,
#     "email": "julia312@gmail.com"
# }
#PUT query
# {
#     "id": 2,
#     "name": "Klinton"
# }
