from django.contrib import admin

from .models import users
from .models import families
from .models import family_budgets
from .models import transactions

admin.site.register(users)
admin.site.register(families)
admin.site.register(family_budgets)
admin.site.register(transactions)

