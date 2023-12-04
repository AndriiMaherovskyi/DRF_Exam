from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import families, users, family_budgets


class BasicAppAPIViewUsersTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('user_list')

    def test_get_users(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_user(self):
        family = families.objects.create(id=1, name="Test Family")
        data = {'id': 1, 'username': 'Test User', 'email': 'mail@mail.com', 'password':'123', 'familyId_id': family.id}
        print(f"Data before post: {data}")  # Додайте цей рядок
        response = self.client.post(self.url, data, format='json')
        print(response.content)  # Додайте цей рядок
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_put_user(self):
        # Спочатку створіть сім'ю
        family = families.objects.create(id=1, name="Test Family")

        # Потім створіть користувача
        user = users.objects.create(id=1, username="Test User", email="mail@mail.com", password="123", familyId=family)

        put_url = reverse('user_list_detail', kwargs={'pk': user.id})

        # Оновіть дані користувача і використайте family.id як значення familyId_id
        updated_data = {'id': 1, 'username': 'Updated User', 'email': 'updated@mail.com', 'password': '456',
                        'familyId_id': family.id}
        response = self.client.put(put_url, updated_data, format='json')
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)



class BasicAppAPIViewFamiliesTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('family_list')

    def test_get_families(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_family(self):
        data = {'id': 1, 'name': 'Test Family'}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_put_family(self):
        # Спочатку створіть сім'ю
        create_response = self.client.post(self.url, {'id': 1, 'name': 'Test Family'}, format='json')
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)

        family_id = create_response.data['post family']['id']
        put_url = reverse('family_list_detail', kwargs={'pk': family_id})

        updated_data = {'id': 1, 'name': 'Test Family'}
        response = self.client.put(put_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)



class BasicAppAPIViewFamilyBudgetsTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = reverse('budget_list')

    def test_get_family_budgets(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_family_budget(self):
        family = families.objects.create(id=1, name="Test Family")
        # Створення тестового об'єкта для POST-запиту
        data = {'id': 1, 'familyId_id': family.id, 'balance': 1000}
        print(f"Data before post: {data}")  # Додайте цей рядок
        response = self.client.post(self.url, data, format='json')
        print(response.content)  # Додайте цей рядок
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, f"Response content: {response.content}")

    def test_put_family_budget(self):
        family = families.objects.create(id=1, name="Test Family")
        # Створення об'єкта family_budgets для тестування
        family_budget = family_budgets.objects.create(id=1, familyId_id=family.id, balance=1000)

        put_url = reverse('budget_list_detail', kwargs={'pk': family_budget.id})
        # Створення тестового об'єкта для PUT-запиту
        updated_data = {'id': 1, 'familyId_id': family.id, 'balance': 2000}

        response = self.client.put(put_url, updated_data, format='json')
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

