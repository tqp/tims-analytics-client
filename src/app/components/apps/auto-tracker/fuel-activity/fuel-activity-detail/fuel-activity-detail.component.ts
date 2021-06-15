import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { FuelActivity } from '../../auto-tracker-models/FuelActivity';
import { FuelActivityService } from '../fuel-activity.service';
import { AuthService } from '../../../../../../@tqp/authentication/services/auth.service';

@Component({
  selector: 'app-fuel-activity-detail',
  templateUrl: './fuel-activity-detail.component.html',
  styleUrls: ['./fuel-activity-detail.component.css']
})
export class FuelActivityDetailComponent implements OnInit {
  public pageSource: string;
  public fuelActivity: FuelActivity;
  public dialogRef: any;

  constructor(private route: ActivatedRoute,
              private fuelActivityService: FuelActivityService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const fuelActivityGuid = params['guid'];
        // console.log('fuelActivityGuid', fuelActivityGuid);
        this.getFuelActivityDetail(fuelActivityGuid);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getFuelActivityDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.fuelActivityService.getFuelActivityDetail(guid).subscribe(
      response => {
        // console.log('response', response);
        this.fuelActivity = response;
        // console.log('fillDateTime:', this.fuelActivity.fill.fillDateTime);
        // console.log('fillDate    :', this.fuelActivity.fill.fillDateTime);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public getTotalCostColor(fillGallons: number, fillCostPerGallon: number, fillTotalCost: number): string {
    if (Math.round(fillCostPerGallon * fillGallons) === Math.round(fillTotalCost)) {
      return 'rgb(77, 189, 116)';
    } else {
      return 'rgb(248, 108, 107)';
    }
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

  // Buttons

  public returnToList(): void {
    this.router.navigate(['auto-tracker/fuel-activity-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['auto-tracker/fuel-activity-detail-edit', this.fuelActivity.fill.fillGuid]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.openEditPage();
    }
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      this.returnToList();
    }
  }

}
