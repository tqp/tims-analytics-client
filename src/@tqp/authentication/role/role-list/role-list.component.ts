import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Role } from '../../models/Role';
import { RoleService } from '../../services/role.service';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchElementRef', {static: true}) searchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: any = [
    {col: 'roleName', showSmall: true},
    {col: 'roleDescription', showSmall: true}
  ];

  public dataSource: any;
  public recordCount = 0;
  public recordList: Role[] = [];

  constructor(private roleService: RoleService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getRoleList();
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public getRoleList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.roleService.getRoleList().subscribe(
      (roleList: Role[] | null) => {
        if (roleList) {
          // console.log('roleList', roleList);
          roleList.forEach((item: Role) => {
            this.recordList.push(item);
            this.recordCount = roleList.length;
          });

          this.recordList = this.recordList.sort((a, b) => {
            return a.roleName.toLowerCase() < b.roleName.toLowerCase() ? -1 : 1;
          });

          setTimeout(() => {
            this.dataSource = this.recordList;
            this.isLoading = false;
            this.eventService.loadingEvent.emit(false);
            this.listenForFilterChanges();
          }, 0);
        }
      }, (error: any) => {
        this.error = error.message;
        console.error('Error: ', error.message);
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
      }, () => {
      }
    );
  }

  private listenForFilterChanges(): void {
    merge(
      this.searchFormControl.valueChanges.pipe(debounceTime(100)),
      this.sort.sortChange
    ).subscribe(() => {
        this.applyFilters();
      },
      error => {
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
        console.error('Error: ', error.message);
      },
      () => {
      }
    );
  }

  private applyFilters(): void {
    const searchFilter = this.searchFormControl.value != null ? this.searchFormControl.value : '';

    this.dataSource = this.recordList
      .filter(list => {
          return list.roleName.toLowerCase().includes(searchFilter.trim().toLowerCase());
        }
      )
      .sort((a, b) => {
          console.log('sort', this.sort.active, this.sort.direction);
          if (this.sort.direction === 'asc') {
            return (a[this.sort.active].toLowerCase() > b[this.sort.active].toLowerCase()) ? 1 : -1;
          } else {
            return (a[this.sort.active].toLowerCase() < b[this.sort.active].toLowerCase()) ? 1 : -1;
          }
        }
      );

    // this.isFilterApplied = nameFilter;
    this.isLoading = false;
    this.eventService.loadingEvent.emit(false);
  }

  // BUTTONS

  public clearFilters(): void {
    this.searchFormControl.setValue('');
  }

  public openCreateStudentPage(): void {
    this.router.navigate(['students/student-create']).then();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    // console.log(event + ' (' + event.key + ')');

    // CTRL + F
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.searchElementRef.nativeElement.focus();
    }
  }

}
