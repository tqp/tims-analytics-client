import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '@tqp/services/token.service';
import {AuthService} from '@tqp/services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {TokenStorageService} from '@tqp/services/token-storage.service';
import {navItemsAdmin} from '../../_navAdmin';
import {navItemsUser} from '../../_navUser';
import {EventService} from '@tqp/services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = null;
  public showLoadingIndicator = false;

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private eventService: EventService) {
    const test = false;
    if (test) {
      this.navItems = navItemsAdmin;
    }
  }

  ngOnInit(): void {
    // TQP20200318
    // If a token is present, get the User's info.
    // For the cases where the page may load before the token has been obtained,
    // watch for changes to the token Observable. When we have a token, load the data.
    // See token-storage.service.ts for the Observable.
    if (this.tokenService.getToken()) {
      this.setMenu(this.authService.getAuthoritiesFromToken());
    } else {
      this.tokenStorageService.tokenObs.subscribe(token => {
        this.setMenu(this.authService.getAuthoritiesFromToken());
      });
    }

    this.eventService.loadingEvent.subscribe((loadingStatus: boolean) => {
      this.showLoadingIndicator = loadingStatus;
    });
  }

  private setMenu(authorities: string): void {
    console.log('authorities', authorities);
    if (authorities.indexOf('ROLE_ADMIN') > -1) {
      this.navItems = navItemsAdmin;
    } else if (authorities.indexOf('ROLE_USER') > -1) {
      this.navItems = navItemsUser;
    } else {
      console.log('The authorities presented did not contain a matching role.', authorities);
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  public logout(): void {
    this.tokenService.clearToken();
    this.authService.clearTokenInfo();
    this.router.navigateByUrl('/open-pages/login').then();
  }

  public openSwagger(): void {
    window.open(environment.apiUrl + '/swagger-ui.html', '_blank');
  }
}
