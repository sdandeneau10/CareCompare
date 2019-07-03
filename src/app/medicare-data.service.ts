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
  getGeneralData(id: number) {
    return this.http.get('https://data.medicare.gov/resource/rbry-mqwu.json?provider_id=' + id);
  }

  /**
   * <<<FOR TESTING>>>
   *
   * Replicates sql style commands like get * where
   */
  formatData(data: Observable<any>, drgCode: string): Hospital[] {
    const hospitals: Hospital[] = [];
    for (let i = 0; i < data['length']; i++) { // this error is incorrect, it works, switch to a for of loop in future
      const res = this.getGeneralData(data[i].provider_id);
      const tempHos = new Hospital(
        data[i].provider_id,
        data[i].provider_name,
        data[i].provider_street_address,
        data[i].provider_city,
        data[i].provider_state,
        data[i].provider_zip_code,
        data[i].total_discharges,
        data[i].average_covered_charges,
        data[i].average_total_payments,
        data[i].average_medicare_payments);
      res.subscribe((resp) => {
        tempHos.setPhone(resp[0].phone_number);
        tempHos.setRating(resp[0].hospital_overall_rating);
      });
      hospitals.push(hos);
    }
    return hospitals;
  }


}
