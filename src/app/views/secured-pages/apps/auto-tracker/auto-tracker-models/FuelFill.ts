import {CustomUtils} from '@tqp/utils/custom-utils';


export class FuelFill {
  fillGuid?: string;
  stationGuid?: string;
  fillDate?: string;
  fillTime?: string;
  fillOdometer?: number;
  fillMilesTraveled?: number;
  fillMilesPerGallon?: number;
  fillGallons?: number;
  fillCostPerGallon?: number;
  fillTotalCost?: number;
  fillComments?: string;

  /**
   * Constructor
   *
   * @param fuelFill
   */
  constructor(fuelFill: FuelFill) {
    {
      this.fillGuid = fuelFill.fillGuid || CustomUtils.generateGUID();
      this.fillDate = fuelFill.fillDate || '';
      this.fillTime = fuelFill.fillTime || '00:00';

      this.fillOdometer = fuelFill.fillOdometer || 0;
      this.fillMilesTraveled = fuelFill.fillMilesTraveled || 0;
      this.fillMilesPerGallon = fuelFill.fillMilesPerGallon || 0;

      this.stationGuid = fuelFill.stationGuid || '';
      this.fillGallons = fuelFill.fillGallons || 0;
      this.fillCostPerGallon = fuelFill.fillCostPerGallon || 0;
      this.fillTotalCost = fuelFill.fillTotalCost || 0;
      this.fillComments = fuelFill.fillComments || '';
    }
  }
}
