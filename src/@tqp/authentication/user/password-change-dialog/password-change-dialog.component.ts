import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/toolkit/confirm-dialog/confirm-dialog.component';
import { UserValidationService } from '../../services/user-validation.service';

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.css']
})
export class PasswordChangeDialogComponent implements OnInit {
  @ViewChild('currentPasswordField', {static: false}) public currentPasswordField: ElementRef;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public changePasswordForm: FormGroup;
  public dialogMessage: string = '';
  public hideCancelButton: boolean = false;

  public validationMessages = {
    'userId': [],
    'currentPassword': [
      {type: 'required', message: 'You must enter your current password.'},
      {type: 'currentPasswordValidator', message: 'Your current password is incorrect.'},
    ],
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

  constructor(private dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
              private userValidationService: UserValidationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      userId: new FormControl(this.data.userId, [Validators.required]),
      currentPassword: new FormControl('', [Validators.required], [this.userValidationService.currentPasswordValidator()]),
      newPassword: new FormControl('', [Validators.required]),
      newPasswordConfirm: new FormControl('', [Validators.required])
    }, {
      validator: PasswordChangeDialogComponent.passwordMatchValidator
    });

    setTimeout(() => {
      this.currentPasswordField.nativeElement.focus();
    }, 0);
  }

  public formatDialogMessage(dialogMessage: string): string {
    return dialogMessage.replace('\n', '<br />');
  }


  // BUTTONS

  public save(): void {
    this.dialogRef.close(this.changePasswordForm.getRawValue());
  }

}
