import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/toolkit/confirm-dialog/confirm-dialog.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset-dialog',
  templateUrl: './password-reset-dialog.component.html',
  styleUrls: ['./password-reset-dialog.component.css']
})
export class PasswordResetDialogComponent implements OnInit {
  @ViewChild('newPasswordField', {static: false}) public newPasswordField: ElementRef;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public resetPasswordForm: FormGroup;

  public validationMessages = {
    'userId': [],
    'newPassword': [
      {type: 'required', message: 'Please enter a new password.'}
    ],
    'newPasswordConfirm': [
      {type: 'required', message: 'Confirm your new password.'},
      {type: 'confirmNewPasswordValidator', message: 'The passwords do not match.'}
    ]
  };

  static passwordMatchValidator(control: AbstractControl) {
    const newPassword: string = control.get('newPassword').value;
    const newPasswordConfirm: string = control.get('newPasswordConfirm').value;
    if (newPassword !== newPasswordConfirm) {
      control.get('newPasswordConfirm').setErrors({confirmNewPasswordValidator: true});
    }
  }

  constructor(private dialogRef: MatDialogRef<PasswordResetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log('data', this.data);
    this.initializeForm();
  }

  private initializeForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      userId: new FormControl(this.data.userId, [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      newPasswordConfirm: new FormControl('', [Validators.required])
    }, {
      validator: PasswordResetDialogComponent.passwordMatchValidator
    });

    setTimeout(() => {
      this.newPasswordField.nativeElement.focus();
    }, 0);
  }

  // LOAD DATA


  // BUTTONS

  public save(): void {
    this.dialogRef.close(this.resetPasswordForm.getRawValue());
  }

}
