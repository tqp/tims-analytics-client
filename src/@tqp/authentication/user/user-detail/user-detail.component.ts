import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { Role } from '../../../models/Role';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventService } from '../../../services/event.service';
import { RoleService } from '../../services/role.service';
import { AuthService } from '../../services/auth.service';
import { authenticationAnimations } from '../../authentication.animations';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  animations: [authenticationAnimations]
})
export class UserDetailComponent implements OnInit {
  public user: User;
  public loading: boolean = false;

  // User-Role List
  public userRoleListLoading: boolean = false;
  public userRoleListIsCollapsed: boolean = false;
  public userRoleRecordCount: number;
  public userRoleListRecords: Role[] = [];
  public userRoleListDataSource: Role[] = [];
  public userRoleListDisplayedColumns: string[] = [
    'roleName',
    'updatedOn'
  ];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private eventService: EventService,
              private userService: UserService,
              private roleService: RoleService,
              public authService: AuthService) {
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

  private getUserDetail(id: string): void {
    this.eventService.loadingEvent.emit(true);
    this.loading = true;
    this.userService.getUserDetail(id).subscribe(
      response => {
        this.user = response;
        // console.log('user', this.user);
        this.getUserRoleListByUserGuid(this.user.userGuid);
        this.loading = false;
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public getUserRoleListByUserGuid(userGuid: string): void {
    this.userRoleListLoading = true;
    this.roleService.getUserRoleListByUserGuid(userGuid).subscribe(
      (roleList: Role[] | null) => {
        if (roleList) {
          // console.log('roleList', roleList);
          roleList.forEach((item: Role) => {
            this.userRoleListRecords.push(item);
            this.userRoleRecordCount = roleList.length;
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

  public openUserRoleCreateDialog(userGuid: string): void {
    console.log('openUserRoleCreateDialog', userGuid);
  }

  public openUserEditPage(userGuid: string): void {
    console.log('openUserEditPage', userGuid);
  }

  public returnToList(): void {
    this.router.navigate(['admin/user-list']).then();
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
