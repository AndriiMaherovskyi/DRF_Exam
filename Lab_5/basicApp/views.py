from django.forms import model_to_dict
from django.http import HttpResponseRedirect
from rest_framework import generics, viewsets, status
import requests
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView, View

from .models import users, families, family_budgets
from .serializers import usersSerializer, familySerializer, family_budgetSerializer

# Create your views here.

class SingleGetView(generics.RetrieveAPIView):
    queryset = users.objects.all()
    serializer_class = usersSerializer

class basicAppAPIView(APIView):
    def get(self, request):
        user = users.objects.all()
        return Response({'title': usersSerializer(user, many=True).data})


    def post(self, request):
        serializer = usersSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'post user': serializer.data}, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})

        try:
            instance = users.objects.get(pk=pk)
        except:
            return Response({"error": "Object doesn't exist"})

        serializer = usersSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"put": serializer.data}, status=status.HTTP_200_OK)

class SingleGetViewFamily(generics.RetrieveAPIView):
    queryset = families.objects.all()
    serializer_class = familySerializer

class basicAppAPIViewFamilies(APIView):
    def get(self, request):
        family = families.objects.all()
        return Response({'title': familySerializer(family, many=True).data})

    def post(self, request):
        serializer = familySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'post family': serializer.data}, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})

        try:
            instance = families.objects.get(pk=pk)
        except:
            return Response({"error": "Object doesn't exist"})

        serializer = familySerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"put": serializer.data}, status=status.HTTP_200_OK)

class SingleGetViewFamilyBudget(generics.RetrieveAPIView):
    queryset = family_budgets.objects.all()
    serializer_class = family_budgetSerializer

class basicAppAPIViewFamilyBudgets(APIView):
    def get(self, request):
        family_budget = family_budgets.objects.all()
        return Response({'title': family_budgetSerializer(family_budget, many=True).data})

    def post(self, request):
        serializer = family_budgetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'post family budget': serializer.data}, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})

        try:
            instance = family_budgets.objects.get(pk=pk)
        except:
            return Response({"error": "Object doesn't exist"})

        serializer = family_budgetSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'put': serializer.data}, status=status.HTTP_200_OK)


class MyTemplateView(View):
    template_name = 'myapp/my_template.html'

    def get(self, request, *args, **kwargs):
        # Отримати дані для відображення з бази даних
        users_data = users.objects.all()
        families_data = families.objects.all()
        family_budgets_data = family_budgets.objects.all()

        # Сформувати дані для передачі у шаблон
        context = {
            'users': usersSerializer(users_data, many=True).data,
            'families': familySerializer(families_data, many=True).data,
            'family_budgets': family_budgetSerializer(family_budgets_data, many=True).data,
        }

        # Відобразити HTML-шаблон з отриманими даними
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        # Отримати дані з POST-запиту
        user_data = {
            'id': request.POST.get('id'),
            'username': request.POST.get('username'),
            'email': request.POST.get('email'),
            'password': request.POST.get('password'),
            'familyId_id': request.POST.get('familyId_id'),
            # Додайте інші поля з форми, якщо необхідно
        }

        # Створити екземпляр серіалізатора
        serializer = usersSerializer(data=user_data)

        # Перевірити валідність даних
        if serializer.is_valid():
            # Зберегти дані у базу даних
            serializer.save()

            # Після обробки POST-запиту перенаправити користувача на головну сторінку або виконати інші дії
            return HttpResponseRedirect('/my-template/')  # Змініть URL на необхідний
        else:
            # Якщо дані не валідні, повернути помилку або вивести їх на сторінку
            return render(request, self.template_name, {'error': serializer.errors})

    # def post(self, request, *args, **kwargs):
    #     pk = request.POST.get('id')
    #
    #     if not pk:
    #         print('error')
    #         return HttpResponseRedirect('/my-template/')
    #
    #     try:
    #         instance = users.objects.get(pk=pk)
    #     except users.DoesNotExist:
    #         return HttpResponseRedirect('/my-template/')
    #
    #     # Отримати значення _method з POST-запиту
    #     method = request.POST.get('_method', '').lower()
    #
    #     if method == 'put':
    #         # Якщо метод - PUT, виконати оновлення
    #         serializer = usersSerializer(instance, data=request.POST, partial=True)
    #
    #         if serializer.is_valid():
    #             serializer.save()
    #             return HttpResponseRedirect('/my-template/')
    #         else:
    #             return render(request, self.template_name, {'error': serializer.errors})
    #     else:
    #         # Якщо інший метод (або жоден), перенаправити на сторінку
    #         return HttpResponseRedirect('/my-template/')

