import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AutoExpense } from '../../auto-tracker-models/AutoExpense';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@tqp/services/auth.service';
import { AutoExpenseService } from '../auto-expense.service';
import { KeyValue } from '@angular/common';
import { ExpenseType } from '../../auto-tracker-models/ExpenseType';

@Component({
  selector: 'app-auto-expense-detail-edit',
  templateUrl: './auto-expense-detail-edit.component.html',
  styleUrls: ['./auto-expense-detail-edit.component.css']
})
export class AutoExpenseDetailEditComponent implements OnInit {
  @ViewChild('fillDateInputField', {static: false}) fillDateInputField: ElementRef;
  public action: string;
  public pageSource: string;
  public newRecord: boolean;
  public autoExpense: AutoExpense;
  public autoExpenseLoaded = false;
  public autoExpenseEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public bsValue: Date = new Date();
  public expenseTypeList: ExpenseType[] = [];

  public validationMessages = {
    'expenseGuid': [],
    'expenseDate': [
      {type: 'required', message: 'A Date is required'}
    ],
    'expenseAmount': [
      {type: 'required', message: 'An Amount is required'}
    ],
    'expenseTypeGuid': [
      {type: 'required', message: 'A Type is required'}
    ],
    'expenseComments': [
      {type: 'required', message: 'A Comment is required'}
    ],
  };

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private autoExpenseService: AutoExpenseService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Create empty object
    this.autoExpense = new AutoExpense();

    // Determine if this is a 'create' or an 'edit' action
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        this.action = 'edit';
        const autoExpenseGuid = params['guid'];
        // console.log('autoExpenseGuid', autoExpenseGuid);
        this.getAutoExpenseDetail(autoExpenseGuid);
      } else {
        this.action = 'create';
        this.newRecord = true;
        this.autoExpense = new AutoExpense();
        // this.autoExpense.fill.fillGuid = null;

        // setTimeout(() => {
        //   this.lastNameInputField.nativeElement.focus();
        // }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.autoExpenseEditForm = this.formBuilder.group({
      expenseGuid: new FormControl('', Validators.required),
      expenseDate: new FormControl('', Validators.required),
      expenseTypeName: new FormControl('', Validators.required),
      expenseAmount: new FormControl('', Validators.required),
      expenseComments: new FormControl('', Validators.required),
    });

    this.autoExpenseService.getExpenseTypeDropDownOptions().subscribe(
      (expenseTypeList: ExpenseType[]) => {
        console.log('expenseTypeList', expenseTypeList);
        // this.expenseTypeList = expenseTypeList;
        // this.stateSearchFormControl.setValue('', {emitEvent: false});
      }, error => {
        console.error('Error: ', error);
      }, () => {
        // const stateSearchValue = this.autoExpenseService.getStateSearchValue();
        // if (stateSearchValue) {
        //   console.log('stateVal', stateSearchValue);
        //   this.stateSearchFormControl.setValue(stateSearchValue);
        //   this.searchParams.stateFilter = stateSearchValue;
        // }
      });
  }

  private getAutoExpenseDetail(guid: string): void {
    this.autoExpenseService.getAutoExpenseDetail(guid).subscribe(
      response => {
        this.autoExpense = response;
        console.log('response', response);
        this.autoExpenseLoaded = true;
        this.autoExpenseEditForm.controls['expenseGuid'].patchValue(this.autoExpense.expenseGuid);
        this.autoExpenseEditForm.controls['expenseDate'].patchValue(this.autoExpense.expenseDate);
        this.autoExpenseEditForm.controls['expenseTypeName'].patchValue(this.autoExpense.expenseTypeName);
        this.autoExpenseEditForm.controls['expenseAmount'].patchValue(this.autoExpense.expenseAmount);
        this.autoExpenseEditForm.controls['expenseComments'].patchValue(this.autoExpense.expenseComments);
      },
      error => {
        console.error('Error: ' + error.message);
      }
    );
  }

  // BUTTONS

  public delete(autoExpenseGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.autoExpenseService.deleteAutoExpense(autoExpenseGuid).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['auto-tracker/auto-expense-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    if (this.newRecord) {
      this.autoExpenseService.createAutoExpense(this.autoExpenseEditForm.getRawValue()).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['auto-tracker/auto-expense-detail', response.fillGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.autoExpenseService.updateAutoExpense(this.autoExpenseEditForm.getRawValue()).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['auto-tracker/auto-expense-detail', response.expenseGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.autoExpense != null) {
      this.router.navigate(['auto-tracker/auto-expense-detail', this.autoExpense.expenseGuid]).then();
    } else {
      this.router.navigate(['auto-tracker/auto-expense-list']).then();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
    if (event.key === 'Escape') {
      this.cancel();
    }
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.delete(this.autoExpense.expenseGuid);
    }
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.save();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.cancel();
    }
  }

}
