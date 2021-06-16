import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '@tqp/authentication/services/token.service';
import { AuthService } from '@tqp/authentication/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TokenStorageService } from '@tqp/authentication/services/token-storage.service';
import { EventService } from '@tqp/services/event.service';
import { navItemsWithRoles } from '../../navigation/_nav-with-roles';
import { UserService } from '../../../@tqp/authentication/services/user.service';
import { User } from '../../../@tqp/authentication/models/User';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PasswordChangeDialogComponent } from '../../../@tqp/authentication/user/password-change-dialog/password-change-dialog.component';
import { NotificationService } from '../../../@tqp/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = null;
  public showLoadingIndicator = false;
  public username: string;
  public googlePhotoUrl: string;

  constructor(private http: HttpClient,
              private userService: UserService,
              private tokenService: TokenService,
              private tokenStorageService: TokenStorageService,
              private notificationService: NotificationService,
              public authService: AuthService,
              private router: Router,
              private eventService: EventService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    // TQP20200318
    // If a token is present, get the User's info.
    // For the cases where the page may load before the token has been obtained,
    // watch for changes to the token Observable. When we have a token, load the data.
    // See token-storage.service.ts for the Observable.
    if (this.tokenService.getToken()) {
      this.setMenuByAuthorities(this.authService.getAuthoritiesFromToken());

      this.authService.getTokenInfo().subscribe(
        response => {
          // console.log('response', response);
          this.username = response.sub;
        },
        error => {
          console.error('Error: ', error);
          this.authService.errorHandler(error);
        }
      );

      this.userService.getUserDetailByUsername(this.username).subscribe(
        (response: User) => {
          // console.log('response', response);
          if (response.passwordReset === 1) {
            console.log('NEED TO RESET PASSWORD');
            this.openChangePasswordDialog(response.userId);
          }
        },
        error => {
          console.log('j1');
          console.error('Error: ', error);
          this.authService.errorHandler(error);
        }
      );

    } else {
      this.tokenStorageService.tokenObs.subscribe(token => {
        this.setMenuByAuthorities(this.authService.getAuthoritiesFromToken());
      });
    }

    this.eventService.loadingEvent.subscribe((loadingStatus: boolean) => {
      this.showLoadingIndicator = loadingStatus;
    });
  }

  public getTokenInfo(): void {
    this.authService.getTokenInfo().subscribe(
      response => {
        // console.log('response', response);
        this.username = response.sub;
        // this.getMyProfile();
      },
      error => {
        console.error('Error: ', error);
        this.authService.errorHandler(error);
      }
    );
  }

  public getMyProfile(): void {
    this.userService.getMyUserInfo().subscribe(
      response => {
        console.log('response', response);
        this.username = response.username;
        this.googlePhotoUrl = response.picture;
      },
      error => {
        console.error('Error: ', error);
        this.authService.errorHandler(error);
      }
    );
  }

  private setMenuByAuthorities(authorities: string): void {
    const authoritiesArray = authorities.split(',');
    this.navItems = navItemsWithRoles;
    this.navItems = this.navItems.filter(item => {
      if (item.allow) {
        const allowArray = item.allow.split(' ').join('').split(',');
        const overlap = allowArray.filter(element => authoritiesArray.includes(element));
        return overlap.length > 0;
      } else {
        return false;
      }
    });
  }

  public openChangePasswordDialog(userId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      userId: userId,
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(PasswordChangeDialogComponent, dialogConfig);
    dialogRef.componentInstance.hideCancelButton = true;
    dialogRef.componentInstance.dialogMessage = 'Your password has been reset by a manager.\nPlease create a new password.';

    dialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        const user: User = new User();
        user.userId = dialogData.userId;
        user.password = dialogData.newPassword;
        this.userService.updatePassword(user).subscribe(
          response => {
            console.log('response', response);
            this.notificationService.showSuccess('Your password has been changed.', 'Password Changed');
          },
          error => {
            console.error('Error: ', error);
          },
          () => {
            console.log('Password Reset.');
          }
        );
      }
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  public logout(): void {
    console.log('logout');
    this.tokenService.clearToken();
    this.authService.clearTokenInfo();
    this.router.navigateByUrl('/login-page').then();
  }

  public openSwagger(): void {
    window.open(environment.apiUrl + '/swagger-ui.html', '_blank');
  }
}
