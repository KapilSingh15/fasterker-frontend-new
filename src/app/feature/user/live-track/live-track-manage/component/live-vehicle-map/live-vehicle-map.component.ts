import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { EMPTY, from, interval, Subject, Subscription, switchMap, take, takeUntil, tap, timer } from 'rxjs';
import { LiveService } from '../../services/live.service';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'live-vehicle-map',
  templateUrl: './live-vehicle-map.component.html',
  styleUrls: ['./live-vehicle-map.component.scss'],
})
export class LiveVehicleMapComponent {
  map: L.Map | any;
  spinnerLoading: boolean = false;
  subscription: Subscription | any;
  countdown: number | undefined;
  counter: number = 10;
  counterInterval: any = null;
  liveDeviceData: any;
  private markers: L.Marker[] = [];
  private infoVehicleWindows: L.Popup[] = [];
  private clickedMarker: L.Marker | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private liveService: LiveService,
    private commonService: CommonService,
    private cdr : ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
      this.getVehicleData();
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

  getVehicleData() {
    this.spinnerLoading = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  
    this.subscription = timer(0, 10000)
      .pipe(
        tap((value) => {
          this.countdown = value % 10 === 0 ? 0 : 10 - (value % 10);
          this.counter = 10;
          clearInterval(this.counterInterval);
          this.counterInterval = setInterval(() => {
            this.counter--;
          }, 1000);
        }),
        switchMap(() => this.liveService.vehicleList()),
        tap((res: any) => {
          this.spinnerLoading = false;
          this.liveDeviceData = res?.Result?.Data || [];
          this.plotVehicleonMap()
        })
      )
      .subscribe(
        () => {},
        (error) => {
          console.error('Error fetching vehicle data:', error);
          this.spinnerLoading = false;
        }
      );
  }

  private destroy$ = new Subject<void>();

  plotVehicleonMap() {  
    const vehicleObs$ = from(this.liveDeviceData);  
    vehicleObs$.pipe(
      switchMap((vehicle: any, index: number) => {
        if (!vehicle?.Eventdata) {
          return EMPTY;
        };  
        const existingMarkerIndex = this.findExistingMarkerIndex(vehicle.Device.VehicleNo);  
        const canvas = document.createElement('canvas');
        const context: any = canvas.getContext('2d');
  
        const img = new Image();
        img.src = this.commonService.onCheckVehicleDevice(vehicle);
  
        return new Promise(resolve => {
          img.onload = () => {
            const canvasWidth = Math.max(img.width, img.height);
            const canvasHeight = canvasWidth;
  
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
  
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.translate(canvasWidth / 2, canvasHeight / 2);
            context.rotate((vehicle?.Eventdata?.Heading || 0) * Math.PI / 180);
            context.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
            context.rotate(-(vehicle?.Eventdata?.Heading || 0) * Math.PI / 180);
            context.translate(-canvasWidth / 2, -canvasHeight / 2);
  
            const icon = L.icon({
              iconUrl: canvas.toDataURL(),
              iconSize: [40, 40], 
              iconAnchor: [20, 20],  
            });
  
            const newPosition = L.latLng(vehicle?.Eventdata?.Latitude, vehicle?.Eventdata?.Longitude);
  
            resolve({ vehicle, icon, newPosition, existingMarkerIndex });
          };
        }).then((data: any) => {
          const { vehicle, icon, newPosition, existingMarkerIndex } = data;
  
          if (existingMarkerIndex !== -1) {
            this.markers[existingMarkerIndex].setIcon(icon);
            this.markers[existingMarkerIndex].setLatLng(newPosition);
  
            const popup: any = this.infoVehicleWindows[existingMarkerIndex];
            if (popup && this.clickedMarker === this.markers[existingMarkerIndex]) {
              const clickedMarkerText = this.clickedMarker.getTooltip()?.getContent();
              const vehicleInfo = this.liveDeviceData.find((v: any) => v?.Device?.VehicleNo === clickedMarkerText);
              console.log(vehicleInfo);
              
              if (vehicleInfo) {
                const address = {
                  Lat: vehicleInfo?.Eventdata?.Latitude,
                  Lng: vehicleInfo?.Eventdata?.Longitude,
                };  
                const initialContent = 'Address is Loading...';  
                popup.setContent(initialContent).setLatLng(newPosition).openOn(this.map);
             
              }
            }
          } else {
            const popup = L.popup();
            this.createMarker(vehicle, index, icon, popup);
            this.infoVehicleWindows.push(popup);
          }  
          return Promise.resolve();
        });
      }),
      switchMap(() => interval(10000).pipe(takeUntil(this.destroy$))),
      take(1)
    ).subscribe(() => {
      this.cdr.detectChanges();
    });
  }



  findExistingMarkerIndex(vehicleNo: string): any {
    return this.markers.findIndex(
      (marker: any) => marker.getTooltip()?.getContent() === vehicleNo
    );
  }
  
  createMarker(
    vehicle: any,
    index: number,
    icon: any, 
    popup: L.Popup
  ) {
    const newPosition = L.latLng(
      vehicle?.Eventdata?.Latitude,
      vehicle?.Eventdata?.Longitude
    );
      const marker = L.marker(newPosition, {
      icon: icon,
    }).addTo(this.map);
      marker.bindTooltip(`${vehicle?.Device?.VehicleNo}`, {
      direction: 'bottom',
      className: 'map-label',
      permanent: true,
    });
      marker.on('click', () => {
      this.map.closePopup();  
      this.clickedMarker = marker;      
      const initialContent = 'Address is Loading...';
      popup.setContent(initialContent).setLatLng(newPosition).openOn(this.map);
  
      const address = {
        Lat: vehicle?.Eventdata?.Latitude,
        Lng: vehicle?.Eventdata?.Longitude,
      }; 
    });
      this.markers.push(marker);
      const bounds = L.latLngBounds(this.markers.map((m) => m.getLatLng()));
    this.map.fitBounds(bounds);  
  }
  
  
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  confirmVehicle(event:any) {
    console.log("chec",event);
    
  }
}