class MyTemplatePutView(View):
    template_name = 'myapp/put.html'

    def get(self, request, *args, **kwargs):
        # Отримати дані для відображення з бази даних
        users_data = users.objects.all()
        families_data = families.objects.all()
        family_budgets_data = family_budgets.objects.all()

        # Сформувати дані для передачі у шаблон
        context = {
            'users': usersSerializer(users_data, many=True).data,
            'families': familySerializer(families_data, many=True).data,
            'family_budgets': family_budgetSerializer(family_budgets_data, many=True).data,
        }

        # Відобразити HTML-шаблон з отриманими даними
        return render(request, self.template_name, context)


    def post(self, request, *args, **kwargs):
        pk = request.POST.get('id')

        if not pk:
            print('error')
            return HttpResponseRedirect('/my-template/')

        try:
            instance = users.objects.get(pk=pk)
        except users.DoesNotExist:
            return HttpResponseRedirect('/my-template/')

        # Отримати значення _method з POST-запиту
        method = request.POST.get('_method', '').lower()

        if method == 'put':
            # Якщо метод - PUT, виконати оновлення
            serializer = usersSerializer(instance, data=request.POST, partial=True)

            if serializer.is_valid():
                serializer.save()
                return HttpResponseRedirect('/my-template/')
            else:
                return render(request, self.template_name, {'error': serializer.errors})
        else:
            # Якщо інший метод (або жоден), перенаправити на сторінку
            return HttpResponseRedirect('/my-template/')

class FamilyView(View):
    template_name = 'myapp/family.html'

    def get(self, request, *args, **kwargs):
        # Отримати дані для відображення з бази даних
        families_data = families.objects.all()

        # Сформувати дані для передачі у шаблон
        context = {
            'families': familySerializer(families_data, many=True).data,
        }

        # Відобразити HTML-шаблон з отриманими даними
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        # Отримати дані з POST-запиту
        family_data = {
            'id': request.POST.get('id'),
            'name': request.POST.get('name'),
        }

        # Створити екземпляр серіалізатора
        serializer = familySerializer(data=family_data)

        # Перевірити валідність даних
        if serializer.is_valid():
            # Зберегти дані у базу даних
            serializer.save()

            # Після обробки POST-запиту перенаправити користувача на головну сторінку або виконати інші дії
            return HttpResponseRedirect('/family/')  # Змініть URL на необхідний
        else:
            # Якщо дані не валідні, повернути помилку або вивести їх на сторінку
            return render(request, self.template_name, {'error': serializer.errors})

class FamilyViewPut(View):
    template_name = 'myapp/familyPut.html'

    def get(self, request, *args, **kwargs):
        # Отримати дані для відображення з бази даних
        families_data = families.objects.all()

        # Сформувати дані для передачі у шаблон
        context = {
            'families': familySerializer(families_data, many=True).data,
        }

        # Відобразити HTML-шаблон з отриманими даними
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        pk = request.POST.get('id')

        if not pk:
            print('error')
            return HttpResponseRedirect('/family/')

        try:
            instance = families.objects.get(pk=pk)
        except families.DoesNotExist:
            return HttpResponseRedirect('/family/')

        # Отримати значення _method з POST-запиту
        method = request.POST.get('_method', '').lower()

        if method == 'put':
            # Якщо метод - PUT, виконати оновлення
            serializer = familySerializer(instance, data=request.POST, partial=True)

            if serializer.is_valid():
                serializer.save()
                return HttpResponseRedirect('/family/')
            else:
                return render(request, self.template_name, {'error': serializer.errors})
        else:
            # Якщо інший метод (або жоден), перенаправити на сторінку
            return HttpResponseRedirect('/family/')


class FamilyBudgetView(View):
    template_name = 'myapp/familyBudget.html'

    def get(self, request, *args, **kwargs):
        # Отримати дані для відображення з бази даних
        familiesBudget_data = family_budgets.objects.all()

        # Сформувати дані для передачі у шаблон
        context = {
            'familiesBudget': family_budgetSerializer(familiesBudget_data, many=True).data,
        }

        # Відобразити HTML-шаблон з отриманими даними
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        # Отримати дані з POST-запиту
        familyBudget_data = {
            'id': request.POST.get('id'),
            'familyId_id': request.POST.get('familyId_id'),
            'balance': request.POST.get('balance'),
        }

        # Створити екземпляр серіалізатора
        serializer = family_budgetSerializer(data=familyBudget_data)

        # Перевірити валідність даних
        if serializer.is_valid():
            print("error")
            # Зберегти дані у базу даних
            serializer.save()

            # Після обробки POST-запиту перенаправити користувача на головну сторінку або виконати інші дії
            return HttpResponseRedirect('/familyBudget/')  # Змініть URL на необхідний
        else:
            # Якщо дані не валідні, повернути помилку або вивести їх на сторінку
            return render(request, self.template_name, {'error': serializer.errors})

