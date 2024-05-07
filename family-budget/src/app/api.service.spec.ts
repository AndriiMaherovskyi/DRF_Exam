import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { ApiService } from './api.service';
import {transition} from "@angular/animations";
import any = jasmine.any;

describe('ApiService', () => {
  let service: ApiService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all families', () => {
    service.getAllFamilies().subscribe((families: any) => {
      expect(families).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/dataFamily/')
    expect(request.request.method).toEqual('GET');
  });

  it('should create a family', () => {
    service.createFamily({id: 10, name: "Parker"}).subscribe((family: any) => {
      expect(family).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/dataFamily/create/')
    expect(request.request.method).toEqual('POST');
  });

  it('should update a family', () => {
    const id = 1;
    service.updateFamily({id: id, name: "Parker"}).subscribe((family: any) => {
      expect(family).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/dataFamily/update/' + id + '/')
    expect(request.request.method).toEqual('PUT');
  });

  it('should get all budgets', () => {
    service.getAllBudgets().subscribe((budgets: any) => {
      expect(budgets).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/dataBudget/')
    expect(request.request.method).toEqual('GET');
  });

  it('should create new budget', () => {
    service.createBudget({id: 10, balance: 500, familyId_id: 1}).subscribe((budget: any) => {
      expect(budget).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/dataBudget/create/')
    expect(request.request.method).toEqual('POST');
  });

  it('should update exist budget', () => {
    const id = 7;
    service.updateBudget({id: id, balance: 500, familyId_id: 1}).subscribe((budget: any) => {
      expect(budget).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/dataBudget/update/' + id +'/')
    expect(request.request.method).toEqual('PUT');
  });

  it('should get all authUsers', () => {
    service.getAllAuthUser().subscribe((users: any) => {
      expect(users).toBeTruthy();
      expect(users.length).toEqual(13);
      const secondUser = users.find((users: any) => users.id === 2);
      expect(secondUser.first_name).toBe('Ben');
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/dataUser/')
    expect(request.request.method).toEqual('GET');
  });

  it('should get all transactions', () => {
    service.getAllTransactions().subscribe((transactions: any) => {
      expect(transactions).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/dataTransaction/')
    expect(request.request.method).toEqual('GET');
  });

  it('should create transactions', () => {
    service.createTransaction({id: 34, description: 'sth', amount: 10, familyId_id: 1, memberId: 1, isFamilyExpense: 1}).subscribe((transaction: any) => {
      expect(transaction).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/dataTransaction/create/')
    expect(request.request.method).toEqual('POST');
  });




  it('should get all users', () => {
    service.getAllUsers().subscribe((users: any) => {
      expect(users).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/data/')
    expect(request.request.method).toEqual('GET');
  });

  it('should create a user', () => {
    service.createUser({id: 10, name: "Parker"}).subscribe((user: any) => {
      expect(user).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/data/create/')
    expect(request.request.method).toEqual('POST');
  });

  it('should update a user', () => {
    const id = 1;
    service.updateUser({id: id, name: "Parker"}).subscribe((user: any) => {
      expect(user).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/api/data/update/' + id + '/')
    expect(request.request.method).toEqual('PUT');
  });

});
