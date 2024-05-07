import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get(this.baseurl + '/api/data/', {headers: this.httpHeaders});
  }
  updateUser(user:any): Observable<any> {
    const body = {id: user.id, username: user.username, email: user.email, password: user.password, familyId_id: user.familyId_id};
    return this.http.put(this.baseurl + '/api/data/update/' + user.id + '/', body, {headers: this.httpHeaders})
  }
  createUser(user:any): Observable<any> {
    const body = {id: user.id, username: user.username, email: user.email, password: user.password, familyId_id: user.familyId_id};
    return this.http.post(this.baseurl + '/api/data/create/', body, {headers: this.httpHeaders})
  }

  getAllFamilies(): Observable<any>{
    return this.http.get(this.baseurl + '/api/dataFamily/', {headers: this.httpHeaders});
  }
  updateFamily(family:any): Observable<any> {
    const body = {id: family.id, name: family.name};
    return this.http.put(this.baseurl + '/api/dataFamily/update/' + family.id + '/', body, {headers: this.httpHeaders})
  }
  createFamily(family:any): Observable<any> {
    const body = {id: family.id, name: family.name};
    return this.http.post(this.baseurl + '/api/dataFamily/create/', body, {headers: this.httpHeaders})
  }

  getAllBudgets(): Observable<any>{
    return this.http.get(this.baseurl + '/api/dataBudget/', {headers: this.httpHeaders});
  }
  updateBudget(budget:any): Observable<any> {
    const body = {id: budget.id, balance: budget.balance, familyId_id: budget.familyId_id};
    return this.http.put(this.baseurl + '/api/dataBudget/update/' + budget.id + '/', body, {headers: this.httpHeaders})
  }
  createBudget(budget:any): Observable<any> {
    const body = {id: budget.id, balance: budget.balance, familyId_id: budget.familyId_id};
    return this.http.post(this.baseurl + '/api/dataBudget/create/', body, {headers: this.httpHeaders})
  }

  getAllTransactions(): Observable<any>{
    return this.http.get(this.baseurl + '/api/dataTransaction/', {headers: this.httpHeaders});
  }
  createTransaction(transaction:any): Observable<any> {
    const body = {id: transaction.id, description: transaction.description, amount: transaction.amount, familyId_id: transaction.familyId_id, memberId: transaction.memberId, isFamilyExpense: transaction.isFamilyExpense};
    return this.http.post(this.baseurl + '/api/dataTransaction/create/', body, {headers: this.httpHeaders})
  }

  getAllAuthUser(): Observable<any>{
    return this.http.get(this.baseurl + '/api/dataUser/', {headers: this.httpHeaders});
  }
}
