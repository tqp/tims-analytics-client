import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { FormControl } from '@angular/forms';
import { Person } from '@tqp/models/Person';
import { EventService } from '@tqp/services/event.service';
import { Router } from '@angular/router';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { merge, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('nameSearchElementRef', {static: true}) nameSearchElementRef: ElementRef;

  public listTitle = 'User List';
  private defaultSortColumn = 'USER_SURNAME';
  private pageIndex = 0;
  public pageSize = 10;
  private totalNumberOfPages: number;
  private searchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();

  public displayedColumns: string[] = [
    'username',
    'name'
  ];

  public userListNameSearchFormControl = new FormControl();

  public records: Person[] = [];
  public dataSource: any[] = [];
  public stateList: string[] = [];

  public totalRecords: number;
  public pageStart: number;
  public pageEnd: number;
  public loadedFirstPage = false;
  public isLoading = false;

  public isFilterApplied = false;

  constructor(private userService: UserService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getPage(this.searchParams);
    this.listenForChanges();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.userService.setUserListNameSearchValue(this.userListNameSearchFormControl.value);
  }

  private calculateTableSize(): number {
    const pixelsAboveTable = 295;
    const pixelsBelowTable = 100; // 62
    const rowHeight = 48;
    this.pageSize = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable) / rowHeight);
    return this.pageSize;
  }

  private setInitialFieldValues(): void {
    this.searchParams.nameFilter = null;
    this.searchParams.stateFilter = '';
    this.searchParams.pageIndex = this.pageIndex;
    this.searchParams.pageSize = this.calculateTableSize();
    this.searchParams.sortColumn = this.defaultSortColumn;
    this.searchParams.sortDirection = 'asc';

    if (this.userService.getUserListNameSearchValue()) {
      const nameSearchValue = this.userService.getUserListNameSearchValue();
      this.userListNameSearchFormControl.setValue(nameSearchValue);
      this.searchParams.nameFilter = nameSearchValue;
    }
  }

  private getPage(searchParams: ServerSidePaginationRequest) {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.userService.getUserList_SSP(searchParams).subscribe((response: ServerSidePaginationResponse) => {
        console.log('getPage response', response);
        response.data.forEach(item => {
          this.records.push(item);
        }, error => {
          console.error('Error: ', error);
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
        });
        this.loadedFirstPage = true;
        this.pageStart = ((this.paginator.pageIndex + 1) - 1) * this.paginator.pageSize + 1;
        this.totalRecords = response.totalRecords;
        const pageEnd = this.pageStart + this.paginator.pageSize - 1;
        this.pageEnd = pageEnd >= this.totalRecords ? this.totalRecords : pageEnd;
        this.totalNumberOfPages = Math.ceil(this.totalRecords / this.pageSize);
        this.dataSource = this.records;
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
      }, error => {
        console.error('Error: ', error);
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
      }
    );
  }

  private listenForChanges(): void {
    merge(
      this.userListNameSearchFormControl.valueChanges.pipe(debounceTime(100)),
      this.sort.sortChange,
      this.paginator.page
    )
      .pipe(
        switchMap(changesDetected => {
          // console.log('changesDetected', changesDetected);
          const paginationChange: boolean = changesDetected.pageIndex && changesDetected.pageSize;
          const sortChange: boolean = changesDetected.active && changesDetected.direction;
          if (!paginationChange && !sortChange) {
            this.paginator.pageIndex = 0; // Reset pagination when a filter change is made.
          }
          this.isLoading = true;
          this.eventService.loadingEvent.emit(true);

          const nameFilter = this.userListNameSearchFormControl.value != null ? this.userListNameSearchFormControl.value : '';

          // Translate table columns to database columns for sorting.
          // IMPORTANT: If this translation is incorrect, the query will break!!!
          const translateSortColumnsToDatabaseColumns = {
            seriesName: this.defaultSortColumn
          };

          const serverSideSearchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();
          serverSideSearchParams.nameFilter = nameFilter;
          serverSideSearchParams.pageIndex = this.paginator.pageIndex;
          serverSideSearchParams.pageSize = this.pageSize;
          serverSideSearchParams.sortColumn = (translateSortColumnsToDatabaseColumns[this.sort.active] != null) ?
            translateSortColumnsToDatabaseColumns[this.sort.active] : this.defaultSortColumn;
          serverSideSearchParams.sortDirection = this.sort.direction;
          this.searchParams = serverSideSearchParams;

          this.isFilterApplied = nameFilter;
          return this.userService.getUserList_SSP(serverSideSearchParams);
        }),
        map((response: ServerSidePaginationResponse) => {
          return response;
        }),
        catchError((error: any) => {
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
          console.error('Error Encountered: ', error);
          return of([]);
        })
      )
      .subscribe((response: ServerSidePaginationResponse) => {
          this.records = [];
          response.data.forEach(item => {
            this.records.push(item);
          }, error => {
            console.error('Error: ', error);
            this.isLoading = false;
            this.eventService.loadingEvent.emit(false);
          });
          this.pageStart = ((this.paginator.pageIndex + 1) - 1) * this.paginator.pageSize + 1;
          this.totalRecords = response.totalRecords;
          const pageEnd = this.pageStart + this.paginator.pageSize - 1;
          this.pageEnd = pageEnd >= this.totalRecords ? this.totalRecords : pageEnd;
          this.totalNumberOfPages = Math.ceil(this.totalRecords / this.pageSize);
          this.dataSource = this.records;
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
        },
        error => {
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
          console.error('Error: ', error.message);
        }
      );
  }

  public clearFilters(): void {
    this.userListNameSearchFormControl.setValue('');
  }

  public openCreateUserPage(): void {
    this.router.navigate(['site-admin/user-create']).then();
  }

  public openDetailPage(row: any): void {
    this.router.navigate(['site-admin/user-detail', row.userGuid]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.userListNameSearchFormControl.setValue('');
      this.nameSearchElementRef.nativeElement.focus();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.openCreateUserPage();
    }
    if (event.ctrlKey && event.key === ',') {
      event.preventDefault();
      // console.log('next', this.paginator.pageIndex);
      // this.paginator.pageIndex = 0;
    }
    if (event.ctrlKey && event.key === '.') {
      event.preventDefault();
      // console.log('next', this.paginator.pageIndex);
    }
  }
}
