import { Component, ElementRef, ViewChild } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  selector: 'status-wise-device',
  templateUrl: './status-wise-device.component.html',
  styleUrl: './status-wise-device.component.scss'
})
export class StatusWiseDeviceComponent {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  view: any = [300, 200];
  colorScheme:any = {
    domain: ['pink', '#00008B', '#FFA500', 'red', '#32CD32','skyblue']
  };

  pieData = [
    {
      "name": "Inacitve",
      "value": 1729
    },
    {
      "name": "Suspended",
      "value": 730
    },
    {
      "name": "Has error",
      "value": 721
    },
    {
      "name": "Expiring Soon",
      "value": 697
    },
    {
      "name": "Expired",
      "value": 480
    },
    {
      "name": "Moving",
      "value": 312
    },
    {
      "name": "Stopped",
      "value": 312
    },
    {
      "name": "Offline",
      "value": 312
    }
  ];

  gradient = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = true;
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
