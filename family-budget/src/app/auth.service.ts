// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/';  // Базовий URL вашого Django-сервера

  constructor(private http: HttpClient) {}

  // Реєстрація користувача
  register(userData: any): Observable<any> {
    return this.http.post(this.baseUrl + 'register/', userData).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // Логування користувача
  // login(credentials: any): Observable<any> {
  //   return this.http.post(this.baseUrl + 'login/', credentials).pipe(
  //     catchError((error) => {
  //       console.error(error);
  //       throw error;
  //     })
  //   );
  // }
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(this.baseUrl + 'login/', data).pipe(
      map((response: any) => {
        // Відповідь від сервера з даними користувача
        if (response && response.user) {
          console.log("Login successful:", response.user);  // Друкуємо дані користувача
          // Збережіть дані користувача в локальному сховищі або змінному стані
          return response.user;
        }
        return null;
      }),
      catchError((error) => {
        console.error("Login error:", error);
        throw error;
      })
    );
  }
  logout() {
    localStorage.removeItem("currentUser");  // Видалення даних з Local Storage
    console.log("logout work")
  }
}
