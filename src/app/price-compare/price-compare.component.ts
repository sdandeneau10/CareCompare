import { Component, OnInit } from '@angular/core';
import {Hospital} from '../Hospital';
import {MedicareDataService} from '../medicare-data.service';

@Component({
  selector: 'app-price-compare',
  templateUrl: './price-compare.component.html',
  styleUrls: ['./price-compare.component.css']
})
export class PriceCompareComponent implements OnInit {

  relevantHospitals: Hospital[] = [];
  activeHospital: Hospital;
  procedureName: string;
  drgCode: string;
  loading: boolean;

  constructor(private dataRequest: MedicareDataService) { }

  ngOnInit() {
    this.loading = true;

    // TODO: allow a user to select this
    this.drgCode = '001';
    this.requestData('');
  }

  requestData(code: string): void {
    this.dataRequest.getData().subscribe(data => {
      for (let i = 0; i < 1000; i++) {
        if (data[i]['DRG Definition'].indexOf(this.drgCode) >= 0) {
          const temp = new Hospital(
            data[i]['Provider Name'],
            data[i]['Provider Street Address'],
            data[i]['Average Covered Charges'],
            data[i]['Average Total Payments'],
            data[i]['Average Medicare Payments']);
          this.relevantHospitals.push(temp);
        }
      }
      this.loading = false;
    });
  }

  selected(hospital: Hospital): void {
    this.activeHospital = hospital;
  }

  getRelevantHospitals(): Hospital[] {
    return this.relevantHospitals;
  }

  getHospitalsInRows(col: number): Hospital[][] {
    const listOfHospitals = this.getRelevantHospitals();
    const formattedList = new Array<Array<Hospital>>();
    for (let i = 0; i <  listOfHospitals.length; i += col) {
      formattedList.push(listOfHospitals.slice(i, i + col));
    }
    return formattedList;
  }
}
