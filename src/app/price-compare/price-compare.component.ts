import { Component, OnInit } from '@angular/core';
import {Hospital} from '../Hospital';
import {MedicareDataService} from '../medicare-data.service';
/*import {GoogleDataService} from '../google-data.service';*/

@Component({
  selector: 'app-price-compare',
  templateUrl: './price-compare.component.html',
  styleUrls: ['./price-compare.component.css']
})
export class PriceCompareComponent implements OnInit {

  relevantHospitals: Hospital[] = [];
  activeSubset: Hospital[] = [];
  hospitalImgURLs: string[][];
  activeHospital: Hospital;
  loading: boolean;

  procedureName: string;
  drgCode: string;
  maxPrice: number;
  minPrice: number;

  constructor(private dataRequest: MedicareDataService, /*private gServ: GoogleDataService*/) { }

  ngOnInit() {
    // Init our variable
    this.drgCode = null;
    this.loading = true;
    this.minPrice = 2000000000;
    this.maxPrice = 0;
    // TODO: allow a user to select this
    this.requestData('');
  }

  getImgQuery(reqText: string): void {
    reqText = reqText.split(' ').join('%20');
    /*const reqUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + reqText +
      '&inputtype=textquery&fields=photos&key=AIzaSyAwzRGaPm9KP5ZjKvNs5qhFs3p0wePaI4c';
    console.log(reqUrl);
    this.gServ.getHospitalImgUrl(reqUrl).subscribe((data: any[]) => {
      console.log(data);
      // return this.gServ.getHospitalImgURL(data['canidates'], '400');
    });*/
  }

  requestData(code: string): void {
    this.dataRequest.getData().subscribe(data => {
      for (let i = 0; i < 1000; i++) {
        if (data[i]['DRG Definition'].indexOf(this.drgCode) >= 0) {
          const temp = new Hospital(
            data[i]['Provider Name'],
            data[i]['Provider Street Address'],
            data[i]['Provider City'],
            data[i]['Provider State'],
            data[i]['Provider Zip Code'],
            data[i]['Average Covered Charges'],
            data[i]['Average Total Payments'],
            data[i]['Average Medicare Payments']);
          this.relevantHospitals.push(temp);
          const cost = temp.getApproxOutOfPocket();
          if (cost > this.maxPrice) { this.maxPrice = cost; }
          if (cost < this.minPrice) { this.minPrice = cost; }
        }
      }
      this.loading = false;
      this.activeSubset = this.relevantHospitals;
      for (const entry of this.relevantHospitals) {
        // entry.imgUrl = this.getImgQuery(entry.name);
        if (entry.imgUrl == null) {
          entry.imgUrl = '../../assets/img/placeholder.jpg';
        }
      }
      console.log('yo');
      this.getImgQuery(this.relevantHospitals[0].name);

    });
  }

  selected(hospital: Hospital): void {
    this.activeHospital = hospital;
  }

  getRelevantHospitals(): Hospital[] {
    return this.relevantHospitals;
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
