import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {

  constructor(protected userService: UserService) { }

  public existingUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return timer(500).pipe(
        switchMap(() => {
          return this.userService.getUserDetailByUsername(control.value).pipe(
            first(),
            map(
              result => {
                console.log('result', result);
                if (result) {
                  return {existingUsernameValidator: true};
                } else {
                  return null;
                }
              }, error => {
                console.error('Error: ', error);
              }
            )
          );
        })
      );
    };
  }

  public currentPasswordValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const appUser = new User();
      appUser.password = control.value;
      return timer(500).pipe(
        switchMap(() => {
          return this.userService.confirmPassword(appUser).pipe(
            first(),
            map(
              result => {
                if (!result) {
                  return {currentPasswordValidator: true};
                } else {
                  return null;
                }
              }
            )
          );
        })
      );
    };
  }
}
