import { Injectable } from '@angular/core';
import { FuelActivity } from '../auto-tracker-models/FuelActivity';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { FuelActivityFlat } from '../auto-tracker-models/FuelActivityFlat';
import { Fill } from '../auto-tracker-models/Fill';
import { Station } from '../auto-tracker-models/Station';

@Injectable({
  providedIn: 'root'
})
export class FuelActivityService {
  private fuelActivityListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              protected tokenService: TokenService) { }

  public createFuelActivity(fuelActivity: FuelActivity): Observable<Fill> {
    const url = environment.apiUrl + '/api/v1/auto-tracker/fuel-activity/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Fill>(url,
        fuelActivity,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
        })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public getFuelActivityList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse> {
    const url = environment.apiUrl + '/api/v1/auto-tracker/fuel-activity/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse>(url,
        serverSideSearchParams,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
        })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public getFuelActivityDetail(guid: string) {
    const url = environment.apiUrl + '/api/v1/auto-tracker/fuel-activity/' + guid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<FuelActivity>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
        })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public updateFuelActivity(fill: Fill): Observable<Fill> {
    const url = environment.apiUrl + '/api/v1/auto-tracker/fuel-activity/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Fill>(url,
        fill,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
        })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public deleteFuelActivity(fuelActivityGuid: string): Observable<string> {
    const url = environment.apiUrl + '/api/v1/auto-tracker/fuel-activity/' + fuelActivityGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.delete<string>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
        })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  retrieveStationNameOptions(filter: string): Observable<Station> {
    // console.log('FuelActivityService -> retrieveStationNameOptions: filter=', filter);
    const url = environment.apiUrl + '/api/v1/auto-tracker/station/auto-complete/station-name';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<any>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {
            filter: filter
          }
        })
        .pipe(
          map(res => {
            // console.log('res', res);
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public flattenFuelActivityObject(object: any): FuelActivityFlat {
    return object.map(item => {
      const fuelActivityFlatObject: FuelActivityFlat = {};
      fuelActivityFlatObject.fillGuid = item.fill.fillGuid;
      fuelActivityFlatObject.fillDateTime = item.fill.fillDateTime;
      fuelActivityFlatObject.fillOdometer = item.fill.fillOdometer;
      fuelActivityFlatObject.stationAffiliation = item.station.stationAffiliation;
      fuelActivityFlatObject.stationLocation = item.station.stationCity + ', ' + item.station.stationState;
      fuelActivityFlatObject.fillMilesTraveled = item.fill.fillMilesTraveled;
      fuelActivityFlatObject.fillGallons = item.fill.fillGallons;
      fuelActivityFlatObject.fillCostPerGallon = item.fill.fillCostPerGallon;
      fuelActivityFlatObject.fillTotalCost = item.fill.fillTotalCost;
      fuelActivityFlatObject.fillMilesPerGallonCar = item.fill.fillMilesPerGallon;
      fuelActivityFlatObject.fillMilesPerGallonCalc = item.fill.fillMilesTraveled / item.fill.fillGallons;
      fuelActivityFlatObject.fillComments = item.fill.fillComments;
      return fuelActivityFlatObject;
    });
  }

  public setFuelActivityListNameSearchValue(val) {
    this.fuelActivityListNameSearchValue = val;
  }

  public getFuelActivityListNameSearchValue() {
    return this.fuelActivityListNameSearchValue;
  }
}
