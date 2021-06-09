import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Alumni } from '../../models/alumni.model';
import { EventService } from '@tqp/services/event.service';
import { AlumniService } from '../../services/alumni.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alumni-list-deleted',
  templateUrl: './alumni-list-deleted.component.html',
  styleUrls: ['./alumni-list-deleted.component.css']
})
export class AlumniListDeletedComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchElementRef', { static: true }) searchElementRef: ElementRef;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: string[] = [
    'name',
    'gradYear',
    'location',
    'updatedOn'
  ];
  public dataSource: any;
  public recordCount = 0;
  public recordList: Alumni[] = [];

  constructor(private eventService: EventService,
              private alumniService: AlumniService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAlumniListDeleted();
  }

  public getAlumniListDeleted(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.alumniService.getAlumniListDeleted().subscribe(
      (response: any | null) => {
        // console.log('response', response);
        if (response) {
          const alumniList: Alumni[] = response;
          if (alumniList) {
            alumniList.forEach((item: Alumni) => {
              item.name = item.firstName + ' ' + item.lastName;
              item.location = item.city && item.state ? item.city + ', ' + item.state : item.city + item.state;
              this.recordList.push(item);
              this.recordCount = alumniList.length;
            });
            console.log('alumniList', alumniList);

            this.recordList = this.recordList.sort((a, b) => {
              return a.name.toLowerCase() + a.name.toLowerCase()
              < b.name.toLowerCase() + b.name.toLowerCase() ? -1 : 1;
            });

            setTimeout(() => {
              this.dataSource = this.recordList;
              this.isLoading = false;
              this.eventService.loadingEvent.emit(false);
              this.listenForFilterChanges();
            }, 0);
          }
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
          const searchFilterAssessment_lastName = list.lastName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          const searchFilterAssessment_firstName = list.firstName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          return searchFilterAssessment_lastName || searchFilterAssessment_firstName;
        }
      )
      .sort((a, b) => {
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

  public clearFilters(): void {
    this.searchFormControl.setValue('');
  }

  public openCreateAlumniPage(): void {
    this.router.navigate(['donor-database/alumni-create']).then();
  }

  public openAlumniListDeleted(): void {
    this.router.navigate(['donor-database/alumni-list-deleted']).then();
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
