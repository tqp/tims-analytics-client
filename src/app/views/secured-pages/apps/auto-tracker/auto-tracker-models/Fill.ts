import { CustomUtils } from '@tqp/utils/custom-utils';


export class Fill {
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

  constructor(fill: Fill) {
    {
      this.fillGuid = fill.fillGuid || CustomUtils.generateGUID();
      this.fillDate = fill.fillDate || '';
      this.fillTime = fill.fillTime || '00:00';

      this.fillOdometer = fill.fillOdometer || 0;
      this.fillMilesTraveled = fill.fillMilesTraveled || 0;
      this.fillMilesPerGallon = fill.fillMilesPerGallon || 0;

      this.stationGuid = fill.stationGuid || '';
      this.fillGallons = fill.fillGallons || 0;
      this.fillCostPerGallon = fill.fillCostPerGallon || 0;
      this.fillTotalCost = fill.fillTotalCost || 0;
      this.fillComments = fill.fillComments || '';
    }
  }
}
