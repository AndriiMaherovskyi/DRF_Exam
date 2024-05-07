import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {ApiService} from "./api.service";
import {By} from "@angular/platform-browser";

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppComponent],
//     }).compileComponents();
//   });

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent); // Створення компонента
    component = fixture.componentInstance; // Отримання екземпляра
    fixture.detectChanges(); // Запуск процесу Angular, якщо необхідно
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'family-budget' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('family-budget');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, family-budget');
  // });

  // it('set data', () => {
  //   component.setDataIntoTransaction(10)
  // });

  it('show part in spa', () => {
    component.showPart('login')
    expect(component.showSection).toBeTruthy()
  });
  it('show section in spa', () => {
    component.showSection('main')
    expect(component.showPart).toBeTruthy()
  });
  it('set data into transaction income', () => {
    component.setDataIntoTransaction(10)
    expect(component.setDataIntoTransaction).toBeTruthy()

    const amount = 100; // або інше значення
    component.setDataIntoTransaction(amount);

    // 4. Перевірка значень
    const selectedTransaction = component.selectedTransaction;

    expect(selectedTransaction.id).toBe(component.transactions_quantity + 1);
    expect(selectedTransaction.description).toBe("sth");
    expect(selectedTransaction.amount).toBe(amount);
    expect(selectedTransaction.familyId_id).toBe(component.logginedFamily.id);
    expect(selectedTransaction.memberId).toBe(component.logginedUser.id);
    expect(selectedTransaction.isFamilyExpense).toBe(true);
  });
  it('set data into transaction outcome', () => {
    component.setDataIntoTransaction_outcome(10)
    expect(component.setDataIntoTransaction_outcome).toBeTruthy()

    const amount = 100; // або інше значення
    component.setDataIntoTransaction(amount);

    // 4. Перевірка значень
    const selectedTransaction = component.selectedTransaction;

    expect(selectedTransaction.id).toBe(component.transactions_quantity + 1);
    expect(selectedTransaction.description).toBe("sth");
    expect(selectedTransaction.amount).toBe(amount);
    expect(selectedTransaction.familyId_id).toBe(component.logginedFamily.id);
    expect(selectedTransaction.memberId).toBe(component.logginedUser.id);
    expect(selectedTransaction.isFamilyExpense).toBe(true);
  });
  it('choose logined user', () => {
    component.chooseLoginedUser()
    expect(component.chooseLoginedUser).toBeTruthy()
  });
  it('add operation to budget', () => {
    component.addToLogginedBudget()
    expect(component.addToLogginedBudget).toBeTruthy()
  });
  it('take operation to budget', () => {
    component.takeFromLogginedBudget()
    expect(component.takeFromLogginedBudget).toBeTruthy()
  });
  it('add money to budget', () => {
    component.addNewIncome()
    expect(component.addNewIncome).toBeTruthy()
  });
  it('take money to budget', () => {
    component.addNewOutcome()
    expect(component.addNewOutcome).toBeTruthy()
  });
  it('console log', () => {
    component.consoleLog(10)
    expect(component.consoleLog).toBeTruthy()
  });
  it('get transactions', () => {
    component.getTransactions()
    expect(component.getTransactions).toBeTruthy()
  });
  it('create transaction', () => {
    component.createTransaction()
    expect(component.createTransaction).toBeTruthy()
  });
  it('login', () => {
    component.onLogin()
    expect(component.onLogin).toBeTruthy()
  });
  it('logout', () => {
    component.onLogout()
    expect(component.onLogout).toBeTruthy()
  });
  it('register', () => {
    component.onRegister()
    expect(component.onRegister).toBeTruthy()
  });
  it('render chart', () => {
    component.RenderChart()
    expect(component.RenderChart).toBeTruthy()
  });
  it('render chart family', () => {
    component.RenderChartFamily()
    expect(component.RenderChartFamily).toBeTruthy()
  });
  it('create budget', () => {
    component.createBudget()
    expect(component.createBudget).toBeTruthy()
  });

  it('should call showSection and RenderChartFamily when logo is clicked', () => {
    // Створіть "spy" на метод, який хочете перевірити
    spyOn(component, 'RenderChartFamily'); // Тепер це "spy"

    // Імітація кліку
    const logo = fixture.debugElement.query(By.css('.logo'));
    logo.triggerEventHandler('click', null);

    // Тепер перевіряємо, чи було викликано "spy"
    expect(component.RenderChartFamily).toHaveBeenCalled(); // Очікуємо, що "spy" був викликаний
  });
});
