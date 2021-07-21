import { Component, HostListener, OnInit } from '@angular/core';
import { Role } from '../../models/Role';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { AuthService } from '../../services/auth.service';
import { authenticationAnimations } from '../../authentication.animations';
import { UserRole } from '../../models/UserRole';
import { UserRoleService } from '../../services/user-role.service';
import { DialogPosition, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/toolkit/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css'],
  animations: [authenticationAnimations]
})
export class RoleDetailComponent implements OnInit {
  public role: Role;
  public loading: boolean = false;
  public translateStatus = {'a': 'Active', 'd': 'Deleted'};
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  // User-Role List
  public userRoleListLoading: boolean = false;
  public userRoleListIsCollapsed: boolean = false;
  public userRoleRecordCount: number;
  public userRoleListRecords: UserRole[] = [];
  public userRoleListDataSource: UserRole[] = [];
  public userRoleListDisplayedColumns: string[] = [
    'userName',
    'updatedOn'
  ];

  constructor(private activatedRoute: ActivatedRoute,
              public router: Router,
              private eventService: EventService,
              private userService: UserService,
              private roleService: RoleService,
              private userRoleService: UserRoleService,
              public authService: AuthService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        // console.log('id', id);
        this.getRoleDetail(id);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getRoleDetail(roleId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.loading = true;
    this.roleService.getRoleDetail(roleId).subscribe(
      response => {
        this.role = response;
        // console.log('role', this.role);
        this.getUserRoleListByRole(this.role.roleId);
        this.loading = false;
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public getUserRoleListByRole(roleId: number): void {
    this.userRoleListLoading = true;
    this.userRoleService.getUserRoleListByRole(roleId).subscribe(
      (userRoleList: UserRole[] | null) => {
        if (userRoleList) {
          // console.log('userRoleList', userRoleList);
          userRoleList.forEach((item: UserRole) => {
            item.userName = item.userSurname + ', ' + item.userGivenName;
            this.userRoleListRecords.push(item);
            this.userRoleRecordCount = userRoleList.length;
          });

          this.userRoleListRecords = this.userRoleListRecords.sort((a, b) => {
            return a.userSurname.toLowerCase() + a.userGivenName.toLowerCase()
            < b.userSurname.toLowerCase() + b.userGivenName.toLowerCase() ? -1 : 1;
          });

          setTimeout(() => {
            this.userRoleListDataSource = this.userRoleListRecords;
            this.userRoleListLoading = false;
            this.eventService.loadingEvent.emit(false);
          }, 0);
        }
      }, (error: any) => {
        console.error('Error: ', error.message);
        this.userRoleListLoading = false;
      }, () => {
      }
    );
  }

  public deleteRole(): void {
    // Don't delete Roles that have Users associated with them.
    // const token = this.tokenService.getToken();
    // if (token && this.user.userId === this.tokenHelperService.decodeToken(token).userId) {
    //   this.openDeleteSelfMessage();
    //   return;
    // }

    const dialogPosition: DialogPosition = {
      top: '25%',
      left: '43%'
    };
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      position: dialogPosition,
      minWidth: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogTitle = 'Confirm Role Delete';
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete this Role?';
    this.confirmDialogRef.componentInstance.mainButtonText = 'Delete Role';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roleService.deleteRole(this.role.roleId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['admin/role-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  // BUTTONS

  public restoreDeletedRole(): void {
    const dialogPosition: DialogPosition = {
      top: '25%',
      left: '50%'
    };
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      position: dialogPosition
    });
    this.confirmDialogRef.componentInstance.dialogTitle = 'Restore Deleted Role';
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to restore this deleted Role?';
    this.confirmDialogRef.componentInstance.mainButtonText = 'Restore Role';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roleService.restoreDeletedRole(this.role.roleId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['admin/role-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public toggleUserRoleListIsCollapsed(event) {
    if (event.target.nodeName === 'SMALL') {
      return;
    }
    this.userRoleListIsCollapsed = !this.userRoleListIsCollapsed;
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      // this.openStudentEditPage();
    }
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      // this.returnToList();
    }
  }

}
