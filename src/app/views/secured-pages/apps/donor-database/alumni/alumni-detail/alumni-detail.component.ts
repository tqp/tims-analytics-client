import { Component, HostListener, OnInit } from '@angular/core';
import { Alumni } from '../../models/alumni.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-alumni-detail',
  templateUrl: './alumni-detail.component.html',
  styleUrls: ['./alumni-detail.component.css']
})
export class AlumniDetailComponent implements OnInit {
  public alumni: Alumni;
  public loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService,
              private alumniService: AlumniService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        // console.log('id', id);
        this.getAlumniDetail(id);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getAlumniDetail(id: number): void {
    this.eventService.loadingEvent.emit(true);
    this.loading = true;
    this.alumniService.getAlumniDetail(id).subscribe(
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
