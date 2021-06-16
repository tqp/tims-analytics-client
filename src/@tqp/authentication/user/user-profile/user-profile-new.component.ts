import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Token } from '../../../models/Token';
import { DiagnosticsService } from '../../../services/diagnostics.service';
import { TokenService } from '../../services/token.service';
import * as moment from 'moment';
import { Role } from '../../models/Role';
import { authenticationAnimations } from '../../authentication.animations';
import { RoleService } from '../../services/role.service';
import { UserRoleService } from '../../services/user-role.service';
import { UserRole } from '../../models/UserRole';

@Component({
  selector: 'app-user-profile-new',
  templateUrl: './user-profile-new.component.html',
  styleUrls: ['./user-profile-new.component.css'],
  animations: [authenticationAnimations]
})
export class UserProfileNewComponent implements OnInit {
  public user: User;
  public decodedToken: Token;

  public userInfoLoading = true;
  public tokenInfoLoading = true;
  public endpointTestsLoading = true;
  public numberOfEndpointTests = 0;

  // User-Role List
  public userRoleListLoading: boolean = false;
  public userRoleListIsCollapsed: boolean = false;
  public userRoleListRecords: UserRole[] = [];
  public userRoleListDataSource: UserRole[] = [];
  public userRoleListDisplayedColumns: string[] = [
    'roleName',
    'updatedOn'
  ];

  public openTestResult = 'Blocked';
  public guestTestResult = 'Blocked';
  public userTestResult = 'Blocked';
  public managerTestResult = 'Blocked';
  public adminTestResult = 'Blocked';
  public developerTestResult = 'Blocked';

  constructor(private userService: UserService,
              private roleService: RoleService,
              private userRoleService: UserRoleService,
              private authService: AuthService,
              private diagnosticsService: DiagnosticsService,
              protected tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.getMyUserInfo();
    this.getTokenInformation();
    this.getEndpointTestsResults();
  }

  private getMyUserInfo(): any {
    this.userInfoLoading = true;
    this.userService.getMyUserInfo().subscribe(
      response => {
        this.user = response;
        // console.log('user', this.user);
        this.user.createdOn = moment(this.user.createdOn).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.user.updatedOn = moment(this.user.updatedOn).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.userInfoLoading = false;
        this.getUserRoleListByUser(this.user.userId);
      },
      error => {
        console.error('Error: ', error);
        this.userInfoLoading = false;
      }
    );
  }

  public getUserRoleListByUser(userId: number): void {
    this.userRoleListLoading = true;
    this.userRoleService.getUserRoleListByUser(userId).subscribe(
      (roleList: UserRole[] | null) => {
        if (roleList) {
          console.log('roleList', roleList);
          roleList.forEach((item: UserRole) => {
            this.userRoleListRecords.push(item);
          });

          this.userRoleListRecords = this.userRoleListRecords.sort((a, b) => {
            return a.roleName.toLowerCase() < b.roleName.toLowerCase() ? -1 : 1;
          });

          setTimeout(() => {
            this.userRoleListDataSource = this.userRoleListRecords;
            this.userRoleListLoading = false;
          }, 0);
        }
      }, (error: any) => {
        console.error('Error: ', error.message);
        this.userRoleListLoading = false;
      }, () => {
      }
    );
  }

  private getTokenInformation(): any {
    this.tokenInfoLoading = true;
    this.authService.getTokenInfo().subscribe(
      response => {
        this.decodedToken = response;
        // console.log('decodedToken', this.decodedToken);
        this.decodedToken.authorities = this.decodedToken.authorities.replace(/,/g, ', ');
        this.decodedToken.iatText = moment(this.decodedToken.iat * 1000).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.decodedToken.expText = moment(this.decodedToken.exp * 1000).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.tokenInfoLoading = false;
      },
      error => {
        console.error('Error: ', error);
        this.authService.errorHandler(error);
        this.tokenInfoLoading = false;
      }
    );
  }

  private getEndpointTestsResults(): void {
    this.endpointTestsLoading = true;
    this.numberOfEndpointTests = 6;
    this.diagnosticsService.getOpenEndpoint().subscribe(
      data => {
        this.openTestResult = data.value;
        this.numberOfEndpointTests--;
      },
      () => {
        this.numberOfEndpointTests--;
      }, () => {
      }
    );

    this.diagnosticsService.getGuestEndpoint().subscribe(
      data => {
        this.guestTestResult = data.value;
        this.numberOfEndpointTests--;
      },
      () => {
        this.numberOfEndpointTests--;
      }, () => {
      }
    );

    this.diagnosticsService.getUserEndpoint().subscribe(
      data => {
        this.userTestResult = data.value;
        this.numberOfEndpointTests--;
      },
      () => {
        this.numberOfEndpointTests--;
      }, () => {
      }
    );

    this.diagnosticsService.getManagerEndpoint().subscribe(
      data => {
        this.managerTestResult = data.value;
        this.numberOfEndpointTests--;
      },
      () => {
        this.numberOfEndpointTests--;
      }, () => {
      }
    );

    this.diagnosticsService.getAdminEndpoint().subscribe(
      data => {
        this.adminTestResult = data.value;
        this.numberOfEndpointTests--;
      },
      () => {
        this.numberOfEndpointTests--;
      }, () => {
      }
    );

    this.diagnosticsService.getDeveloperEndpoint().subscribe(
      data => {
        this.developerTestResult = data.value;
        this.numberOfEndpointTests--;
      },
      () => {
        this.numberOfEndpointTests--;
      }, () => {
      }
    );
  }

  public toggleUserRoleListIsCollapsed(event) {
    if (event.target.nodeName === 'SMALL') {
      return;
    }
    this.userRoleListIsCollapsed = !this.userRoleListIsCollapsed;
  }

}
