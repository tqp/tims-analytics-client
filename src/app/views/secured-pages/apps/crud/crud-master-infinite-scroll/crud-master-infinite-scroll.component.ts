import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { FormControl } from '@angular/forms';
import { EventService } from '@tqp/services/event.service';
import { Person } from '@tqp/models/Person';
import { CrudService } from '../crud.service';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { fromEvent, merge, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-master-infinite-scroll',
  templateUrl: './crud-master-infinite-scroll.component.html',
  styleUrls: ['./crud-master-infinite-scroll.component.css']
})
export class CrudMasterInfiniteScrollComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('nameSearchElementRef', {static: true}) nameSearchElementRef: ElementRef;

  private pageIndex = 0;
  private pageSize = 50;
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
  public loadedRecords: number;
  public loadedFirstPage = false;
  public isLoading = false;

  public isFilterApplied = false;

  constructor(private crudService: CrudService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getFirstPage(this.searchParams);
    this.listenForChanges();
  }

  ngAfterViewInit(): void {
    fromEvent(this.matTableRef.nativeElement, 'scroll')
      .pipe(debounceTime(100))
      .subscribe((event: any) => {
        // console.log('event', event);
        this.onTableScroll(event);
      }, error => {
        console.error('Error: ', error);
      });
  }

  ngOnDestroy(): void {
    this.crudService.setNameSearchValue(this.nameSearchFormControl.value);
    this.crudService.setStateSearchValue(this.stateSearchFormControl.value);
  }

  private setInitialFieldValues(): void {
    this.searchParams.nameFilter = null;
    this.searchParams.stateFilter = '';
    this.searchParams.pageIndex = this.pageIndex;
    this.searchParams.pageSize = this.pageSize;
    this.searchParams.sortColumn = 'PERSON_LAST_NAME';
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

  private getFirstPage(searchParams: ServerSidePaginationRequest) {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    // console.log('searchParams', searchParams);
    this.crudService.getPersonList_InfiniteScroll(searchParams).subscribe((response: ServerSidePaginationResponse) => {
        // console.log('getFirstPage response', response);
        response.data.forEach(item => {
          this.records.push(item);
        }, error => {
          console.error('Error: ', error);
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
        });
        this.loadedFirstPage = true;
        this.loadedRecords = this.records.length;
        this.totalRecords = response.totalRecords;
        this.totalNumberOfPages = Math.ceil(this.totalRecords / this.pageSize);
        this.dataSource = this.records;
        // console.log('Loaded Page', this.searchParams.pageIndex + ' of ' + this.totalNumberOfPages);
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
      }, error => {
        console.error('Error: ', error);
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
      }
    );
  }

  private addNextPage(searchParams: ServerSidePaginationRequest): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.records = this.dataSource.map(x => Object.assign({}, x)); // 'Deep' copy datasource array
    this.crudService.getPersonList_InfiniteScroll(searchParams).subscribe((response: ServerSidePaginationResponse) => {
      // console.log('addNextPage response', response);
      response.data.forEach(item => {
        this.records.push(item);
      }, error => {
        console.error('Error: ', error);
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
      });
      this.loadedRecords = this.records.length;
      this.totalRecords = response.totalRecords;
      this.totalNumberOfPages = Math.ceil(this.totalRecords / this.pageSize);
      this.dataSource = this.records;
      // console.log('Loaded Page', this.searchParams.pageIndex + ' of ' + this.totalNumberOfPages);
      this.isLoading = false;
      this.eventService.loadingEvent.emit(false);
    }, error => {
      console.error('Error: ', error);
      this.isLoading = false;
      this.eventService.loadingEvent.emit(false);
    });
  }

  private onTableScroll(e: any): void {
    const scrollThreshold = 200; // If the user has scrolled within 200px of the bottom, add more data.
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far the user has scrolled
    // console.log('tableViewHeight', tableViewHeight, '\ntableScrollHeight', tableScrollHeight, '\nscrollLocation', scrollLocation);
    const scrollDownLimit = tableScrollHeight - tableViewHeight - scrollThreshold;
    if (scrollLocation > scrollDownLimit && this.pageIndex < this.totalNumberOfPages) {
      // if (scrollLocation > scrollDownLimit) {
      this.pageIndex++;
      this.searchParams.pageIndex = this.pageIndex;
      // console.log(`onTableScroll(): Page Index increased to ${this.searchParams.pageIndex}. Now fetching data...`);
      this.addNextPage(this.searchParams);
    }
  }

  private listenForChanges(): void {
    merge(
      this.nameSearchFormControl.valueChanges.pipe(debounceTime(100)),
      this.stateSearchFormControl.valueChanges,
      this.sort.sortChange
    )
      .pipe(
        switchMap(changesDetected => {
          this.isLoading = true;
          this.eventService.loadingEvent.emit(true);

          const nameFilter = this.nameSearchFormControl.value != null ? this.nameSearchFormControl.value : '';
          const stateFilter = this.stateSearchFormControl.value;

          // Translate table columns to database columns for sorting.
          // IMPORTANT: If this translation is incorrect, the query will break!!!
          const translateSortColumnsToDatabaseColumns = {
            lastName: 'PERSON_LAST_NAME',
            firstName: 'PERSON_FIRST_NAME',
            street: 'PERSON_STREET',
            city: 'PERSON_CITY',
            state: 'PERSON_STATE'
          };

          const serverSideSearchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();
          serverSideSearchParams.nameFilter = nameFilter;
          serverSideSearchParams.stateFilter = stateFilter;
          serverSideSearchParams.pageIndex = 0; // reset page to 0
          serverSideSearchParams.pageSize = this.pageSize;
          serverSideSearchParams.sortColumn = (translateSortColumnsToDatabaseColumns[this.sort.active] != null) ?
            translateSortColumnsToDatabaseColumns[this.sort.active] : 'PERSON_LAST_NAME';
          serverSideSearchParams.sortDirection = this.sort.direction;
          this.searchParams = serverSideSearchParams;

          this.isFilterApplied = nameFilter || stateFilter;

          return this.crudService.getPersonList_InfiniteScroll(serverSideSearchParams);
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
          this.loadedRecords = this.records.length;
          this.totalRecords = response.totalRecords;
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
    this.router.navigate(['secured-pages/crud-detail-create-page'], {queryParams: {src: 'crud-master-infinite-scroll'}}).then();
  }

  public openDetailPage(row: any): void {
    this.router.navigate(['secured-pages/crud-detail', row.guid], {queryParams: {src: 'crud-master-infinite-scroll'}}).then();
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
