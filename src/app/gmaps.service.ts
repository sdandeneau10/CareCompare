import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GmapsService {

  constructor(private http: HttpClient) { }

  public getLocation(location: string): Observable<any> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=location&key=AIzaSyAwzRGaPm9KP5ZjKvNs5qhFs3p0wePaI4c');
  }
}
