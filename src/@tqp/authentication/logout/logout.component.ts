import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@tqp/authentication/services/auth.service';
import { TokenService } from '@tqp/authentication/services/token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tokenService.clearToken();
    this.authService.clearTokenInfo();
    this.router.navigateByUrl('/login-page').then();
  }

}
