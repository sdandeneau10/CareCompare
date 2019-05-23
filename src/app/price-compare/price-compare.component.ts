import { Component, OnInit } from '@angular/core';
import {Hospital} from '../Hospital';
import {Location} from '../Location';
import {MedicareDataService} from '../medicare-data.service';
import {GmapsService} from '../gmaps.service';
import {geocodemodule} from 'src/assets/ExternJavascript/GeoCode.js';

@Component({
  selector: 'app-price-compare',
  templateUrl: './price-compare.component.html',
  styleUrls: ['./price-compare.component.css']
})
export class PriceCompareComponent implements OnInit {

  // Array with all the hospitals with the DRG
  relevantHospitals: Hospital[] = [];
  // Array with all active hospitals according to the selection
  activeSubset: Hospital[] = [];
  relevantLocations: Location[] = [];
  hospitalImgURLs: string[][];
  activeHospital: Hospital;
  loading: boolean;

  procedureName: string;
  drgCode: string;
  maxPrice: number;
  minPrice: number;

  constructor(private dataRequest: MedicareDataService, private gmapsRequest: GmapsService) { }

  ngOnInit() {
    this.loading = true;
    this.minPrice = 2000000000;
    this.maxPrice = 0;
    // TODO: get DRG code
    this.drgCode = MedicareDataService.selectedDRG;

    this.dataRequest.getData().subscribe(
      data => {
        this.relevantHospitals = this.dataRequest.formatData(data, this.drgCode);
        this.activeSubset = this.relevantHospitals;
        // this.getAllLocations(this.relevantHospitals);
        this.loading = false;
      });
    this.getAllLocations(this.activeSubset);


  }

  getAllLocations(list: Hospital[]): void {
    // tslint:disable-next-line:prefer-for-of
    /*for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      this.gmapsRequest.getLocation(list[i].getFullAddress()).subscribe((data: any) => {
        const myLat = data.data.results[0].geometry.location.lat;
        const myLong = data.data.results[0].geometry.location.long;
        const adr = data.data.results[0].formatted_address;
        const temp = new Location();
        temp.setLat(myLat);
        temp.setLong(myLong);
        temp.setAddress(adr);
        this.relevantLocations.push(temp);
      });
    }*/
    for (const i of list) {
      const coord = geocodemodule.geocode(i.getFullAddress());
      i.setLat(coord.lat);
      i.setLong(coord.lng);
    }
  }

  selected(hospital: Hospital): void {
    this.activeHospital = hospital;
  }

  getHospitalsInRows(col: number): Hospital[][] {
    const listOfHospitals = this.activeSubset;
    const formattedList = new Array<Array<Hospital>>();
    for (let i = 0; i <  listOfHospitals.length; i += col) {
      formattedList.push(listOfHospitals.slice(i, i + col));
    }
    return formattedList;
  }

  // TODO: implement
  /**
   * Updates activeSubset to reflect the hospitals that fit in the updated range
   * @param value - The value of the slide 0 < value < 10
   */
  distanceChanged(value: number) {
    return null;
  }

  // TODO: implement
  /**
   * Updates activeSubset to reflect the hospitals that fit in the updated range
   * @param value - The value of the slide 0 < value < 10
   */
  ratingChanged(value: number) {
    return null;
  }

  /**
   * Updates activeSubset to reflect the hospitals that fit in the updated range
   * @param value - The value of the slide 0 < value < 10
   */
  priceChanged(value: number) {
    // First convert value to a price
    const TARG_PRICE = (value / 100.0) * (this.maxPrice - this.minPrice) + this.minPrice;
    this.activeSubset = [];
    for (const hospital of this.relevantHospitals) {
      if (hospital.getApproxOutOfPocket() < TARG_PRICE) {
        this.activeSubset.push(hospital);
      }
    }
  }
}
