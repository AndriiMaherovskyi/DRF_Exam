import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';
import {AuthService} from "./auth.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})
export class AppComponent implements OnInit{
  title = 'family-budget';

  users: any[] = [];
  id: any;
  username:any;
  first_name: any;
  email: any;
  password: any;
  last_name: any;
  familyId_id: any;
  selectedUser: any;

  families: any[] = [];
  family_id: any;
  family_name: any;
  selectedFamily: any;

  budgets: any[] = [];
  budget_id: any;
  budget_familyId_id: any;
  budget: any;
  selectedBudget: any;
  currentBudget: any;
  userBalance: number = 2000;

  currentSection: string = 'personal-info';
  currentPart: string = 'login';

  selected_user_id: any;
  logginedUser: any;
  logginedFamily: any;
  logginedBudget: any;
  loggined_id: number = 0;
  loggined_password: any;
  loggined_transactions_income: { transaction: string; date: string }[] = [];
  loggined_transactions_outcome: { transaction: string; date: string }[] = [];
  loggined_transactions_income_family: { transaction: string; date: string; person: string }[] = [];
  loggined_transactions_outcome_family: { transaction: string; date: string; person: string }[] = [];
  loggined_transactions_total_family: { symbol: string; transaction: string; date: string; person: string }[] = [];
  transactions_income_sum: number = 300;
  transactions_outcome_sum: number = 200;
  transactions_income_sum_family: number = 600;
  transactions_outcome_sum_family: number = 100;


  auth_users: any[] = [];
  auth_users_family: { [key: number]: string } = {};

  toAdd: number = 0;
  toTake: number = 0;

  incomes: number[] = [];
  outcomes: number[] = [];

  transactions: any[] = [];
  transactions_quantity: number = 0;
  transaction_id: any;
  transaction_description: any;
  transaction_amount: any;
  transaction_familyId_id: any;
  transaction_memberId_id: any;
  transaction_isFamilyExpense: any;
  selectedTransaction: any;

  username_Login = '';
  password_Login = '';

  username_Register = '';
  firstName_Register = '';
  lastName_Register = '';
  email_Register = '';
  password_Register = '';
  familyId_id_Register = '';

  currentUser: any = null;

  constructor(private api:ApiService, private authService: AuthService, private router: Router) {
    //this.getObjects();
    this.getBudgets();
    this.getFamilies();
    this.selectedUser = { username: "", email: "", password: "", familyId_id: ""}
    this.selectedBudget = { familyId_id: ""}
    this.selectedFamily = { family_name: ""}
    this.logginedUser = {id: 0, username: "Ben", first_name: "Ben", email: "ben123@mail.com", password: "123", familyId_id: "1", last_name: "1"}
    this.logginedFamily = {id: 0, name: "Millers"}
    this.logginedBudget = {balance: 2000}
    this.selectedTransaction = {id: 0, description: "", amount: 0, familyId_id: "", memberId: "", isFamilyExpense: true, date: dateTimestampProvider}

    // const currentUserData = localStorage.getItem("currentUser");  // Отримує дані з Local Storage
    // if (currentUserData) {
    //   this.currentUser = JSON.parse(currentUserData);  // Перетворює рядок на об'єкт
    // }
  }

