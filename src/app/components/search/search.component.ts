import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  submitted = false;
  isSpinner = false;
  loadDashboard = false;
  locationDetails: any = [];
  errorMessage: any;
  constructor(private fb: FormBuilder, private locationService: LocationService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchInputForm: ['', Validators.required]
    });
  }

  get f() { return this.searchForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.isSpinner = true;
    let formValue = this.searchForm.value.searchInputForm.toLowerCase();
    this.locationService.getCountryName(formValue);
    this.locationService.getLocationData(formValue).subscribe(data => {
      if (data.results.length === 0) {
        this.errorMessage = "Country name is not valid. Please enter a valid Country Name."
        this.loadDashboard = false;
        this.isSpinner = false;
        return;
      }
      this.updateLocationDetails(data);
    });
  }

  updateLocationDetails(data) {
    this.locationDetails = data;
    this.locationService.getLocationCoordinates(this.locationDetails);
    this.errorMessage = '';
    this.isSpinner = false;
    this.loadDashboard = true;
  }

}
