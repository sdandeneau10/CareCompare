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
    for (let i = 0; i < 20; i++) {
      this.relevantHospitals.push(new Hospital('Hospital ' + i, 'x', 0, 0, 0));
    }
  }

  selected(hospital: Hospital): void {
    this.activeHospital = hospital;
    console.log('selected' + this.activeHospital.name);
  }

}
