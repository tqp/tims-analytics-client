import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Person } from '@tqp/models/Person';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@tqp/authentication/services/auth.service';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { debounceTime } from 'rxjs/operators';
import { forkJoin, fromEvent } from 'rxjs';
import { CrudPersonFriendEditDialogComponent } from '../crud-person-friend-edit-dialog/crud-person-friend-edit-dialog.component';
import { ListAddRemoveOutputObject } from '@tqp/models/ListAddRemoveOutputObject';
import {ConfirmDialogComponent} from '@tqp/components/toolkit/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-crud-detail-edit-page',
  templateUrl: './crud-detail-edit-page.component.html',
  styleUrls: ['./crud-detail-edit-page.component.css']
})
export class CrudDetailEditPageComponent implements OnInit {
  public pageSource: string;
  public newRecord: boolean;
  public person: Person;
  public crudEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public listAddRemoveOutputObject: ListAddRemoveOutputObject = {};

  public validationMessages = {
    'lastName': [
      {type: 'required', message: 'A Last Name is required'}
    ],
    'firstName': [
      {type: 'required', message: 'A First Name is required'}
    ],
    'street': [
      {type: 'required', message: 'A Street is required'}
    ],
    'city': [
      {type: 'required', message: 'A City is required.'}
    ],
    'state': [
      {type: 'required', message: 'A State is required'}
    ],
    'zipCode': [
      {type: 'required', message: 'A Zip Code is required'}
    ],
    'homePhone': [],
    'mobilePhone': [],
    'companyName': [],
    'companyWebsite': []
  };

