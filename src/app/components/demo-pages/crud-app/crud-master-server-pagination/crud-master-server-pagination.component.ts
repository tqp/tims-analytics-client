import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { FormControl } from '@angular/forms';
import { Person } from '@tqp/models/Person';
import { CrudService } from '../crud.service';
import { EventService } from '@tqp/services/event.service';
import { Router } from '@angular/router';
import { merge, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-crud-master-server-pagination',
  templateUrl: './crud-master-server-pagination.component.html',
  styleUrls: ['./crud-master-server-pagination.component.css']
})
export class CrudMasterServerPaginationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('nameSearchElementRef', {static: true}) nameSearchElementRef: ElementRef;

  public listTitle = 'Person List';
  private defaultSortColumn = 'PERSON_LAST_NAME';
  private pageIndex = 0;
  public pageSize = 10;
  private totalNumberOfPages: number;
  private searchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();

  public displayedColumns: string[] = [
    'lastName',
    'firstName',
    'street',
    'city',
    'state',
    'actions'
  ];

  public nameSearchFormControl = new FormControl();
  public stateSearchFormControl = new FormControl();

  public records: Person[] = [];
  public dataSource: any[] = [];
  public stateList: string[] = [];

  public totalRecords: number;
  public pageStart: number;
  public pageEnd: number;
  public loadedFirstPage = false;
  public isLoading = false;

  public isFilterApplied = false;

  constructor(private crudService: CrudService,
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
    this.crudService.setNameSearchValue(this.nameSearchFormControl.value);
    this.crudService.setStateSearchValue(this.stateSearchFormControl.value);
  }

  private calculateTableSize(): number {
    const pixelsAboveTable = 295;
    const pixelsBelowTable = 80; // 62
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

    if (this.crudService.getNameSearchValue()) {
      const nameSearchValue = this.crudService.getNameSearchValue();
      console.log('nameVal', nameSearchValue);
      this.nameSearchFormControl.setValue(nameSearchValue);
      this.searchParams.nameFilter = nameSearchValue;
    }

    this.crudService.getStateDropDownOptions().subscribe(
      (stateList: string[]) => {
        // console.log('stateList', this.state.);
        this.stateList = stateList;
        this.stateSearchFormControl.setValue('', {emitEvent: false});
      }, error => {
        console.error('Error: ', error);
      }, () => {
        const stateSearchValue = this.crudService.getStateSearchValue();
        if (stateSearchValue) {
          console.log('stateVal', stateSearchValue);
          this.stateSearchFormControl.setValue(stateSearchValue);
          this.searchParams.stateFilter = stateSearchValue;
        }
      });
  }

  private getPage(searchParams: ServerSidePaginationRequest) {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.crudService.getPersonList_SSP(searchParams).subscribe((response: ServerSidePaginationResponse) => {
        // console.log('getPage response', response);
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
      this.nameSearchFormControl.valueChanges.pipe(debounceTime(100)),
      this.stateSearchFormControl.valueChanges,
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

          const nameFilter = this.nameSearchFormControl.value != null ? this.nameSearchFormControl.value : '';
          const stateFilter = this.stateSearchFormControl.value;

          // Translate table columns to database columns for sorting.
          // IMPORTANT: If this translation is incorrect, the query will break!!!
          const translateSortColumnsToDatabaseColumns = {
            lastName: this.defaultSortColumn,
            firstName: 'PERSON_FIRST_NAME',
            street: 'PERSON_STREET',
            city: 'PERSON_CITY',
            state: 'PERSON_STATE'
          };

          const serverSideSearchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();
          serverSideSearchParams.nameFilter = nameFilter;
          serverSideSearchParams.stateFilter = stateFilter;
          serverSideSearchParams.pageIndex = this.paginator.pageIndex;
          serverSideSearchParams.pageSize = this.pageSize;
          serverSideSearchParams.sortColumn = (translateSortColumnsToDatabaseColumns[this.sort.active] != null) ?
            translateSortColumnsToDatabaseColumns[this.sort.active] : this.defaultSortColumn;
          serverSideSearchParams.sortDirection = this.sort.direction;
          this.searchParams = serverSideSearchParams;

          this.isFilterApplied = nameFilter || stateFilter;
          return this.crudService.getPersonList_SSP(serverSideSearchParams);
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
    this.nameSearchFormControl.setValue('');
    this.stateSearchFormControl.patchValue(''); /// Just to use patchValue instead of setValue.
  }

  public openCreatePersonPage(): void {
    this.router.navigate(['secured-pages/crud-detail-create-page'], {queryParams: {src: 'crud-master-server-pagination'}}).then();
  }

  public openDetailPage(row: any): void {
    this.router.navigate(['secured-pages/crud-detail', row.guid], {queryParams: {src: 'crud-master-server-pagination'}}).then();
  }

  public openPersonEditDialog(row: any): void {
    console.log('openPersonEditDialog', row);
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    // console.log(event + ' (' + event.key + ')');
    // CTRL + F
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.nameSearchElementRef.nativeElement.focus();
    }
  }
}
