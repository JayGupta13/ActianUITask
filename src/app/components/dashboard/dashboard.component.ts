import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  updatedCountryName: any;
  updatedLocationCoordinates: any = [];
  latitude: any;
  longitude: any;
  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.updateCountryName.subscribe(name => this.updatedCountryName = name);
    this.locationService.updateLocationCoordinates.subscribe(response => this.updatedLocationCoordinates = response);

    this.updatedLocationCoordinates.results.forEach(element => {
      this.latitude = element.geometry.location.lat;
      this.longitude = element.geometry.location.lng;
    });
  }
}
