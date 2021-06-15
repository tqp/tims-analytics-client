import { Component, HostListener, OnInit } from '@angular/core';
import { Alumni } from '../../models/alumni.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { AlumniService } from '../../services/alumni.service';
import { AlumniContact } from '../../models/alumni-contact.model';
import { tqpCustomAnimations } from '@tqp/animations/tqpCustomAnimations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormattingService } from '../../../../../../@tqp/services/formatting.service';
import { AlumniContactEditDialogComponent } from '../alumni-contact-edit-dialog/alumni-contact-edit-dialog.component';
import { AlumniContactService } from '../../services/alumni-contact.service';

@Component({
  selector: 'app-alumni-detail',
  templateUrl: './alumni-detail.component.html',
  styleUrls: ['./alumni-detail.component.css'],
  animations: [tqpCustomAnimations]
})
export class AlumniDetailComponent implements OnInit {
  public alumni: Alumni;
  public loading: boolean = false;

  // Alumni-Contact List
  public alumniContactListLoading: boolean = false;
  public alumniContactListIsCollapsed: boolean = true;
  public alumniContactListRecords: AlumniContact[] = [];
  public alumniContactListDataSource: AlumniContact[] = [];
  public alumniContactListDisplayedColumns: string[] = [
    'alumniContactId',
    'alumniContactDate'
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService,
              private alumniService: AlumniService,
              private alumniContactService: AlumniContactService,
              private formattingService: FormattingService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const alumniId = params['id'];
        // console.log('alumniId', alumniId);
        this.getAlumniDetail(alumniId);
        this.getAlumniContactListByAlumniId(alumniId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getAlumniDetail(alumniId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.loading = true;
    this.alumniService.getAlumniDetail(alumniId).subscribe(
      (response: Alumni) => {
        // console.log('response', response);
        this.alumni = response;
        this.cleanAlumniData(this.alumni);
        this.loading = false;
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getAlumniContactListByAlumniId(alumniId: number): void {
    this.alumniContactListLoading = true;
    this.alumniContactService.getAlumniContactListByAlumniId(alumniId).subscribe(
      (alumniContactList: AlumniContact[]) => {
        console.log('alumniContactList', alumniContactList);
        this.alumniContactListRecords = [];
        if (alumniContactList) {
          alumniContactList.forEach(item => {
            this.alumniContactListRecords.push(item);
          });
          this.alumniContactListDataSource = this.alumniContactListRecords;
          this.alumniContactListLoading = false;
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public undeleteAlumni(alumni: Alumni): void {
    this.alumniService.undeleteAlumni(alumni).subscribe(
      response => {
        console.log('response: ', response);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['donor-database/alumni-detail', response.alumniId]).then();
      },
      error => {
        console.error('Error: ' + error.message);
      }
    );
  }

  public openAlumniContactCreateDialog(studentId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(AlumniContactEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      if (dialogData) {
        const alumniContact: AlumniContact = {};
        alumniContact.alumniContactId = dialogData.alumniContactId;
        alumniContact.alumniContactDate = this.formattingService.formatStandardDateAsMySql(dialogData.alumniContactDate);
        alumniContact.alumniContactNotes = dialogData.alumniContactNotes;
        console.log('alumniContact', alumniContact);
        this.alumniContactService.createAlumniContact(alumniContact).subscribe(
          response => {
            console.log('response', response);
            this.alumniContactService.getAlumniContactListByAlumniId(this.alumni.alumniId);
          },
          error => {
            console.error('Error: ', error);
          }
        );
      }
    });
  }

  private cleanAlumniData(alumni: Alumni): Alumni {
    alumni.name = alumni.firstName + ' ' + alumni.lastName;
    return alumni;
  }

  public returnToList(): void {
    this.router.navigate(['donor-database/alumni-list']).then();
  }

  public openAlumniEditPage(): void {
    this.router.navigate(['donor-database/alumni-detail-edit', this.alumni.alumniId]).then();
  }

  public toggleAlumniContactListIsCollapsed(event) {
    if (event.target.nodeName === 'SMALL') {
      return;
    }
    this.alumniContactListIsCollapsed = !this.alumniContactListIsCollapsed;
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {

    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.openAlumniEditPage();
    }

    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      this.returnToList();
    }
  }
}
