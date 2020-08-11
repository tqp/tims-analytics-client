import {FuseUtils} from '../../../../../@fuse/utils';

export class FuelStation {
    stationGuid?: string;
    stationName?: string;
    stationAffiliation?: string;
    stationAddress1?: string;
    stationAddress2?: string;
    stationCity?: string;
    stationState?: number;
    stationZip?: string;
    stationPhone?: string;
    stationVisitCount?: number;

    constructor(station) {
        {
            this.stationGuid = station.stationGuid || FuseUtils.generateGUID();
            this.stationName = station.stationName || '';
            this.stationAffiliation = station.stationAffiliation || '';
            this.stationAddress1 = station.stationAddress1 || '';
            this.stationAddress2 = station.stationAddress2 || '';
            this.stationCity = station.stationCity || '';
            this.stationState = station.stationState || '';
            this.stationZip = station.stationZip || '';
            this.stationPhone = station.stationPhone || '';
            this.stationVisitCount = station.stationVisitCount || 0;
        }
    }

}