class FamilyBudgetViewPut(View):
    template_name = 'myapp/familyBudgetPut.html'

    def get(self, request, *args, **kwargs):
        # Отримати дані для відображення з бази даних
        familiesBudget_data = family_budgets.objects.all()

        # Сформувати дані для передачі у шаблон
        context = {
            'familiesBudget': family_budgetSerializer(familiesBudget_data, many=True).data,
        }

        # Відобразити HTML-шаблон з отриманими даними
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        pk = request.POST.get('id')

        if not pk:
            print('error')
            return HttpResponseRedirect('/familyBudget/')

        try:
            instance = family_budgets.objects.get(pk=pk)
        except family_budgets.DoesNotExist:
            return HttpResponseRedirect('/familyBudget/')

        # Отримати значення _method з POST-запиту
        method = request.POST.get('_method', '').lower()

        if method == 'put':
            # Якщо метод - PUT, виконати оновлення
            serializer = family_budgetSerializer(instance, data=request.POST, partial=True)

            if serializer.is_valid():
                serializer.save()
                return HttpResponseRedirect('/familyBudget/')
            else:
                return render(request, self.template_name, {'error': serializer.errors})
        else:
            # Якщо інший метод (або жоден), перенаправити на сторінку
            return HttpResponseRedirect('/familyBudget/')


class UserView(View):
    template_name = 'myapp/user.html'

    def get(self, request, *args, **kwargs):
        # Отримати дані для відображення з бази даних
        users_data = users.objects.all()

        # Сформувати дані для передачі у шаблон
        context = {
            'users': usersSerializer(users_data, many=True).data,
        }

        # Відобразити HTML-шаблон з отриманими даними
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        # Отримати дані з POST-запиту
        user_data = {
            'id': request.POST.get('id'),
            'username': request.POST.get('username'),
            'email': request.POST.get('email'),
            'password': request.POST.get('password'),
            'familyId_id': request.POST.get('familyId_id'),
            # Додайте інші поля з форми, якщо необхідно
        }

        # Створити екземпляр серіалізатора
        serializer = usersSerializer(data=user_data)

        # Перевірити валідність даних
        if serializer.is_valid():
            # Зберегти дані у базу даних
            serializer.save()

            # Після обробки POST-запиту перенаправити користувача на головну сторінку або виконати інші дії
            return HttpResponseRedirect('/user/')  # Змініть URL на необхідний
        else:
            # Якщо дані не валідні, повернути помилку або вивести їх на сторінку
            return render(request, self.template_name, {'error': serializer.errors})

class UserViewPut(View):
    template_name = 'myapp/userPut.html'

    def get(self, request, *args, **kwargs):
        # Отримати дані для відображення з бази даних
        users_data = users.objects.all()

        # Сформувати дані для передачі у шаблон
        context = {
            'users': usersSerializer(users_data, many=True).data,
        }

        # Відобразити HTML-шаблон з отриманими даними
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        pk = request.POST.get('id')

        if not pk:
            print('error')
            return HttpResponseRedirect('/user/')

        try:
            instance = users.objects.get(pk=pk)
        except users.DoesNotExist:
            return HttpResponseRedirect('/user/')

        # Отримати значення _method з POST-запиту
        method = request.POST.get('_method', '').lower()

        if method == 'put':
            # Якщо метод - PUT, виконати оновлення
            serializer = usersSerializer(instance, data=request.POST, partial=True)

            if serializer.is_valid():
                serializer.save()
                return HttpResponseRedirect('/user/')
            else:
                return render(request, self.template_name, {'error': serializer.errors})
        else:
            # Якщо інший метод (або жоден), перенаправити на сторінку
            return HttpResponseRedirect('/user/')

class HomeView(View):
    template_name = 'myapp/home.html'

    def get(self, request, *args, **kwargs):
        # Отримати дані для відображення з бази даних
        users_data = users.objects.all()
        families_data = families.objects.all()
        family_budgets_data = family_budgets.objects.all()

        # Сформувати дані для передачі у шаблон
        context = {
            'users': usersSerializer(users_data, many=True).data,
            'families': familySerializer(families_data, many=True).data,
            'family_budgets': family_budgetSerializer(family_budgets_data, many=True).data,
        }

        # Відобразити HTML-шаблон з отриманими даними
        return render(request, self.template_name, context)



def home(request):
    response = requests.get('http://127.0.0.1:8000/api/v1/usersList')
    data = response.json()
    return render(request, 'my_template.html', {'data': data})



# class basicAppAPIView(generics.ListAPIView):
#     queryset = users.objects.all()
#     serializer_class = usersSerializer