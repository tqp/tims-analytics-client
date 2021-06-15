import { CustomUtils } from '@tqp/utils/custom-utils';

export class Station {
    stationGuid?: string;
    stationName?: string;
    stationAffiliation?: string;
    stationAddress?: string;
    stationCity?: string;
    stationState?: number;
    stationZip?: string;
    stationPhone?: string;
    stationVisitCount?: number;

    constructor(station) {
        {
            this.stationGuid = station.stationGuid || CustomUtils.generateGUID();
            this.stationName = station.stationName || '';
            this.stationAffiliation = station.stationAffiliation || '';
            this.stationAddress = station.stationAddress || '';
            this.stationCity = station.stationCity || '';
            this.stationState = station.stationState || '';
            this.stationZip = station.stationZip || '';
            this.stationPhone = station.stationPhone || '';
            this.stationVisitCount = station.stationVisitCount || 0;
        }
    }

}
