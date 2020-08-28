import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServerSidePaginationRequest } from '../../../../../../../@tqp/models/ServerSidePaginationRequest';
import { FormControl } from '@angular/forms';
import { Person } from '../../../../../../../@tqp/models/Person';
import { EventService } from '../../../../../../../@tqp/services/event.service';
import { Router } from '@angular/router';
import { ServerSidePaginationResponse } from '../../../../../../../@tqp/models/ServerSidePaginationResponse';
import { merge, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { FuelActivityService } from '../fuel-activity.service';
import { FuelActivityFlat } from '../../auto-tracker-models/FuelActivityFlat';

@Component({
  selector: 'app-fuel-activity-list',
  templateUrl: './fuel-activity-list.component.html',
  styleUrls: ['./fuel-activity-list.component.css']
})
export class FuelActivityListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('nameSearchElementRef', {static: true}) nameSearchElementRef: ElementRef;

  public listTitle = 'Fuel Activity';
  private defaultSortColumn = 'FILL_DATE';
  private defaultSortDirection = 'DESC';
  private pageIndex = 0;
  public pageSize = 10;
  private totalNumberOfPages: number;
  private searchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();

  public displayedColumns: string[] = [
    'fillDate',
    'stationAffiliation',
    'stationLocation',
    'fillOdometer',
    'fillMilesTraveled',
    'fillGallons',
    'fillCostPerGallon',
    'fillTotalCost',
    'fillMilesPerGallon',
  ];

  public fuelActivityListNameSearchFormControl = new FormControl();

  public records: Person[] = [];
  public dataSource: any[] = [];
  public stateList: string[] = [];

  public totalRecords: number;
  public pageStart: number;
  public pageEnd: number;
  public loadedFirstPage = false;
  public isLoading = false;

  public isFilterApplied = false;

  constructor(private fuelActivityService: FuelActivityService,
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
    this.fuelActivityService.setFuelActivityListNameSearchValue(this.fuelActivityListNameSearchFormControl.value);
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
    this.searchParams.sortDirection = this.defaultSortDirection;

    if (this.fuelActivityService.getFuelActivityListNameSearchValue()) {
      const nameSearchValue = this.fuelActivityService.getFuelActivityListNameSearchValue();
      this.fuelActivityListNameSearchFormControl.setValue(nameSearchValue);
      this.searchParams.nameFilter = nameSearchValue;
    }
  }

  private getPage(searchParams: ServerSidePaginationRequest) {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.fuelActivityService.getFuelActivityList_SSP(searchParams).subscribe((response: ServerSidePaginationResponse) => {
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

        const flat: any = this.fuelActivityService.flattenFuelActivityObject(this.records);
        // console.log('flat', flat);

        this.dataSource = flat;
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
      this.fuelActivityListNameSearchFormControl.valueChanges.pipe(debounceTime(100)),
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

          const nameFilter = this.fuelActivityListNameSearchFormControl.value != null ? this.fuelActivityListNameSearchFormControl.value : '';

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
          return this.fuelActivityService.getFuelActivityList_SSP(serverSideSearchParams);
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

          const flat: any = this.fuelActivityService.flattenFuelActivityObject(this.records);
          // console.log('flat', flat);

          this.dataSource = flat;
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

  public getMilesPerGallonColor(car: number, calc: number): string {
    const abs = Math.abs(car - calc);
    if (abs > 4) {
      return 'rgb(248, 108, 107)';
    } else if (abs > 2) {
      return 'rgb(255, 193, 7)';
    } else {
      return 'rgb(77, 189, 116)';
    }
  }

  public getTotalCostColor(fillGallons: number, fillCostPerGallon: number, fillTotalCost: number): string {
    if (Math.round(fillCostPerGallon * fillGallons) === Math.round(fillTotalCost)) {
      return 'rgb(77, 189, 116)';
    } else {
      return 'rgb(248, 108, 107)';
    }
  }

  public clearFilters(): void {
    this.fuelActivityListNameSearchFormControl.setValue('');
  }

  public openCreateFuelActivityPage(): void {
    this.router.navigate(['auto-tracker/fuel-activity-create']).then();
  }

  public openDetailPage(row: any): void {
    this.router.navigate(['auto-tracker/fuel-activity-detail', row.fillGuid]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.fuelActivityListNameSearchFormControl.setValue('');
      this.nameSearchElementRef.nativeElement.focus();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.openCreateFuelActivityPage();
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
