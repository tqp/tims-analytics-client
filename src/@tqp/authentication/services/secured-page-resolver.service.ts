import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecuredPageResolverService implements Resolve<any> {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.authService.isAuthenticated().subscribe(response => {
      if (response === false) {
        console.log('User has NOT been authenticated.');
        this.router.navigate(['/login-page']).then();
      } else {
        // console.log('User has been authenticated.');
      }
    });
    return EMPTY;
  }
}

