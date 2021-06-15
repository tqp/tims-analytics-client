import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from '@tqp/components/toolkit/confirm-dialog/confirm-dialog.component';
import { Alumni } from '../../models/alumni.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlumniService } from '../../services/alumni.service';
import { FormattingService } from '@tqp/services/formatting.service';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alumni-detail-edit',
  templateUrl: './alumni-detail-edit.component.html',
  styleUrls: ['./alumni-detail-edit.component.css']
})
export class AlumniDetailEditComponent implements OnInit {
  @ViewChild('defaultInputField', {static: false}) defaultInputField: ElementRef;
  public newRecord: boolean;
  public alumni: Alumni;
  public alumniEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public potentialDuplicateFlag: boolean = false;

  public validationMessages = {
    'alumniId': [],
    'firstName': [
      {type: 'required', message: 'A first name is required.'}
    ],
    'lastName': [
      {type: 'required', message: 'A lastName is required.'},
      {type: 'duplicateRecord', message: 'A person with that first and last name already exists.'}
    ],
    'gradYear': [],
    'gradYearOther': [],
    'currentSchoolOrJob': [],

    'phoneNumber': [],
    'emailAddress': [],

    'addressLine1': [],
    'addressLine2': [],
    'city': [],
    'state': [],
    'zipCode': [],

    'comments': []
  };

  constructor(private route: ActivatedRoute,
              private alumniService: AlumniService,
              private router: Router,
              private formBuilder: FormBuilder,
              private formattingService: FormattingService,
              public _matDialog: MatDialog) {
    this.initializeForm();
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        // console.log('id', id);
        this.getAlumniDetail(id);
      } else {
        // Create new Person
        this.newRecord = true;
        this.alumni = new Alumni();
        this.alumni.alumniId = null;
        setTimeout(() => {
          this.defaultInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  ngOnInit(): void {
    if (this.newRecord) {
      this.listenForDuplicateChanges();
    }
  }

  private initializeForm(): void {
    this.alumniEditForm = this.formBuilder.group({
      alumniId: new FormControl({value: '', disabled: true}, Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),

      gradYear: new FormControl(''),
      gradYearOther: new FormControl(''),
      currentSchoolOrJob: new FormControl(''),

      phoneNumber: new FormControl(''),
      emailAddress: new FormControl(''),

      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl(''),

      comments: new FormControl('')
    });
  }

  private getAlumniDetail(id: number): void {
    this.alumniService.getAlumniDetail(id).subscribe(
      response => {
        this.alumni = response;
        // console.log('alumni', this.alumni);
        this.alumniEditForm.controls['alumniId'].patchValue(this.alumni.alumniId);
        this.alumniEditForm.controls['firstName'].patchValue(this.alumni.firstName);
        this.alumniEditForm.controls['lastName'].patchValue(this.alumni.lastName);

        this.alumniEditForm.controls['gradYear'].patchValue(this.alumni.gradYear);
        this.alumniEditForm.controls['gradYearOther'].patchValue(this.alumni.gradYearOther);
        this.alumniEditForm.controls['currentSchoolOrJob'].patchValue(this.alumni.currentSchoolOrJob);

        this.alumniEditForm.controls['phoneNumber'].patchValue(this.alumni.phoneNumber);
        this.alumniEditForm.controls['emailAddress'].patchValue(this.alumni.emailAddress);

        this.alumniEditForm.controls['addressLine1'].patchValue(this.alumni.addressLine1);
        this.alumniEditForm.controls['addressLine2'].patchValue(this.alumni.addressLine2);
        this.alumniEditForm.controls['city'].patchValue(this.alumni.city);
        this.alumniEditForm.controls['state'].patchValue(this.alumni.state);
        this.alumniEditForm.controls['zipCode'].patchValue(this.alumni.zipCode);

        this.alumniEditForm.controls['comments'].patchValue(this.alumni.comments);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private listenForDuplicateChanges(): void {
    merge(
      this.alumniEditForm.controls['lastName'].valueChanges.pipe(debounceTime(500)),
      this.alumniEditForm.controls['firstName'].valueChanges.pipe(debounceTime(500)),
    ).subscribe(() => {
        const alumni: Alumni = new Alumni();
        alumni.firstName = this.alumniEditForm.controls['firstName'].value;
        alumni.lastName = this.alumniEditForm.controls['lastName'].value;
        this.alumniService.checkDuplicateRecords(alumni).subscribe(
          (response: Alumni[]) => {
            // console.log('response', response);
            this.potentialDuplicateFlag = response.length > 0;
            if (this.potentialDuplicateFlag) {
              this.alumniEditForm.controls['lastName'].setErrors({'duplicateRecord': true});
              this.alumniEditForm.get('lastName').setErrors({'duplicateRecord': true});
            }
          }
        );
      },
      error => {
        console.error('Error: ', error.message);
      },
      () => {
        console.log('complete');
      }
    );
  }

  // BUTTONS

  public save(): void {
    this.performSave();
  }

  private performSave(): void {
    const alumni = new Alumni();

    const formValues = this.alumniEditForm.getRawValue();

    console.log('alumniEditForm', formValues);
    alumni.alumniId = formValues.alumniId;
    alumni.firstName = formValues.firstName;
    alumni.lastName = formValues.lastName;

    alumni.gradYear = formValues.gradYear;
    alumni.gradYearOther = formValues.gradYearOther;
    alumni.currentSchoolOrJob = formValues.currentSchoolOrJob;

    alumni.phoneNumber = formValues.phoneNumber;
    alumni.emailAddress = formValues.emailAddress;

    alumni.addressLine1 = formValues.addressLine1;
    alumni.addressLine2 = formValues.addressLine2;
    alumni.city = formValues.city;
    alumni.state = formValues.state;
    alumni.zipCode = formValues.zipCode;

    alumni.comments = formValues.comments;

    if (this.newRecord) {
      this.alumniService.createAlumni(alumni).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['donor-database/alumni-detail', response.alumniId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.alumniService.updateAlumni(alumni).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['donor-database/alumni-detail', response.alumniId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public delete(alumniId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alumniService.deleteAlumni(alumniId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['donor-database/alumni-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public cancel(): void {
    if (this.alumni.alumniId) {
      this.router.navigate(['donor-database/alumni-detail', this.alumni.alumniId]).then();
    } else {
      this.router.navigate(['donor-database/alumni-list']).then();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    // console.log(event + ' (' + event.key + ')');

    // CTRL + S
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.save();
    }

    // Enter
    if (event.key === 'Enter') {
      event.preventDefault();
      this.save();
    }

    // Escape
    if (event.key === 'Escape') {
      event.preventDefault();
      this.cancel();
    }
  }

}
