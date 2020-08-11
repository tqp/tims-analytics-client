import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Person } from '@tqp/models/Person';
import { MatSort } from '@angular/material/sort';
import { CrudService } from '../crud.service';
import { EventService } from '@tqp/services/event.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-crud-master-client-scroll',
  templateUrl: './crud-master-client-scroll.component.html',
  styleUrls: ['./crud-master-client-scroll.component.css']
})
export class CrudMasterClientScrollComponent implements OnInit, OnDestroy {
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
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
  public dataSource: Person[] = [];
  public stateList: string[] = [];
  public totalRecords: number;
  public isLoading = false;
  public isFilterApplied = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('nameSearchElementRef', {static: true}) nameSearchElementRef: ElementRef;
  @ViewChild('stateSearchElementRef', {static: true}) stateSearchElementRef: ElementRef;

  constructor(private crudService: CrudService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getPersonList_All();
    this.listenForFilterChanges();
  }

  ngOnDestroy(): void {
    this.crudService.setNameSearchValue(this.nameSearchFormControl.value);
    this.crudService.setStateSearchValue(this.stateSearchFormControl.value);
  }

  private setInitialFieldValues() {
    if (this.crudService.getNameSearchValue()) {
      console.log('nameVal', this.crudService.getNameSearchValue());
      this.nameSearchFormControl.setValue(this.crudService.getNameSearchValue());
    }

    this.crudService.getStateDropDownOptions().subscribe(
      (stateList: string[]) => {
        // console.log('stateList', stateList);
        this.stateList = stateList;
        this.stateSearchFormControl.setValue('', {emitEvent: false});
      }, error => {
        console.error('Error: ', error);
      }, () => {
        const stateSearchValue = this.crudService.getStateSearchValue();
        if (stateSearchValue) {
          console.log('stateVal', stateSearchValue);
          this.stateSearchFormControl.setValue(stateSearchValue);
        }
      });
  }

  private getPersonList_All(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.crudService.getPersonList_All().subscribe(
      (personList: Person[]) => {
        personList.forEach(item => {
          this.records.push(item);
          this.totalRecords = personList.length;
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
        });
        this.dataSource = this.records;
        this.applyFilters();
      }, error => {
        console.error('Error: ', error);
      }, () => {
      }
    );
  }

  private listenForFilterChanges(): void {
    merge(
      this.nameSearchFormControl.valueChanges.pipe(debounceTime(100)),
      this.stateSearchFormControl.valueChanges,
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
        console.log('complete');
      }
    );
  }

  private applyFilters(): void {
    const nameFilter = this.nameSearchFormControl.value != null ? this.nameSearchFormControl.value : '';
    const stateFilter = this.stateSearchFormControl.value;

    this.dataSource = this.records
      .filter(personList => {
          const nameFilterAssessment = personList.lastName.toLowerCase().includes(nameFilter.trim().toLowerCase()) ||
            personList.firstName.toLowerCase().includes(nameFilter.trim().toLowerCase());
          const stateFilterAssessment = stateFilter ? personList.state.toLowerCase() === stateFilter.toLowerCase() : true;
          return nameFilterAssessment && stateFilterAssessment;
        }
      )
      .sort((a, b) => {
        if (this.sort.direction === 'asc') {
          return (a[this.sort.active] > b[this.sort.active]) ? 1 : -1;
        } else {
          return (a[this.sort.active] < b[this.sort.active]) ? 1 : -1;
        }
      });

    this.isFilterApplied = nameFilter || stateFilter;
    this.isLoading = false;
    this.eventService.loadingEvent.emit(false);
  }

  public clearFilters(): void {
    this.nameSearchFormControl.setValue('');
    this.stateSearchFormControl.patchValue('');
    // this.sort.sort({id: 'lastName', start: 'asc', disableClear: false});
  }

  public openCreatePersonPage(): void {
    this.router.navigate(['secured-pages/crud-detail-create-page'], {queryParams: {src: 'crud-master-client-scroll'}}).then();
  }

  public openDetailPage(row: any): void {
    this.router.navigate(['secured-pages/crud-detail', row.guid], {queryParams: {src: 'crud-master-client-scroll'}}).then();
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
