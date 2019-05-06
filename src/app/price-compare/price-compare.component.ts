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

  constructor() { }

  ngOnInit() {
  }

  selected(hospital: Hospital): void {
    this.activeHospital = hospital;
  }

}
