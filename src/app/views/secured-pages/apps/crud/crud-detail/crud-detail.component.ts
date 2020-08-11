import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Person } from '@tqp/models/Person';
import { CrudDetailEditDialogComponent } from '../crud-detail-edit-dialog/crud-detail-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { EventService } from '@tqp/services/event.service';

@Component({
  selector: 'app-crud-detail',
  templateUrl: './crud-detail.component.html',
  styleUrls: ['./crud-detail.component.css']
})
export class CrudDetailComponent implements OnInit {
  public pageSource: string;
  public person: Person;
  public dialogRef: any;

  // Sub-Table
  @ViewChild('contentPlaceholder', {static: true}) public contentPlaceholder: ElementRef;
  public dataSource: any[] = [];
  private pageIndex = 1;
  private pageSize = 50;
  private searchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();
  public displayedColumns: string[] = [
    'name'
  ];

  constructor(private route: ActivatedRoute,
              private crudService: CrudService,
              private eventService: EventService,
              private router: Router,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    const temp = this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const guid = params['guid'];
        this.getPersonDetail(guid);
      } else {
        console.error('No ID was present.');
      }
    });

    const src = this.route
      .queryParams
      .subscribe(params => {
        this.pageSource = params.src;
      });
  }

  private getPersonDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.crudService.getPersonDetail(guid).subscribe(
      response => {
        this.person = response;
        // console.log('response', response);

        this.searchParams.nameFilter = guid;
        this.searchParams.pageIndex = this.pageIndex;
        this.searchParams.pageSize = this.pageSize;
        this.searchParams.sortColumn = null;
        this.searchParams.sortDirection = 'asc';
        this.getSubFirstPage(this.searchParams);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public returnToList(): void {
    this.router.navigate([this.getPageSource()]).then();
  }

  public openEditPage(): void {
    this.router.navigate(['secured-pages/crud-detail-edit-page', this.person.guid], {queryParams: {src: this.pageSource}}).then();
  }

  private getPageSource(): string {
    switch (this.pageSource) {
      case 'crud-master-client-scroll':
        return 'crud-app/crud-master-client-scroll';
      case 'crud-master-infinite-scroll':
        return 'crud-app/crud-master-infinite-scroll';
      case 'crud-master-server-pagination':
        return 'crud-app/crud-master-server-pagination';
      default:
        console.error('Page Source was not set properly.');
        return 'crud-app/crud-master-client-scroll';
    }
  }

  public openEditDialog(personGuid: string): void {
    this.dialogRef = this._matDialog.open(CrudDetailEditDialogComponent, {
      panelClass: 'crud-edit-dialog',
      data: {
        personGuid: personGuid,
        action: 'edit'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        console.log('response', response);
        // if (!response) {
        //   return;
        // }
        // const actionType: string = response[0];
        // const formData: FormGroup = response[1];
        // switch (actionType) {
        //   case 'save':
        //     this.fuelStationService.updateFuelStation(formData.getRawValue()).then(() => {
        //       this.getFuelStation(formData.getRawValue().stationGuid);
        //     });
        //     break;
        //   case 'delete':
        //     console.log('delete');
        //     // this.deleteContact(contact);
        //     break;
        // }
      }, error => {
        console.error('Error: ', error);
      });
  }

  // Sub

  private getSubFirstPage(searchParams: ServerSidePaginationRequest) {
    const records: Person[] = [];
    this.crudService.getPersonSubList_InfiniteScroll(searchParams).subscribe(response => {
      // console.log('getFirstPage response', response);
      response.data.forEach(item => {
        records.push(item);
      });
      this.dataSource = records;
    }, error => {
      console.error('Error: ', error);
    });
  }

  private onTableScroll(e: any): void {
    const scrollThreshold = 200; // If the user has scrolled within 200px of the bottom, add more data.

    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far the user has scrolled

    // console.log('tableViewHeight', tableViewHeight, '\ntableScrollHeight', tableScrollHeight, '\nscrollLocation', scrollLocation);

    const scrollDownLimit = tableScrollHeight - tableViewHeight - scrollThreshold;
    // if(scrollLocation > scrollDownLimit && this.lastPage < this.totalNumberOfPages) {}
    if (scrollLocation > scrollDownLimit) {
      this.searchParams.pageIndex++;
      // console.log(`onTableScroll(): Page Index increased to ${this.searchParams.pageIndex}. Now fetching data...`);
      this.addNextPage(this.searchParams);
    }
  }

  private addNextPage(searchParams: ServerSidePaginationRequest): void {
    const records = this.dataSource.map(x => Object.assign({}, x)); // 'Deep' copy datasource array
    this.crudService.getPersonList_InfiniteScroll(searchParams).subscribe(response => {
      // console.log('addNextPage response', response);
      response.data.forEach(item => {
        records.push(item);
      }, error => {
        console.error('Error: ', error);
      });
      this.dataSource = records;
    });
  }

}
