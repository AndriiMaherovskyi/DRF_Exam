import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';

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
export class AppComponent {

  users: any[] = [];
  id: any;
  username:any;
  email: any;
  password: any;
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

  currentSection: string = 'income-expense-section';
  currentPart: string = 'landing';

  selected_user_id: any;
  logginedUser: any;
  logginedFamily: any;
  logginedBudget: any;
  loggined_id: number = 0;
  loggined_password: any;

  toAdd: number = 0;
  toTake: number = 0;

  incomes: number[] = [];
  outcomes: number[] = [];


  constructor(private api:ApiService) {
    this.getObjects();
    this.getBudgets();
    this.getFamilies();
    this.selectedUser = { username: "", email: "", password: "", familyId_id: ""}
    this.selectedBudget = { familyId_id: ""}
    this.selectedFamily = { family_name: ""}
    this.logginedUser = {id: 0, username: "Ben", email: "ben123@mail.com", password: "123", familyId_id: "1"}
    this.logginedFamily = {id: 0, name: "Millers"}
    this.logginedBudget = {balance: 2000}
  }
  getObjects = () => {
    this.api.getAllUsers().subscribe(
      data => {
        this.users = data["users"];
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }
  userClicked = (user:any) => {
    console.log(user.id);
    this.api.getAllUsers().subscribe(
      data => {
        this.selectedUser = (data["users"])[user.id-1];
        console.log((data["users"])[user.id-1]);
      },
      error => {
        console.log(error);
      }

    )
  }
  updateUser = () => {
    this.api.updateUser(this.selectedUser).subscribe(
      data => {
        this.selectedUser = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }
  createUser = () => {
    this.api.createUser(this.selectedUser).subscribe(
      data => {
        this.selectedUser = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }

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
  familyClicked = (family:any) => {
    console.log(family.id);
    this.api.getAllFamilies().subscribe(
      data => {
        this.selectedFamily = (data["families"])[family.id-1];
        console.log((data["families"])[family.id-1]);
      },
      error => {
        console.log(error);
      }
    )
  }
  updateFamily = () => {
    this.api.updateFamily(this.selectedFamily).subscribe(
      data => {
        this.selectedFamily = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }
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
  budgetClicked = (budget:any) => {
    console.log(budget.id);
    this.api.getAllBudgets().subscribe(
      data => {
        this.selectedBudget = (data["budgets"])[budget.id-1];
        console.log((data["budgets"])[budget.id-1]);
      },
      error => {
        console.log(error);
      }
    )
  }
  userBudget = () => {
    this.api.getAllBudgets().subscribe(
      data => {
        this.userBalance = ((data["budgets"])[4]).balance;
        console.log((data["budgets"])[4]);
      },
      error => {
        console.log(error);
      }
    )
  }
  updateBudget = () => {
    this.api.updateBudget(this.selectedBudget).subscribe(
      data => {
        this.selectedBudget = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }
  addToBudget = () => {
    this.api.getAllBudgets().subscribe(
      data => {
        this.userBalance = data["budgets"][4].balance;
        console.log(data["budgets"][4]);

        // Оновлення балансу після отримання даних з сервера
        this.selectedBudget.balance = this.selectedBudget.balance + this.userBalance;

        // Оновлення бюджету на сервері з новим балансом
        this.api.updateBudget(this.selectedBudget).subscribe(
          updatedBudget => {
            this.selectedBudget = updatedBudget;
            console.log(updatedBudget);
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
  }
  takeFromBudget = () => {
    this.api.getAllBudgets().subscribe(
      data => {
        this.userBalance = data["budgets"][4].balance;
        console.log(data["budgets"][4]);

        // Оновлення балансу після отримання даних з сервера
        this.selectedBudget.balance = this.userBalance - this.selectedBudget.balance;

        // Оновлення бюджету на сервері з новим балансом
        this.api.updateBudget(this.selectedBudget).subscribe(
          updatedBudget => {
            this.selectedBudget = updatedBudget;
            console.log(updatedBudget);
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
  }
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

  chooseUser(selected_user_id: number) {
    console.log(selected_user_id)
    this.selected_user_id = selected_user_id
    this.api.getAllUsers().subscribe(
      data => {

        this.logginedUser = (data["users"])[selected_user_id-1];
        console.log((data["users"])[selected_user_id-1]);
      },
      error => {
        console.log(error);
      }
    )
    this.api.getAllFamilies().subscribe(
      data => {
        this.logginedFamily = (data["families"])[this.logginedUser.familyId_id-1];
        console.log((data["families"])[this.logginedUser.familyId_id-1]);
      },
      error => {
        console.log(error);
      }
    )
    this.api.getAllBudgets().subscribe(
      data => {
        this.logginedBudget = (data["budgets"])[this.logginedUser.familyId_id-1];
        this.userBalance = ((data["budgets"])[this.logginedUser.familyId_id-1]).balance;
        console.log((data["budgets"])[this.logginedUser.familyId_id-1]);
      },
      error => {
        console.log(error);
      }
    )
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
      },
      error => {
        console.log(error);
      }
    );
    this.addNewIncome();
    this.userBalance = this.toAdd + this.userBalance;
    //this.consoleLog(this.userBalance)
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
      },
      error => {
        console.log(error);
      }
    );
    this.addNewOutcome()
    this.userBalance = this.userBalance - this.toTake;
    //this.consoleLog(this.userBalance)
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
}
