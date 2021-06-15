import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { Token } from '../../../models/Token';
import { AuthService } from '../../services/auth.service';
import { DiagnosticsService } from '../../../services/diagnostics.service';
import { TokenService } from '../../services/token.service';
import * as moment from 'moment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  public decodedToken: Token;

  public openTestResult = 'Blocked';
  public guestTestResult = 'Blocked';
  public userTestResult = 'Blocked';
  public managerTestResult = 'Blocked';
  public adminTestResult = 'Blocked';
  public developerTestResult = 'Blocked';

  constructor(private userService: UserService,
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
    this.userService.getMyUserInfo().subscribe(
      response => {
        this.user = response;
        // console.log('user', this.user);
        this.user.createdOn = moment(this.user.createdOn).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.user.updatedOn = moment(this.user.updatedOn).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );
  }

  private getTokenInformation(): any {
    this.authService.getTokenInfo().subscribe(
      response => {
        this.decodedToken = response;
        // console.log('decodedToken', this.decodedToken);
        this.decodedToken.authorities = this.decodedToken.authorities.replace(/,/g, ', ');
        this.decodedToken.iatText = moment(this.decodedToken.iat * 1000).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.decodedToken.expText = moment(this.decodedToken.exp * 1000).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
      },
      error => {
        console.error('Error: ', error);
        this.authService.errorHandler(error);
      }
    );
  }

  private getEndpointTestsResults(): void {
    // console.log('MyProfileComponent -> getEndpointTestsResults');
    this.diagnosticsService.getOpenEndpoint().subscribe(
      data => {
        this.openTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );

    this.diagnosticsService.getGuestEndpoint().subscribe(
      data => {
        this.guestTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );

    this.diagnosticsService.getUserEndpoint().subscribe(
      data => {
        this.userTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );

    this.diagnosticsService.getManagerEndpoint().subscribe(
      data => {
        this.managerTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );

    this.diagnosticsService.getAdminEndpoint().subscribe(
      data => {
        this.adminTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );

    this.diagnosticsService.getDeveloperEndpoint().subscribe(
      data => {
        this.developerTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );
  }

}
