import { Component, ElementRef, ViewChild } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';



@Component({
  selector: 'vehicle-milage-graph',
  templateUrl: './vehicle-milage-graph.component.html',
  styleUrl: './vehicle-milage-graph.component.scss'
})
export class VehicleMilageGraphComponent {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  view: any = [800, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Total Milage';

  colorScheme:any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // sample data
  data = [
    {
      "name": "MILEAGE",
      "series": [
        {
          "value": 10,
          "name": "2010"
        },
        {
          "value": 41,
          "name": "2011"
        },
        {
          "value": 35,
          "name": "2012"
        },
        {
          "value": 51,
          "name": "2013"
        }, {
          "value": 49,
          "name": "2014"
        },
        {
          "value": 62,
          "name": "2015"
        }, {
          "value": 69,
          "name": "2016"
        },
        {
          "value": 91,
          "name": "2017"
        },
        {
          "value": 148,
          "name": "2018"
        }
      ]
    },
    
  ];
  private resizeObserver!: ResizeObserver;


  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        this.view = [width, height];
      }
    });

    this.resizeObserver.observe(this.chartContainer.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.chartContainer.nativeElement);
      this.resizeObserver.disconnect();
    }
  }

  
}
