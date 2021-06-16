import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/toolkit/confirm-dialog/confirm-dialog.component';
import { Role } from '../../models/Role';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { NotificationService } from '../../../services/notification.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-detail-edit',
  templateUrl: './user-detail-edit.component.html',
  styleUrls: ['./user-detail-edit.component.css']
})
export class UserDetailEditComponent implements OnInit {
  @ViewChild('userSurnameInputField', {static: false}) userSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public user: User;
  public userEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  // ROLE CHECKBOXES
  public roleList: Role[];
  public roleListCheckboxArray: Role[];

  get roleCheckboxFormArray() {
    return this.userEditForm.controls.roleCheckboxes as FormArray;
  }

  public validationMessages = {
    'userId': [
      {type: 'required', message: 'An ID is required.'}
    ],
    'username': [
      {type: 'required', message: 'A Username is required.'}
    ],
    'surname': [
      {type: 'required', message: 'A Surname is required.'}
    ],
    'givenName': [
      {type: 'required', message: 'A Given Name is required.'}
    ],
    'roleCheckboxes': [
      {type: 'minSelectedCheckboxes', message: 'At least one Role must be selected.'}
    ],
    'caseManagerNumberOfStudents': []
  };

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private roleService: RoleService,
              private notificationService: NotificationService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const userId = params['id'];
        // console.log('userId', userId);
        this.getUserDetail(userId);
      } else {
        // Create New User
        this.newRecord = true;
        this.user = new User();
        this.user.userId = null;
        setTimeout(() => {
          this.userSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userEditForm = this.formBuilder.group({
      userId: new FormControl(''),
      username: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      givenName: new FormControl('', Validators.required),
      positionId: new FormControl('', Validators.required),
      caseManagerNumberOfStudents: new FormControl({value: '', disabled: false}),
      roles: new FormControl(''),
      roleCheckboxes: new FormArray([],
        [minSelectedCheckboxes(1)]),
    });
  }

  private getUserDetail(userId: number): void {
    const roleList = this.roleService.getRoleList();
    const userDetail = this.userService.getUserDetailWithRoleList(userId);

    // We need to ensure that both the roleList list and the userDetail come back before
    // trying to populate the checkboxes... so, we use forkJoin.
    forkJoin([roleList, userDetail]).subscribe(response => {
      // console.log('response', response);

      // Use the roleList response
      this.roleList = response[0];
      this.addCheckboxes();

      this.user = response[1];
      // console.log('response', response);
      this.userEditForm.controls['userId'].patchValue(this.user.userId);
      this.userEditForm.controls['username'].patchValue(this.user.username);
      this.userEditForm.controls['surname'].patchValue(this.user.surname);
      this.userEditForm.controls['givenName'].patchValue(this.user.givenName);

      // Populate Checkboxes
      const roleCheckboxArray = this.user.roles;
      // console.log('roleCheckboxArray', roleCheckboxArray);
      this.roleList.forEach((role, index) => {
        if (roleCheckboxArray.findIndex(x => x.roleId === role.roleId) > -1) {
          this.roleCheckboxFormArray.controls[index].setValue(true);
        }
      });
      this.setInitialCheckboxFormValue();
    });
  }

  private addCheckboxes() {
    // console.log('this.roleList', this.roleList);
    this.roleList.forEach(() => {
      const formArray = this.userEditForm.controls.roleCheckboxes as FormArray;
      return formArray.push(new FormControl(false));
    });
  }

  public setInitialCheckboxFormValue(): void {
    this.setCheckboxFormValue();
    // console.log('this.roleListCheckboxArray', this.roleListCheckboxArray);
    // console.log('this.startedWithCaseManagerRole', this.startedWithCaseManagerRole);
  }

  public updateCheckboxFormValue(): void {
    this.userEditForm.controls['positionId'].patchValue(5); // Custom
    this.setCheckboxFormValue();
  }

  private setCheckboxFormValue() {
    this.roleListCheckboxArray = [];
    this.roleCheckboxFormArray.value.forEach((value, index) => {
      // console.log('value', value, 'index', index);
      const role: Role = new Role();
      role.roleId = this.roleList[index].roleId;
      role.status = value;
      this.roleListCheckboxArray.push(role);
    });
  }

  // BUTTONS

  public delete(user: User): void {
    // Prevent Case Manager Role change if Students are currently assigned.
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogTitle = 'Delete UserModel';
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete this user?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.userId).subscribe(
          () => {
            this.router.navigate(['users/user-list']).then();
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
    this.performSave();
  }

  private performSave(): void {
    const user = new User();
    user.userId = this.userEditForm.value.userId;
    user.username = this.userEditForm.value.username;
    user.surname = this.userEditForm.value.surname;
    user.givenName = this.userEditForm.value.givenName;
    user.rolesString = this.userEditForm.value.roles;
    user.roles = this.roleListCheckboxArray;

    if (this.newRecord) {
      this.userService.createUser(user).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['users/user-detail', response.userId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.userService.updateUser(user).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['users/user-detail', response.userId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );

    }
  }

  public cancel(): void {
    if (this.user.userId) {
      this.router.navigate(['admin/user-detail', this.user.userId]).then();
    } else {
      this.router.navigate(['admin/user-list']).then();
    }
  }

  public openResetPasswordDialog(): void {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.minWidth = '40%';
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = {
    //   userId: this.user.userId
    // };
    // dialogConfig.autoFocus = false;
    // const dialogRef = this._matDialog.open(ResetPasswordDialogComponent, dialogConfig);
    //
    // dialogRef.afterClosed().subscribe(dialogData => {
    //   if (dialogData) {
    //     const user: UserModel = new UserModel();
    //     user.userId = dialogData.userId;
    //     user.password = dialogData.newPassword;
    //     this.userService.resetPassword(user).subscribe(
    //       response => {
    //         console.log('response', response);
    //         this.notificationService.showSuccess('The password has been changed.', 'Password Changed');
    //       },
    //       error => {
    //         console.error('Error: ', error);
    //       },
    //       () => {
    //         console.log('done');
    //       }
    //     );
    //   }
    // });
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
    if (event.key === 'Escape') {
      this.cancel();
    }
  }

}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : {minSelectedCheckboxes: true};
  };
  return validator;
}
