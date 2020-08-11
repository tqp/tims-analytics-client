import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-geo-heatmap',
  templateUrl: './geo-heatmap.component.html',
  styleUrls: ['./geo-heatmap.component.scss']
})
export class GeoHeatmapComponent implements AfterViewInit {
  public map: any;

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.setMapLayer();
    this.initMapClick();
    this.addScaleLayer();

    this.addPolygon_CourtlandPark();
    this.addMarker_StartingPoint();
    this.addIcon_Arrow();

    this.addRunningPath();
    this.addRunningHeatMap();
  }

  // Methods


  private initMap(): void {
    this.map = L.map('map', {
      center: [38.887124592551636, -77.10316658020021],
      zoom: 15
    });
  }

  private setMapLayer(): void {
    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      opacity: 1,
      minZoom: 3,
      maxZoom: 20
    }).addTo(this.map);

    // const dark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    //   maxZoom: 20,
    //   attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
    // }).addTo(this.map);

  }

  private initMapClick(): void {
    this.map.on('click', (e) => {
      const popLocation = e.latlng;
      // console.log('[' + popLocation.lat + ', ' + popLocation.lng + '],');
      console.log('[' + popLocation.lng + ', ' + popLocation.lat + '],');  // GeoJson Format
    });
  }

  private addScaleLayer(): void {
    L.control.scale().addTo(this.map);
  }


  private addPolygon_CourtlandPark(): void {
    const style = {
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.5,
      radius: 50
    };
    this.http.get('../../../../assets/data/courtlandPark.json').subscribe((json: any) => {
      L.geoJSON(json, {style: style}).addTo(this.map);
    });
  }

  private addMarker_StartingPoint(): void {
    const marker = L.marker([38.8891413683246, -77.08895623683931]).addTo(this.map);
  }

  private addIcon_Arrow(): void {
    const downArrow = L.divIcon({
      html: '<i class="fa fa-long-arrow-down" style="color: white;"></i>',
      iconSize: [10, 10],
      className: 'myDivIcon'
    });
    const upArrow = L.divIcon({
      html: '<i class="fa fa-long-arrow-up" style="color: white;"></i>',
      iconSize: [10, 10],
      className: 'myDivIcon'
    });
    const leftArrow = L.divIcon({
      html: '<i class="fa fa-long-arrow-left" style="color: white;"></i>',
      iconSize: [10, 10],
      className: 'myDivIcon'
    });
    const rightArrow = L.divIcon({
      html: '<i class="fa fa-long-arrow-right" style="color: white;"></i>',
      iconSize: [10, 10],
      className: 'myDivIcon'
    });
    L.marker([38.88837725504839, -77.0875668525696], {icon: downArrow}).addTo(this.map);
  }

  private addRunningPath(): void {
    const style = {
      color: 'white',
      dashArray: '10, 10',
      dashOffset: '10'
    };
    this.http.get('../../../../assets/data/runningPath.json').subscribe((json: any) => {
      L.geoJSON(json, {style: style}).addTo(this.map);
    });
  }

  private addRunningHeatMap() {
    this.http.get('./assets/data/runningActual.json').subscribe(
      data => {
        const result: any = data; // Put the data into an object of type 'any'.
        const coordinateArrayLeaflet = []; // Initialize Leaflet coordinate array.

        const coordinateArrayGeoJson = result.features.filter(i => {
          // return i.geometry.type === 'Polygon' ** i.properties.name === '20190506';
          return i.geometry.type === 'Polygon';
        });

        if (coordinateArrayGeoJson) {
          // console.log('matchingArrays:', coordinateArrayGeoJson);
          coordinateArrayGeoJson.forEach(coordinateArray => {
            const coordinateArrays = coordinateArray.geometry.coordinates[0];
            coordinateArrays.forEach(coordinateSet => {
              coordinateArrayLeaflet.push([coordinateSet[1], coordinateSet[0]]);
            });
          });

          const gr = '0: \'black\', 0.5; \'aqua\', 1: \'white\'';

          // @ts-ignore
          L.heatLayer(coordinateArrayLeaflet, {
            minOpacity: 0,
            maxZoom: 18,
            max: 1.0, // default = 1.0
            radius: 7, // default = 25
            blur: 12, // default = 15
            // gradient: {
            //   0.00: 'rgb(247,255,0)',
            //   0.60: 'rgb(39,255,0)',
            //   0.75: 'rgb(255,0,0)',
            //   1.00: 'rgb(255,255,255)'
            // }
            gradient: {
              '0.00': 'rgb(255,0,255)',
              '0.25': 'rgb(0,0,255)',
              '0.50': 'rgb(0,255,0)',
              '0.75': 'rgb(255,255,0)',
              '1.00': 'rgb(255,0,0)'
            }
          }).addTo(this.map);
        } else {
          console.error('No Data Found');
        }
      }
    );
  }

  public resetZoom(): void {
    this.map.flyTo([38.887124592551636, -77.10316658020021], 15, {animate: false});
  }

  public zoomToBuilding(): void {
    this.map.flyTo([38.88878645334424, -77.08898842334749], 18, {animate: false});
  }
}

// private addIcon_Star(): void {
//   const planeIcon = L.icon({
//     iconUrl: './assets/img/icons/star.png',
//     iconSize: [30, 30],
//     iconAnchor: [15, 15]
//   });
//   L.marker([38.88779268196542, -77.10737228393556], {icon: planeIcon}).addTo(this.map);
// }

// loadGeoJson() {
//   const style = {
//     color: 'green',
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
//   };
//
//   this.http.get('../../../../assets/data/runningPath.json').subscribe((json: any) => {
//     console.log('json', json);
//     L.geoJSON(json, {style: style}).addTo(this.map);
//   });
// }

// private addCircle(): void {
//   const circle = L.circle([38.885721584331456, -77.09672927856445], {
//     color: 'red',
//     fillColor: 'red',
//     fillOpacity: 0.5,
//     radius: 50
//   }).addTo(this.map);
// }

// private addPolygon_Building(): void {
//   const timApartment = L.polygon([
//     [38.8890829118616, -77.08944439888002],
//     [38.88941277270135, -77.08858609199525],
//     [38.88795135227787, -77.08843588829042],
//     [38.888368904038224, -77.0893907546997]
//   ]).addTo(this.map);
// }
