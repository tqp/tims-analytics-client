import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { authenticationAnimations } from '../../authentication.animations';
import { UserRoleService } from '../../services/user-role.service';
import { UserRole } from '../../models/UserRole';
import { ConfirmDialogComponent } from '../../../components/toolkit/confirm-dialog/confirm-dialog.component';
import { DialogPosition, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TokenService } from '../../services/token.service';
import { TokenHelperService } from '../../services/token-helper.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  animations: [authenticationAnimations]
})
export class UserDetailComponent implements OnInit {
  public user: User;
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
    'roleName',
    'updatedOn'
  ];

  constructor(private activatedRoute: ActivatedRoute,
              public router: Router,
              private eventService: EventService,
              private userService: UserService,
              private tokenService: TokenService,
              private tokenHelperService: TokenHelperService,
              private userRoleService: UserRoleService,
              public authService: AuthService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        // console.log('id', id);
        this.getUserDetail(id);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getUserDetail(userId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.loading = true;
    this.userService.getUserDetail(userId).subscribe(
      response => {
        this.user = response;
        // console.log('user', this.user);
        this.getUserRoleListByUser(this.user.userId);
        this.loading = false;
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public getUserRoleListByUser(userId: number): void {
    this.userRoleListLoading = true;
    this.userRoleService.getUserRoleListByUser(userId).subscribe(
      (userRoleList: UserRole[] | null) => {
        if (userRoleList) {
          // console.log('userRoleList', userRoleList);
          userRoleList.forEach((item: UserRole) => {
            this.userRoleListRecords.push(item);
            this.userRoleRecordCount = userRoleList.length;
          });

          this.userRoleListRecords = this.userRoleListRecords.sort((a, b) => {
            return a.roleName.toLowerCase() < b.roleName.toLowerCase() ? -1 : 1;
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

  public deleteUser(): void {
    // Don't let the User delete themselves.
    const token = this.tokenService.getToken();
    if (token && this.user.userId === this.tokenHelperService.decodeToken(token).userId) {
      this.openDeleteSelfMessage();
      return;
    }

    const dialogPosition: DialogPosition = {
      top: '25%',
      left: '43%'
    };
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      position: dialogPosition,
      minWidth: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogTitle = 'Confirm User Delete';
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete this User?';
    this.confirmDialogRef.componentInstance.mainButtonText = 'Delete User';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(this.user.userId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['admin/user-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  private openDeleteSelfMessage(): void {
    const dialogPosition: DialogPosition = {
      top: '25%',
      left: '43%'
    };
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      position: dialogPosition,
      minWidth: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogTitle = 'Invalid Delete Action';
    this.confirmDialogRef.componentInstance.dialogMessage = 'You can\'t delete your own User.';
    this.confirmDialogRef.componentInstance.hideCancelButton = true;
    this.confirmDialogRef.componentInstance.mainButtonText = 'Close';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(this.user.userId).subscribe(
          response => {
            console.log('response: ', response);
            this.router.navigate(['admin/user-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public restoreDeletedUser(): void {
    const dialogPosition: DialogPosition = {
      top: '25%',
      left: '50%'
    };
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      position: dialogPosition
    });
    this.confirmDialogRef.componentInstance.dialogTitle = 'Restore Deleted User';
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to restore this deleted User?';
    this.confirmDialogRef.componentInstance.mainButtonText = 'Restore User';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.restoreDeletedUser(this.user.userId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['admin/user-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public openUserEditPage(): void {
    this.router.navigate(['admin/user-detail-edit', this.user.userId]).then();
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
