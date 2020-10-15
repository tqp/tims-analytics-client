import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../../@tqp/services/event.service';
import { AutoExpenseService } from '../auto-expense.service';
import { AutoExpense } from '../../auto-tracker-models/AutoExpense';

@Component({
  selector: 'app-auto-expense-detail',
  templateUrl: './auto-expense-detail.component.html',
  styleUrls: ['./auto-expense-detail.component.css']
})
export class AutoExpenseDetailComponent implements OnInit {
  public pageSource: string;
  public autoExpense: AutoExpense;
  public dialogRef: any;

  constructor(private route: ActivatedRoute,
              private autoExpenseService: AutoExpenseService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const autoExpenseGuid = params['guid'];
        console.log('autoExpenseGuid', autoExpenseGuid);
        this.getAutoExpenseDetail(autoExpenseGuid);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getAutoExpenseDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.autoExpenseService.getAutoExpenseDetail(guid).subscribe(
      response => {
        console.log('response', response);
        this.autoExpense = response;
        // console.log('fillDateTime:', this.autoExpense.fill.fillDateTime);
        // console.log('fillDate    :', this.autoExpense.fill.fillDateTime);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // Buttons

  public returnToList(): void {
    this.router.navigate(['auto-tracker/auto-expense-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['auto-tracker/auto-expense-detail-edit', this.autoExpense.expenseGuid]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.openEditPage();
    }
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      this.returnToList();
    }
  }

}
