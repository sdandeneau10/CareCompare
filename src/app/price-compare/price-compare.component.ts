import { Component, OnInit } from '@angular/core';
import {Hospital} from '../Hospital';

@Component({
  selector: 'app-price-compare',
  templateUrl: './price-compare.component.html',
  styleUrls: ['./price-compare.component.css']
})
export class PriceCompareComponent implements OnInit {

  relevantHospitals: Hospital[] = [];
  activeHospital: Hospital;
  procedureName: string;

  constructor() { }

  ngOnInit() {
    // for testing
    this.procedureName = 'Heart Attack';
    for (let i = 0; i < 25; i++) {
      const cost1 = (Math.abs(Math.random()) * 6000) + 1;
      const cost2 = (Math.abs(Math.random()) * 6000) + 1;
      const cost3 = (Math.abs(Math.random()) * 6000) + 1;
      this.relevantHospitals.push(new Hospital('Hospital ' + i, 'x', cost1, cost2, cost3));
    }
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
