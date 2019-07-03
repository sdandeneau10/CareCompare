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
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://data.cms.gov/resource/t8zw-d33c.json?$$app_token=wawW1EcHvX5JhsX60wSxIyVKj', {params: {drg_definition: drgDefinition}});
  }
  getGeneralData(id: number) {
    return this.http.get('https://data.medicare.gov/resource/rbry-mqwu.json?$$app_token=wawW1EcHvX5JhsX60wSxIyVKj&provider_id=' + id);
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
      res.subscribe((resp) => { // is there a way to do this in bulk, i bet so using some SODA filter queries
        tempHos.setPhone(resp[0].phone_number);
        tempHos.setRatingMetrics(
          resp[0].hospital_overall_rating,
          resp[0].mortality_national_comparison,
          resp[0].safety_of_care_national_comparison,
          resp[0].readmission_national_comparison,
          resp[0].patient_experience_national_comparison,
          resp[0].effectiveness_of_care_national_comparison,
          resp[0].timeliness_of_care_national_comparison,
          resp[0].efficient_use_of_medical_imaging_national_comparison);
      });
      hospitals.push(tempHos);
    }
    return hospitals;
  }


}
