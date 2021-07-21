import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/toolkit/confirm-dialog/confirm-dialog.component';
import { Role } from '../../models/Role';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { NotificationService } from '../../../services/notification.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-role-detail-edit',
  templateUrl: './role-detail-edit.component.html',
  styleUrls: ['./role-detail-edit.component.css']
})
export class RoleDetailEditComponent implements OnInit {
  @ViewChild('defaultInputField', {static: false}) defaultInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public role: Role;
  public roleEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  // ROLE CHECKBOXES
  public roleList: Role[];

  public validationMessages = {
    'roleId': [
      {type: 'required', message: 'An ID is required.'}
    ],
    'roleName': [
      {type: 'required', message: 'A Role Name is required.'}
    ],
    'roleDescription': []
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
        const roleId = params['id'];
        // console.log('roleId', roleId);
        this.getRoleDetail(roleId);
      } else {
        // Create New User
        this.newRecord = true;
        this.role = new Role();
        this.role.roleId = null;
        setTimeout(() => {
          this.defaultInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.roleEditForm = this.formBuilder.group({
      roleId: new FormControl(''),
      roleName: new FormControl('', Validators.required),
      roleDescription: new FormControl('')
    });
  }

  private getRoleDetail(roleId: number): void {
    const roleDetail = this.roleService.getRoleDetail(roleId);

    // This approach is just to mirror the User Detail Edit code.
    forkJoin([roleDetail]).subscribe(response => {
      // console.log('response', response);

      this.role = response[0];
      // console.log('response', response);
      this.roleEditForm.controls['roleId'].patchValue(this.role.roleId);
      this.roleEditForm.controls['roleName'].patchValue(this.role.roleName);
      this.roleEditForm.controls['roleDescription'].patchValue(this.role.roleDescription);
    });
  }

  // BUTTONS

  public delete(user: User): void {
    // Prevent Case Manager Role change if Students are currently assigned.
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogTitle = 'Delete Role';
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete this Role?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.userId).subscribe(
          () => {
            this.router.navigate(['roles/role-list']).then();
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
    const role = new Role();
    role.roleId = this.roleEditForm.value.roleId;
    role.roleName = this.roleEditForm.value.roleName;
    role.roleDescription = this.roleEditForm.value.roleDescription;

    if (this.newRecord) {
      this.roleService.createRole(role).subscribe(
        response => {
          console.log('createRole: ', response);
          this.router.navigate(['admin/role-detail', response.roleId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.roleService.updateRole(role).subscribe(
        response => {
          this.router.navigate(['admin/role-detail', response.roleId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );

    }
  }

  public cancel(): void {
    if (this.role.roleId) {
      this.router.navigate(['admin/role-detail', this.role.roleId]).then();
    } else {
      this.router.navigate(['admin/role-list']).then();
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
  }

}
