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

  constructor(private dataRequest: MedicareDataService) { }

  ngOnInit() {
    this.requestData('');
  }

  requestData(code: string): void {
    this.dataRequest.getData('').subscribe(arr => {
      this.relevantHospitals = arr;
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
