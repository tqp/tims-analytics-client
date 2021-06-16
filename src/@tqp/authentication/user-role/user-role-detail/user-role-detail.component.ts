import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { UserService } from '../../services/user.service';
import { UserRoleService } from '../../services/user-role.service';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/UserRole';

@Component({
  selector: 'app-user-role-detail',
  templateUrl: './user-role-detail.component.html',
  styleUrls: ['./user-role-detail.component.css']
})
export class UserRoleDetailComponent implements OnInit {
  public userRole: UserRole;
  public loading: boolean = false;
  public translateStatus = {'a': 'Active', 'd': 'Deleted'};

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private eventService: EventService,
              private userService: UserService,
              private userRoleService: UserRoleService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        // console.log('id', id);
        this.getUserRoleDetail(id);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getUserRoleDetail(userId: number): void {
    this.loading = true;
    this.userRoleService.getUserRoleDetail(userId).subscribe(
      (response: any) => {
        this.userRole = response;
        this.userRole.userName = this.userRole.userSurname + ', ' + this.userRole.userGivenName;
        console.log('userRole', this.userRole);
        this.loading = false;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

}
