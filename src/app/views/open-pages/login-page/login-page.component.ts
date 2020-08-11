import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@tqp/services/auth.service';
import { TokenService } from '@tqp/services/token.service';
import { Router } from '@angular/router';
import {tqpCustomAnimations} from '@tqp/animations/tqpCustomAnimations';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [tqpCustomAnimations]
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string;
  public googleClientId: string;
  public googleRedirectUri: string;
  public displayLoginSpinner = false;
  public logonFormVisible = false;
  public logonInProcess = false;

  constructor(private _formBuilder: FormBuilder,
              private authService: AuthService,
              protected tokenService: TokenService,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['user', [Validators.required, Validators.email]],
      password: ['user1', Validators.required],
      generalError: ['']
    }, {});
  }

  public toggle1(): void {
    this.logonFormVisible = !this.logonFormVisible;
  }

  public loginApp(): void {
    // console.log('email   : ' + this.loginForm.value.email);
    // console.log('password: ' + this.loginForm.value.password);
    this.logonInProcess = true;
    this.authService.attemptAuth(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      response => {
        // console.log('LogonPage -> attemptLogin: ' + JSON.stringify(response));
        this.tokenService.saveToken(response.token);
        this.router.navigate(['/secured-pages/about']).then();
        this.logonInProcess = false;
      },
      error => {
        console.error('Error: ', error.error);
        this.displayError(error.error);
        this.logonInProcess = false;
      }
    );
  }

  public closeForm(): void {
    console.log('closeForm');
  }

  private getGoogleAuthConfig(): void {
    this.authService.getGoogleAuthConfig().subscribe(
      data => {
        // console.log('GoogleAuthConfig:', data);
        this.googleClientId = data.clientId;
        this.googleRedirectUri = data.redirectUri;
        if (this.loginForm.get('generalError').hasError('customValidator')) {
          console.log('Server connection restored.');
          this.loginForm.get('generalError').setErrors(null);
        }
      },
      error => {
        console.error('Error: ', error);
        error.error = 'CannotConnectToServer';
        this.displayError(error.error);
      }
    );
  }

  private displayError(error): void {
    console.log('error: ', error);
    switch (error) {
      case 'Bad credentials':
        this.errorMessage = 'Incorrect username or password.';
        break;
      case 'UsernameNotFoundException':
        this.errorMessage = 'The user you logged in with doesn\'t have access to this site.';
        break;
      case 'LoggedOut':
        this.errorMessage = 'You have been logged out.';
        break;
      case 'UserDisabled':
        this.errorMessage = 'That User is currently disabled.';
        break;
      case 'CannotConnectToServer':
        this.errorMessage = 'Cannot connect to the Timetracker server.';
        // Check again to see if server is back up.
        setTimeout(() => {
          console.log('Checking server connection...');
          this.getGoogleAuthConfig();
          if (this.loginForm.get('generalError').hasError('customValidator')) {
            console.log('Still cannot connect to the Timetracker server.');
          }
        }, 5000);
        break;
      default:
        this.errorMessage = 'An unknown error occurred.';
    }
    this.loginForm.get('generalError').setErrors({customValidator: true});
    this.loginForm.get('generalError').markAsTouched();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.loginApp();
    }
  }

}
