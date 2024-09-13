import { Component, ElementRef, ViewChild } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  selector: 'model-wise-device',
  templateUrl: './model-wise-device.component.html',
  styleUrl: './model-wise-device.component.scss'
})
export class ModelWiseDeviceComponent {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  view: any = [300, 200];
  colorScheme:any = {
    domain: ['pink', '#00008B', '#FFA500', 'red', '#32CD32','skyblue']
  };

  pieData = [
    {
      "name": "v5",
      "value": 1729
    },
    {
      "name": "FT0009",
      "value": 730
    },
    {
      "name": "MT150",
      "value": 721
    },
    {
      "name": "TR06",
      "value": 697
    },
    {
      "name": "FT333",
      "value": 480
    },
    {
      "name": "FT0007",
      "value": 312
    }
  ];

  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';


   resizeObserver!: ResizeObserver;


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
