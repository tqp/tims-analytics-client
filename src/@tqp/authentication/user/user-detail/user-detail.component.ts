import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventService } from '../../../services/event.service';
import { RoleService } from '../../services/role.service';
import { AuthService } from '../../services/auth.service';
import { authenticationAnimations } from '../../authentication.animations';
import { UserRoleService } from '../../services/user-role.service';
import { UserRole } from '../../models/UserRole';

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
              private userRoleService: UserRoleService,
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

  private getUserDetail(userId: string): void {
    this.eventService.loadingEvent.emit(true);
    this.loading = true;
    this.userService.getUserDetail(userId).subscribe(
      response => {
        this.user = response;
        console.log('user', this.user);
        this.getUserRoleListByUserId(this.user.userId);
        this.loading = false;
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public getUserRoleListByUserId(userId: number): void {
    this.userRoleListLoading = true;
    this.userRoleService.getUserRoleListByUser(userId).subscribe(
      (userRoleList: UserRole[] | null) => {
        if (userRoleList) {
          console.log('userRoleList', userRoleList);
          userRoleList.forEach((item: UserRole) => {
            this.userRoleListRecords.push(item);
            this.userRoleRecordCount = userRoleList.length;
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

  public openUserRoleCreateDialog(userId: number): void {
    console.log('openUserRoleCreateDialog', userId);
  }

  public openUserEditPage(userId: number): void {
    console.log('openUserEditPage', userId);
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