  ngOnInit() {
    //const ctx = document.getElementById('myChart');
    this.RenderChart()
    this.RenderChartFamily()
  }
  RenderChart(){
    var myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: [
          'Доходи',
          'Витрати',

        ],
        datasets: [{
          label: 'My First Dataset',
          data: [this.transactions_income_sum, this.transactions_outcome_sum],
          backgroundColor: [
            'rgb(235,193,54)',
            'rgb(58,49,49)'
          ],

        }]
      },
    });
  }

  RenderChartFamily(){
    var myChart = new Chart("familyChart", {
      type: 'doughnut',
      data: {
        labels: [
          'Доходи',
          'Витрати',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [this.transactions_income_sum_family, this.transactions_outcome_sum_family],
          backgroundColor: [
            'rgb(235,193,54)',
            'rgb(58,49,49)'
          ],
        }]
      },
    });
  }

  // getObjects = () => {
  //   this.api.getAllUsers().subscribe(
  //     data => {
  //       this.users = data["users"];
  //       console.log(data);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //
  //   )
  // }
  // userClicked = (user:any) => {
  //   console.log(user.id);
  //   this.api.getAllUsers().subscribe(
  //     data => {
  //       this.selectedUser = (data["users"])[user.id-1];
  //       console.log((data["users"])[user.id-1]);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //
  //   )
  // }
  // updateUser = () => {
  //   this.api.updateUser(this.selectedUser).subscribe(
  //     data => {
  //       this.selectedUser = data;
  //       console.log(data)
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  // createUser = () => {
  //   this.api.createUser(this.selectedUser).subscribe(
  //     data => {
  //       this.selectedUser = data;
  //       console.log(data)
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

  getFamilies= () => {
    this.api.getAllFamilies().subscribe(
      data => {
        this.families = data["families"];
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  // familyClicked = (family:any) => {
  //   console.log(family.id);
  //   this.api.getAllFamilies().subscribe(
  //     data => {
  //       this.selectedFamily = (data["families"])[family.id-1];
  //       console.log((data["families"])[family.id-1]);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  // updateFamily = () => {
  //   this.api.updateFamily(this.selectedFamily).subscribe(
  //     data => {
  //       this.selectedFamily = data;
  //       console.log(data)
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  createFamily = () => {
    this.api.createFamily(this.selectedFamily).subscribe(
      data => {
        this.selectedFamily = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }

  getBudgets = () => {
    this.api.getAllBudgets().subscribe(
      data => {
        this.budgets = data["budgets"]
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }
  // budgetClicked = (budget:any) => {
  //   console.log(budget.id);
  //   this.api.getAllBudgets().subscribe(
  //     data => {
  //       this.selectedBudget = (data["budgets"])[budget.id-1];
  //       console.log((data["budgets"])[budget.id-1]);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  // userBudget = () => {
  //   this.api.getAllBudgets().subscribe(
  //     data => {
  //       this.userBalance = ((data["budgets"])[4]).balance;
  //       console.log((data["budgets"])[4]);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  // updateBudget = () => {
  //   this.api.updateBudget(this.selectedBudget).subscribe(
  //     data => {
  //       this.selectedBudget = data;
  //       console.log(data)
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  // addToBudget = () => {
  //   this.api.getAllBudgets().subscribe(
  //     data => {
  //       this.userBalance = data["budgets"][4].balance;
  //       console.log(data["budgets"][4]);
  //
  //       // Оновлення балансу після отримання даних з сервера
  //       this.selectedBudget.balance = this.selectedBudget.balance + this.userBalance;
  //
  //       // Оновлення бюджету на сервері з новим балансом
  //       this.api.updateBudget(this.selectedBudget).subscribe(
  //         updatedBudget => {
  //           this.selectedBudget = updatedBudget;
  //           console.log(updatedBudget);
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  // takeFromBudget = () => {
  //   this.api.getAllBudgets().subscribe(
  //     data => {
  //       this.userBalance = data["budgets"][4].balance;
  //       console.log(data["budgets"][4]);
  //
  //       // Оновлення балансу після отримання даних з сервера
  //       this.selectedBudget.balance = this.userBalance - this.selectedBudget.balance;
  //
  //       // Оновлення бюджету на сервері з новим балансом
  //       this.api.updateBudget(this.selectedBudget).subscribe(
  //         updatedBudget => {
  //           this.selectedBudget = updatedBudget;
  //           console.log(updatedBudget);
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  createBudget = () => {
    this.api.createBudget(this.selectedBudget).subscribe(
      data => {
        this.selectedBudget = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }

  showSection(sectionId: string) {
    this.currentSection = sectionId;
  }
  showPart(partId: string) {
    this.currentPart = partId;
  }

  setDataIntoTransaction (amount: any) {
    this.selectedTransaction.id = this.transactions_quantity + 1
    this.selectedTransaction.description = "sth"
    this.selectedTransaction.amount = amount
    this.selectedTransaction.familyId_id = this.logginedFamily.id
    // this.selectedTransaction.memberId_id = this.loggined_id
    this.selectedTransaction.memberId = this.logginedUser.id
    this.selectedTransaction.isFamilyExpense = true
  }
  setDataIntoTransaction_outcome (amount: any) {
    this.selectedTransaction.id = this.transactions_quantity + 1
    this.selectedTransaction.description = "sth"
    this.selectedTransaction.amount = amount
    this.selectedTransaction.familyId_id = this.logginedFamily.id
    // this.selectedTransaction.memberId_id = this.loggined_id
    this.selectedTransaction.memberId = this.logginedUser.id
    this.selectedTransaction.isFamilyExpense = false
  }

  // chooseUser(selected_user_id: number) {
  //   console.log(selected_user_id)
  //   this.selected_user_id = selected_user_id
  //   this.api.getAllUsers().subscribe(
  //     data => {
  //
  //       this.logginedUser = (data["users"])[selected_user_id-1];
  //       console.log((data["users"])[selected_user_id-1]);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  //   this.api.getAllFamilies().subscribe(
  //     data => {
  //       this.logginedFamily = (data["families"])[this.logginedUser.familyId_id-1];
  //       console.log((data["families"])[this.logginedUser.familyId_id-1]);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  //   this.api.getAllBudgets().subscribe(
  //     data => {
  //       this.logginedBudget = (data["budgets"])[this.logginedUser.familyId_id-1];
  //       this.userBalance = ((data["budgets"])[this.logginedUser.familyId_id-1]).balance;
  //       console.log((data["budgets"])[this.logginedUser.familyId_id-1]);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  //   this.api.getAllTransactions().subscribe(
  //     data => {
  //       this.transactions = data["transactions"];
  //       console.log(data);
  //       this.transactions_quantity = this.transactions.length;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  //   this.loggined_transactions_income = [];
  //   this.loggined_transactions_outcome = [];
  //   for (let i = 0; i < this.transactions.length; i++){
  //     console.log(this.transactions[i].isFamilyExpense)
  //     if (this.transactions[i].isFamilyExpense == true) {
  //       this.loggined_transactions_income.push(this.transactions[i].amount)
  //     }
  //     else {
  //       this.loggined_transactions_outcome.push(this.transactions[i].amount)
  //     }
  //   }
  //
  // }

  chooseLoginedUser() {

    this.api.getAllFamilies().subscribe(
      data => {
        this.logginedFamily = (data["families"])[this.logginedUser.last_name-1];
        console.log((data["families"])[this.logginedUser.last_name-1]);
      },
      error => {
        console.log(error);
      }
    )
    this.api.getAllBudgets().subscribe(
      data => {
        this.logginedBudget = (data["budgets"])[this.logginedUser.last_name-1];
        this.userBalance = ((data["budgets"])[this.logginedUser.last_name-1]).balance;
        console.log((data["budgets"])[this.logginedUser.last_name-1]);
      },
      error => {
        console.log(error);
      }
    )
    this.api.getAllAuthUser().subscribe(
      data => {
        this.auth_users = data["users"];
        console.log(data["users"])
        this.auth_users_family = {};
        for (let i = 0; i < this.auth_users.length; i++){
          if (this.auth_users[i].last_name == this.logginedUser.last_name) {
            this.auth_users_family[this.auth_users[i].id] = this.auth_users[i].first_name
            console.log("condition work!")
          }
        }
        console.log(this.auth_users_family)
      },
      error => {
        console.log(error)
      }
    )
    this.api.getAllTransactions().subscribe(
      data => {
        this.transactions = data["transactions"];
        console.log(data);
        this.transactions_quantity = this.transactions.length;
        this.loggined_transactions_income = [];
        this.loggined_transactions_outcome = [];
        this.loggined_transactions_income_family = [];
        this.loggined_transactions_outcome_family = [];
        this.loggined_transactions_total_family = [];
        this.transactions_income_sum = 0;
        this.transactions_outcome_sum = 0;
        this.transactions_income_sum_family = 0;
        this.transactions_outcome_sum_family = 0;
        for (let i = 0; i < this.transactions.length; i++){
          console.log(this.transactions[i].isFamilyExpense)
          if (this.transactions[i].isFamilyExpense == true && this.transactions[i].memberId == this.logginedUser.id) {
            this.loggined_transactions_income.push({
              transaction: this.transactions[i].amount,
              date: this.transactions[i].date,
            })
            this.loggined_transactions_income_family.push({
              transaction: this.transactions[i].amount,
              date: this.transactions[i].date,
              person: this.auth_users_family[this.transactions[i].memberId]
            })
            this.loggined_transactions_total_family.push({
              symbol: "+",
              transaction: this.transactions[i].amount,
              date: this.transactions[i].date,
              person: this.auth_users_family[this.transactions[i].memberId]
            })
            this.transactions_income_sum += this.transactions[i].amount
            this.transactions_income_sum_family += this.transactions[i].amount
          }
          else if (this.transactions[i].isFamilyExpense == true && this.transactions[i].familyId_id == this.logginedUser.last_name && this.transactions[i].memberId != this.logginedUser.id) {
            this.loggined_transactions_income_family.push({
              transaction: this.transactions[i].amount,
              date: this.transactions[i].date,
              person: this.auth_users_family[this.transactions[i].memberId]
            })
            this.loggined_transactions_total_family.push({
              symbol: "+",
              transaction: this.transactions[i].amount,
              date: this.transactions[i].date,
              person: this.auth_users_family[this.transactions[i].memberId]
            })
            this.transactions_income_sum_family += this.transactions[i].amount
          }
          else if (this.transactions[i].isFamilyExpense == false && this.transactions[i].memberId == this.logginedUser.id) {
            this.loggined_transactions_outcome.push({
              transaction: this.transactions[i].amount,
              date: this.transactions[i].date,
            })
            this.loggined_transactions_outcome_family.push({
              transaction: this.transactions[i].amount,
              date: this.transactions[i].date,
              person: this.auth_users_family[this.transactions[i].memberId]
            })
            this.loggined_transactions_total_family.push({
              symbol: "-",
              transaction: this.transactions[i].amount,
              date: this.transactions[i].date,
              person: this.auth_users_family[this.transactions[i].memberId]
            })
            this.transactions_outcome_sum += this.transactions[i].amount
            this.transactions_outcome_sum_family += this.transactions[i].amount
         }
          else if (this.transactions[i].isFamilyExpense == false &&  this.transactions[i].familyId_id == this.logginedUser.last_name && this.transactions[i].memberId != this.logginedUser.id) {
            this.loggined_transactions_outcome_family.push({
              transaction: this.transactions[i].amount,
              date: this.transactions[i].date,
              person: this.auth_users_family[this.transactions[i].memberId]
            })
            this.loggined_transactions_total_family.push({
              symbol: "-",
              transaction: this.transactions[i].amount,
              date: this.transactions[i].date,
              person: this.auth_users_family[this.transactions[i].memberId]
            })
            this.transactions_outcome_sum_family += this.transactions[i].amount
         }
        }
        console.log(this.loggined_transactions_income)
        console.log(this.loggined_transactions_outcome)
        console.log(this.loggined_transactions_income_family)
        console.log(this.loggined_transactions_outcome_family)
        console.log(this.transactions_income_sum)
        console.log(this.transactions_outcome_sum)
      },
      error => {
        console.log(error);
      }
    )
    this.RenderChart()
    this.RenderChartFamily()
  }

  addToLogginedBudget = () => {
    this.api.getAllBudgets().subscribe(
      data => {
        this.userBalance = data["budgets"][this.logginedFamily.id-1].balance;
        console.log(data["budgets"][this.logginedFamily.id-1]);

        // Оновлення балансу після отримання даних з сервера
        this.logginedBudget.balance = this.toAdd + this.userBalance;
        // Оновлення бюджету на сервері з новим балансом
        this.api.updateBudget(this.logginedBudget).subscribe(
          updatedBudget => {
            this.logginedBudget.balance = updatedBudget.balance;
            console.log(updatedBudget);
          },
          error => {
            console.log(error);
          }
        );

        this.setDataIntoTransaction(this.toAdd)
        console.log(this.selectedTransaction)
        this.api.createTransaction(this.selectedTransaction).subscribe(
          data => {
            this.selectedTransaction = data;
            console.log(data)
            this.transactions_quantity += 1
          },
          error => {
            console.log(error);
          }
        );

      },
      error => {
        console.log(error);
      }
    );
    this.api.getAllTransactions().subscribe(
          data => {
            this.transactions = data["transactions"];
            console.log(data);
          },
          error => {
            console.log(error);
          }
        )
    console.log(this.transactions.length)
    //this.addNewIncome();
    this.userBalance = this.toAdd + this.userBalance;
    //this.consoleLog(this.userBalance)
    this.RenderChart()
    this.RenderChartFamily()
  }
  takeFromLogginedBudget = () => {
    this.api.getAllBudgets().subscribe(
      data => {
        this.userBalance = data["budgets"][this.logginedFamily.id-1].balance;
        console.log(data["budgets"][this.logginedFamily.id-1]);

        // Оновлення балансу після отримання даних з сервера
        this.logginedBudget.balance = this.userBalance - this.toTake;

        // Оновлення бюджету на сервері з новим балансом
        this.api.updateBudget(this.logginedBudget).subscribe(
          updatedBudget => {
            this.logginedBudget.balance = updatedBudget.balance;
            console.log(updatedBudget);
          },
          error => {
            console.log(error);
          }
        );

        this.setDataIntoTransaction_outcome(this.toTake)
        console.log(this.selectedTransaction)
        this.api.createTransaction(this.selectedTransaction).subscribe(
          data => {
            this.selectedTransaction = data;
            console.log(data)
            this.transactions_quantity += 1
          },
          error => {
            console.log(error);
          }
        );

      },
      error => {
        console.log(error);
      }
    );
    this.api.getAllTransactions().subscribe(
          data => {
            this.transactions = data["transactions"];
            console.log(data);
          },
          error => {
            console.log(error);
          }
        )
    //this.addNewOutcome()
    this.userBalance = this.userBalance - this.toTake;
    //this.consoleLog(this.userBalance)
    this.RenderChart()
    this.RenderChartFamily()
  }
  addNewIncome() {
    this.incomes.push(this.toAdd);
  }
  addNewOutcome() {
    this.outcomes.push(this.toTake);
  }
  consoleLog(budget: any) {
    console.log(budget)
  }

  getTransactions = () => {
    this.api.getAllTransactions().subscribe(
      data => {
        this.transactions = data["transactions"];
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
  createTransaction = () => {
    this.api.createTransaction(this.selectedTransaction).subscribe(
      data => {
        this.selectedTransaction = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }
/////////////////////////////

  // onLogin() {
  //   const credentials = {
  //     username: this.username_Login,
  //     password: this.password_Login,
  //   };
  //
  //   this.authService.login(credentials).subscribe(
  //     () => {
  //       console.log('Login successful');
  //       // Можна зберегти статус логування чи перенаправити користувача
  //       this.router.navigate(['/']);  // Перенаправлення після логування
  //     },
  //     (error) => {
  //       console.error('Login error:', error);
  //     }
  //   );
  // }

  onLogin() {
    const credentials = { username: this.username_Login, password: this.password_Login };
    this.authService.login(credentials).subscribe(
      (user) => {
        if (user) {
          this.logginedUser = user
          console.log("User data received:", user);  // Друкуємо дані користувача
          // Збережіть у стані чи локальному сховищі
          // Наприклад, localStorage.setItem("currentUser", JSON.stringify(user));
          //localStorage.setItem("currentUser", JSON.stringify(user.user));  // Збереження об'єкта у вигляді рядка
          // Після логування перенаправлення на іншу сторінку
        }
      },
      (error) => {
        console.error("Login error:", error);
      }
    );
  }

  onLogout() {
    this.authService.logout()
  }

  onRegister() {
    const userData = {
      //id: 18,
      username: this.username_Register,
      first_name: this.firstName_Register,
      last_name: this.logginedUser.last_name,
      email: this.email_Register,
      password: this.password_Register,
      //familyId: this.familyId_id_Register,
    };
    console.log(userData)
    this.authService.register(userData).subscribe(
      () => {
        console.log('User registered successfully');
        //this.router.navigate(['/login']);  // Перенаправлення на логування
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }

}
