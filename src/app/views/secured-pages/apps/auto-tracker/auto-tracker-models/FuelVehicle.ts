import { CustomUtils } from '@tqp/utils/custom-utils';

export class FuelVehicle {
    vehicleGuid?: string;
    vehicleName?: string;
    vehicleMake?: string;
    vehicleModel?: string;
    vehicleYear?: number;
    vehicleVin?: string;

    constructor(vehicle) {
        {
            this.vehicleGuid = vehicle.vehicleGuid || CustomUtils.generateGUID();
            this.vehicleName = vehicle.vehicleName || '';
            this.vehicleMake = vehicle.vehicleMake || '';
            this.vehicleModel = vehicle.vehicleModel || '';
            this.vehicleYear = vehicle.vehicleYear || new Date().getFullYear();
            this.vehicleVin = vehicle.vehicleVin || '';
        }
    }

}
