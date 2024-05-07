from django.contrib.auth import authenticate
from django.forms import model_to_dict
from django.http import HttpResponseRedirect
from rest_framework import generics, viewsets, status
import requests
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView, View
from django.http import JsonResponse

from .models import users, families, family_budgets, transactions
from .serializers import usersSerializer, familySerializer, family_budgetSerializer, transactionSerializer, \
    UserSerializer, CustomUserSerializer

from django.contrib.auth.models import User


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

class BasicAppAPIView(APIView):
    def get(self, request):
        user = users.objects.all()
        serializer = usersSerializer(user, many=True)
        return JsonResponse({'users': serializer.data})

    def post(self, request):
        serializer = usersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            instance = users.objects.get(pk=pk)
        except users.DoesNotExist:
            return Response({"error": "Object doesn't exist"}, status=status.HTTP_404_NOT_FOUND)

        serializer = usersSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_data(request):
    api_response = BasicAppAPIView.as_view()(request)
    return api_response

def index(request):
    return render(request, 'Lab_2_AJAX/index.html')

class BasicAppAPIViewFamily(APIView):
    def get(self, request):
        family = families.objects.all()
        serializer = familySerializer(family, many=True)
        return JsonResponse({'families': serializer.data})

    def post(self, request):
        serializer = familySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Family created successfully'}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            instance = families.objects.get(pk=pk)
        except families.DoesNotExist:
            return Response({"error": "Object doesn't exist"}, status=status.HTTP_404_NOT_FOUND)

        serializer = familySerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_data_family(request):
    api_response = BasicAppAPIViewFamily.as_view()(request)
    return api_response

def index_family(request):
    return render(request, 'Lab_2_AJAX/index_family.html')

class BasicAppAPIViewBudget(APIView):
    def get(self, request):
        budget = family_budgets.objects.all()
        serializer = family_budgetSerializer(budget, many=True)
        return JsonResponse({'budgets': serializer.data})

    def post(self, request):
        serializer = family_budgetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Budget created successfully'}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            instance = family_budgets.objects.get(pk=pk)
        except family_budgets.DoesNotExist:
            return Response({"error": "Object doesn't exist"}, status=status.HTTP_404_NOT_FOUND)

        serializer = family_budgetSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_data_budget(request):
    api_response = BasicAppAPIViewBudget.as_view()(request)
    return api_response

def index_budget(request):
    return render(request, 'Lab_2_AJAX/index_budget.html')

class BasicAppAPIViewTransaction(APIView):
    def get(self, request):
        transaction = transactions.objects.all()
        serializer = transactionSerializer(transaction, many=True)
        return JsonResponse({'transactions': serializer.data})

    def post(self, request):
        serializer = transactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Transaction created successfully'}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_data_transaction(request):
    api_response = BasicAppAPIViewTransaction.as_view()(request)
    return api_response

def landing_budget(request):
    return render(request, 'Lab_2_AJAX/landing_page.html')

def login(request):
    return render(request, 'Lab_2_AJAX/login_page.html')


# Клас API для отримання списку всіх користувачів
class BasicAppAPIViewUser(APIView):
    def get(self, request):
        users = User.objects.all()  # Використовуємо змінну з маленької літери, щоб уникнути конфлікту імен
        serializer = UserSerializer(users, many=True)  # Передбачається, що UserSerializer створений
        return Response({'users': serializer.data})  # Використовуємо Response від DRF

# Функція для отримання даних через API
def get_data_User(request):
    api_view = BasicAppAPIViewUser.as_view()  # Отримуємо обробник APIView
    api_response = api_view(request)  # Викликаємо API з переданим запитом
    return api_response

# class RegisterUser(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterUser(APIView):
    def post(self, request):
        # Створення базового користувача
        user_serializer = UserSerializer(data=request.data)

        # Якщо базовий користувач валідний
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({"message": "User and CustomUser created successfully"}, status=status.HTTP_201_CREATED)

        # Якщо є помилка у базовому користувачі
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUser(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            # Включаємо дані користувача у відповідь
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
            return Response(
                {"message": "Login successful", "user": user_data},
                status=status.HTTP_200_OK
            )

        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_400_BAD_REQUEST
        )