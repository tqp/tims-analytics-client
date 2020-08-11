import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as GIO from 'giojs';

@Component({
  selector: 'app-interactive-globe',
  templateUrl: './interactive-globe.component.html',
  styleUrls: ['./interactive-globe.component.scss']
})
export class InteractiveGlobeComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer', {static: true}) rendererContainer: ElementRef;

  private static getConfigs(): any {
    return {
      control: {
        disableUnmentioned: false,
        lightenMentioned: true,
        inOnly: false,
        outOnly: false,
        initCountry: 'US',
        halo: true,
        transparentBackground: false,
        autoRotation: false,
        rotationRatio: 1
      },
      color: {
        surface: '#1A9CB0',
        selected: '#20ABE2',
        in: '#154492',
        out: '#DD380C',
        halo: '#20ABE2',
        background: '#000000'
      },
      brightness: {
        ocean: 0.5,
        mentioned: 0.5,
        related: 0.5
      }
    };
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getData();
  }

  private getData(): void {
    this.http.get('./assets/data/giojsSampleData.json').subscribe(
      (data: any) => {
        const controller = new GIO.Controller(this.rendererContainer.nativeElement, InteractiveGlobeComponent.getConfigs());
        controller.addData(data);
        controller.setAutoRotation(false);
        controller.init();
      }
    );
  }

}
