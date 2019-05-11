import { Injectable } from '@angular/core';
import {Hospital} from './Hospital';
import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicareDataService {

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get('../assets/data/medicare-inpatient-data.json');
  }
}
