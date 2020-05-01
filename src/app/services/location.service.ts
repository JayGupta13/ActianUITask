import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';



const API_ENDPONIT: any = environment.LOCATION_API;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public cachs$ = new Map();
  constructor(private http: HttpClient) { }

  private initialCountryName = new BehaviorSubject<any>('');
  public updateCountryName = this.initialCountryName.asObservable();

  getCountryName(countryName) {
    this.initialCountryName.next(countryName);
  }

  private initialLocationCoordinates = new BehaviorSubject<any>('');
  public updateLocationCoordinates = this.initialLocationCoordinates.asObservable();

  getLocationCoordinates(params) {
    this.initialLocationCoordinates.next(params);
  }

  getLocationData(countryName): Observable<any> {
    const apiURL = API_ENDPONIT + countryName;
    const localData = this.cachs$.get(apiURL);
    if (localData) {
      return of(localData);
    } else {
      return this.http.get<any>(apiURL)
        .pipe(tap(res => this.cachs$.set(apiURL, res)));
    }
  }
}
