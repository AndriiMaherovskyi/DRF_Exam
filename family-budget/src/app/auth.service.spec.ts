import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user', () => {
    service.login({ username: "Ned", password: "p123456789" }).subscribe((user: any) => {
      expect(user).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/login/')
    expect(request.request.method).toEqual('POST');
  });

  it('should register user', () => {
    service.register({ username: "Ned", password: "p123456789" }).subscribe((user: any) => {
      expect(user).toBeTruthy();
    });
    const request = testingController.expectOne('http://127.0.0.1:8000/register/')
    expect(request.request.method).toEqual('POST');
  });

  it('should logout user', () => {
    service.logout()

  });
});
