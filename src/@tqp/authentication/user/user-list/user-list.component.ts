import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchElementRef', {static: true}) searchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: any = [
    {col: 'name', showSmall: true},
    {col: 'username', showSmall: true},
  ];

  public dataSource: any;
  public recordCount = 0;
  public recordList: User[] = [];

  constructor(private userService: UserService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUserList();
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public getUserList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.userService.getUserList().subscribe(
      (userList: User[] | null) => {
        if (userList) {
          // console.log('userList', userList);
          userList.forEach((item: User) => {
            item.name = item.surname + ', ' + item.givenName;
            this.recordList.push(item);
            this.recordCount = userList.length;
          });

          this.recordList = this.recordList.sort((a, b) => {
            return a.surname.toLowerCase() + a.givenName.toLowerCase()
            < b.surname.toLowerCase() + b.givenName.toLowerCase() ? -1 : 1;
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
          const searchFilterAssessment_surname = list.surname.toLowerCase().includes(searchFilter.trim().toLowerCase());
          const searchFilterAssessment_givenName = list.givenName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          return searchFilterAssessment_surname || searchFilterAssessment_givenName;
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
