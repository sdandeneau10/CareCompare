import { Injectable } from '@angular/core';
import {Hospital} from './Hospital';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicareDataService {

  public static selectedDRG = '';

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get('../assets/data/medicare-inpatient-data.json');
  }

  /**
   * <<<FOR TESTING>>>
   *
   * Replicates sql style commands like get * where
   */
  formatData(data: Observable<any>, drgCode: string): Hospital[] {
    const MAX_LINES_SEARCHED = 1000;
    const hospitals: Hospital[] = [];
    for  (let i = 0; i < MAX_LINES_SEARCHED; i++) {
      if (data[i]['DRG Definition'].indexOf(drgCode) >= 0) {
        hospitals.push(new Hospital(data[i]['Provider Name'],
          data[i]['Provider Street Address'],
          data[i]['Provider City'],
          data[i]['Provider State'],
          data[i]['Provider Zip Code'],
          data[i]['Total Discharges'],
          data[i]['Average Covered Charges'],
          data[i]['Average Total Payments'],
          data[i]['Average Medicare Payments']));
      }
    }
    return hospitals;
  }


}
