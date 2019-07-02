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

  getData(drgDefinition): Observable<any> {
    return this.http.get('https://data.cms.gov/resource/t8zw-d33c.json', {params: {drg_definition: drgDefinition}});
  }

  /**
   * <<<FOR TESTING>>>
   *
   * Replicates sql style commands like get * where
   */
  formatData(data: Observable<any>, drgCode: string): Hospital[] {
    const hospitals: Hospital[] = [];
    for (let i = 0; i < data['length']; i++) { // this error is incorrect, it works, switch to a for of loop in future
      hospitals.push(new Hospital(data[i].provider_name,
        data[i].provider_street_address,
        data[i].provider_city,
        data[i].provider_state,
        data[i].provider_zip_code,
        data[i].total_discharges,
        data[i].average_covered_charges,
        data[i].average_total_payments,
        data[i].average_medicare_payments));
    }
    return hospitals;
  }


}