  public phoneMask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  // Person-Friend Table
  @ViewChild('contentPlaceholder', {static: false}) public contentPlaceholder: ElementRef;
  public dataSource: Person[] = [];
  private pageIndex = 1;
  private pageSize = 50;
  private searchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();
  public displayedColumns: string[] = [
    'name'
  ];

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private crudService: CrudService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const guid = params['guid'];
        this.getPersonDetail(guid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.person = new Person();
        this.person.guid = null;
      }
    }).then();

    const src = this.route
      .queryParams
      .subscribe(params => {
        this.pageSource = params.src;
      });
  }

  private initializeForm(): void {
    this.crudEditForm = this.formBuilder.group({
      guid: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      address: this.formBuilder.group({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required)
      }),
      homePhone: new FormControl(''),
      mobilePhone: new FormControl(''),
      companyName: new FormControl(''),
      companyWebsite: new FormControl(''),
    });
  }

  private getPersonDetail(guid: string): void {
    this.crudService.getPersonDetail(guid).subscribe(
      response => {
        this.person = response;
        // console.log('response', response);
        this.crudEditForm.controls['guid'].patchValue(this.person.guid);
        this.crudEditForm.controls['lastName'].patchValue(this.person.lastName);
        this.crudEditForm.controls['firstName'].patchValue(this.person.firstName);
        // Address Sub-Form
        this.crudEditForm.controls['address'].get('street').patchValue(this.person.street);
        this.crudEditForm.controls['address'].get('city').patchValue(this.person.city);
        this.crudEditForm.controls['address'].get('state').patchValue(this.person.state);
        this.crudEditForm.controls['address'].get('zipCode').patchValue(this.person.zipCode);
        // Contact
        this.crudEditForm.controls['homePhone'].patchValue(this.person.homePhone);
        this.crudEditForm.controls['mobilePhone'].patchValue(this.person.mobilePhone);
        // Company
        this.crudEditForm.controls['companyName'].patchValue(this.person.companyName);
        this.crudEditForm.controls['companyWebsite'].patchValue(this.person.companyWebsite);

        // Sub-Form
        this.searchParams.nameFilter = guid;
        this.searchParams.pageIndex = this.pageIndex;
        this.searchParams.pageSize = this.pageSize;
        this.searchParams.sortColumn = null;
        this.searchParams.sortDirection = 'asc';
        this.getSubFirstPage(this.searchParams);

        this.changeDetectorRef.detectChanges();
        fromEvent(this.contentPlaceholder.nativeElement, 'scroll')
          .pipe(debounceTime(100))
          .subscribe((event: any) => {
            // console.log('event', event);
            this.onTableScroll(event);
          });
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // Person-Friend Table

  private getSubFirstPage(searchParams: ServerSidePaginationRequest) {
    const records: Person[] = [];
    this.crudService.getPersonFriendAssociationList_SSP(searchParams).subscribe(response => {
      // console.log('getFirstPage response', response);
      response.data.forEach(item => {
        records.push(item);
      });
      this.dataSource = records;
    }, error => {
      console.error('Error: ', error);
    });
  }

  private addSubNextPage(searchParams: ServerSidePaginationRequest): void {
    const records = this.dataSource.map(x => Object.assign({}, x)); // 'Deep' copy datasource array
    this.crudService.getPersonFriendAssociationList_SSP(searchParams).subscribe(response => {
      // console.log('addNextPage response', response);
      response.data.forEach(item => {
        records.push(item);
      }, error => {
        console.error('Error: ', error);
      });
      this.dataSource = records;
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
      this.addSubNextPage(this.searchParams);
    }
  }

  public openFriendsEditPage(): void {
    // console.log('openFriendsEditPage');
    const personGuid = this.person.guid;
    this.router.navigate(['secured-pages/crud-person-friend-edit-page', personGuid], {queryParams: {src: this.pageSource}}).then();
  }

  public openFriendsEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    const personGuid = this.person.guid;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = personGuid;
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(CrudPersonFriendEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      this.listAddRemoveOutputObject = dialogData;
      if ((this.listAddRemoveOutputObject.itemsToAdd && this.listAddRemoveOutputObject.itemsToAdd.length > 0) ||
        (this.listAddRemoveOutputObject.itemsToRemove && this.listAddRemoveOutputObject.itemsToRemove.length > 0)) {
        // We'll use forkJoin to ensure that we don't redirect the page until both updates have completed.
        const first = this.crudService.addFriends(personGuid, this.listAddRemoveOutputObject.itemsToAdd);
        const second = this.crudService.removeFriends(personGuid, this.listAddRemoveOutputObject.itemsToRemove);
        forkJoin([first, second]).subscribe(
          next => {
            console.log(next);
            console.log('Refresh.');
            this.getPersonDetail(personGuid);
          },
          error => console.log(error)
        );
      } else {
        console.log('No changes made.');
      }
    });
  }

  // BUTTONS

  public test(): void {
    console.log('test');
    const form = this.crudEditForm;

    const changedFields = {};
    Object.keys(form.controls)
      .forEach((fieldId) => {
        const currentControl = form.controls[fieldId];
        if (currentControl.dirty) {
          console.log('currentControl', currentControl);
          changedFields[fieldId] = currentControl.value;
        }
      });
    console.log('changedFields', changedFields);
  }

  public delete(personGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.deletePerson(personGuid).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate([this.getPageSource()]).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    const person = new Person();
    // console.log('crudEditForm', this.crudEditForm.value);
    person.guid = this.crudEditForm.value.guid;
    person.lastName = this.crudEditForm.value.lastName;
    person.firstName = this.crudEditForm.value.firstName;
    person.street = this.crudEditForm.value.address.street;
    person.city = this.crudEditForm.value.address.city;
    person.state = this.crudEditForm.value.address.state;
    person.zipCode = this.crudEditForm.value.address.zipCode;
    person.homePhone = this.crudEditForm.value.homePhone;
    person.mobilePhone = this.crudEditForm.value.mobilePhone;
    person.companyName = this.crudEditForm.value.companyName;
    person.companyWebsite = this.crudEditForm.value.companyWebsite;
    if (this.newRecord) {
      this.crudService.createPerson(person).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['secured-pages/crud-detail', response.guid], {queryParams: {src: this.pageSource}}).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.crudService.updatePerson(person).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['secured-pages/crud-detail', response.guid], {queryParams: {src: this.pageSource}}).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.person.guid) {
      this.router.navigate(['secured-pages/crud-detail', this.person.guid], {queryParams: {src: this.pageSource}}).then();
    } else {
      this.router.navigate([this.getPageSource()]).then();
    }
  }

  private getPageSource(): string {
    switch (this.pageSource) {
      case 'crud-master-client-scroll':
        return 'crud-app/crud-master-client-scroll';
      case 'crud-master-server-scroll':
        return 'crud-app/scroll';
      case 'crud-master-server-pagination':
        return 'crud-app/crud-master-server-pagination';
      default:
        console.error('Page Source was not set properly.');
        return 'crud-app/crud-master-client-scroll';
    }
  }
}
