import { Injectable } from '@angular/core';
import {Hospital} from './Hospital';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicareDataService {
  // This class will completely change once backend comes into place, do not want to serve 32mb every time this page is requested

  constructor() { }

  getData(drgCode: string): Observable<Hospital[]> {
    const requestData: Array<Hospital> = new Array<Hospital>();
    for (let i = 0; i < 25; i++) {
      const cost1 = (Math.abs(Math.random()) * 6000) + 1;
      const cost2 = (Math.abs(Math.random()) * 6000) + 1;
      const cost3 = (Math.abs(Math.random()) * 6000) + 1;
      requestData.push(new Hospital('Hospital ' + i, 'x', cost1, cost2, cost3));
    }

    return of(requestData);
  }
}
