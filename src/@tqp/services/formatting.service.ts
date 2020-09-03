import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FormattingService {
  private standardDateFormat = 'MM/DD/YYYY';
  private mySqlDateFormat = 'YYYY-MM-DD';

  constructor() {
  }

  public formatStandardDateAsMySql(standardFormattedDate: string): string {
    console.log('standardFormattedDate', standardFormattedDate);
    return standardFormattedDate !== null ? moment(standardFormattedDate, this.standardDateFormat).format(this.mySqlDateFormat) : null;
  }

  public formatMySqlDateAsStandard(mySqlFormattedDate: string): string {
    console.log('mySqlFormattedDate', mySqlFormattedDate);
    console.log('isUndefined', mySqlFormattedDate !== undefined);
    return mySqlFormattedDate !== undefined ? moment(mySqlFormattedDate, this.mySqlDateFormat).format(this.standardDateFormat) : null;
  }

}
