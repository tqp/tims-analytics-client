import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { ListAddRemoveOutputObject } from '../../../../../../@tqp/models/ListAddRemoveOutputObject';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { Contestant } from '../reality-tracker-models/Contestant';
import { RealityTrackerService } from '../reality-tracker.service';

@Component({
  selector: 'app-contestant-detail-edit',
  templateUrl: './contestant-detail-edit.component.html',
  styleUrls: ['./contestant-detail-edit.component.css']
})
export class ContestantDetailEditComponent implements OnInit {
  public pageSource: string;
  public newRecord: boolean;
  public contestant: Contestant;
  public contestantEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public listAddRemoveOutputObject: ListAddRemoveOutputObject = {};

  public validationMessages = {
    'lastName': [
      {type: 'required', message: 'A Last Name is required'}
    ],
    'firstName': [
      {type: 'required', message: 'A First Name is required'}
    ]
  };

  public phoneMask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private realityTrackerService: RealityTrackerService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const guid = params['guid'];
        // console.log('guid', guid);
        this.getContestantDetail(guid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.contestant = new Contestant();
        this.contestant.guid = null;
      }
    });

    const src = this.route
      .queryParams
      .subscribe(params => {
        this.pageSource = params.src;
      });
  }

  private initializeForm(): void {
    this.contestantEditForm = this.formBuilder.group({
      guid: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
    });
  }

  private getContestantDetail(guid: string): void {
    this.realityTrackerService.getContestantDetail(guid).subscribe(
      response => {
        this.contestant = response;
        // console.log('response', response);
        this.contestantEditForm.controls['guid'].patchValue(this.contestant.guid);
        this.contestantEditForm.controls['lastName'].patchValue(this.contestant.lastName);
        this.contestantEditForm.controls['firstName'].patchValue(this.contestant.firstName);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public test(): void {
    console.log('test');
    const form = this.contestantEditForm;

    const changedFields = {};
    Object.keys(form.controls)
      .forEach((fieldId) => {
        const currentControl = form.controls[fieldId];
        if (currentControl.dirty) {
          console.log('currentControl', currentControl);
          changedFields[fieldId] = currentControl.value;
        }
      });
    console.log('changedFields', changedFields);
  }

  public delete(contestantGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.realityTrackerService.deleteContestant(contestantGuid).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['reality-tracker/contestant-list']).then();
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
    const contestant = new Contestant();
    // console.log('crudEditForm', this.contestantEditForm.value);
    contestant.guid = this.contestantEditForm.value.guid;
    contestant.lastName = this.contestantEditForm.value.lastName;
    contestant.firstName = this.contestantEditForm.value.firstName;
    if (this.newRecord) {
      this.realityTrackerService.createContestant(contestant).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['reality-tracker/contestant-detail', response.guid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.realityTrackerService.updateContestant(contestant).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['reality-tracker/contestant-detail', response.guid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.contestant.guid) {
      this.router.navigate(['reality-tracker/contestant-detail', this.contestant.guid]).then();
    } else {
      this.router.navigate(['reality-tracker/contestant-list']).then();
    }
  }

}
