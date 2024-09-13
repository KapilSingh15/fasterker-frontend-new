import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'history-vehicle-on-map',
  templateUrl: './history-vehicle-on-map.component.html',
  styleUrls: ['./history-vehicle-on-map.component.scss']
})
export class HistoryVehicleOnMapComponent {
  map: L.Map | any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
  }

  async initializeMap(): Promise<void> {
    const leafletModule = await import('leaflet');
    const L = leafletModule.default;

    this.map = L.map('map_canvas', {
      center: [28.6139, 77.2088],
      zoom: 13
    });

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    const satelliteLayer = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
      attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
      maxZoom: 21,
      id: 'map'
    });

    const roadLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap France contributors'
    });

    const googleLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps'
    });

    const baseMaps = {
      "OpenStreetMap": osmLayer,
      "Satellite": satelliteLayer,
      "Road": roadLayer,
      "Google Map": googleLayer
    };

    L.control.layers(baseMaps).addTo(this.map);
  }
}
