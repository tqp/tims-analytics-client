import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AwsS3Object } from './AwsS3Object';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AwsS3FileService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public uploadObject(file: File): Observable<HttpEvent<{}>> {
    const url = environment.apiUrl + '/api/v1/amazon-s3-bucket/uploadFile';
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', url, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }

  public getObjectList(): Observable<AwsS3Object[]> {
    const url = environment.apiUrl + '/api/v1/amazon-s3-bucket/listFiles';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<AwsS3Object[]>(url, {
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

  public deleteObject(object: AwsS3Object): Observable<AwsS3Object> {
    console.log('deleteObject');
    const url = environment.apiUrl + '/api/v1/amazon-s3-bucket/deleteFile';
    this.http.post<string>(url, object.key).subscribe(
      res => {
        console.log('res', res);
      },
      () => {
        return object;
      }
    );
    return of(null);
  }


}
