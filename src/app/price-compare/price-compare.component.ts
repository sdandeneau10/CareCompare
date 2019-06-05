import { Component, OnInit } from '@angular/core';
import {Hospital} from '../Hospital';
import {Location} from '../Location';
import {MedicareDataService} from '../medicare-data.service';
import {HttpClient} from '@angular/common/http';

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
  userLat: number;
  userLong: number;

  procedureName: string;
  drgCode: string;
  maxPrice: number;
  minPrice: number;
  allowUserLocation: boolean;

  constructor(private dataRequest: MedicareDataService, private http: HttpClient) { }

  ngOnInit() {
    this.loading = true;
    this.minPrice = 2000000000;
    this.maxPrice = 0;
    // default worcester ma
    this.userLong = -71.8078491;
    this.userLat = 42.275093;
    // TODO: get DRG code
    this.drgCode = MedicareDataService.selectedDRG;
    // this.getUserLocation();

    this.dataRequest.getData().subscribe(
      (data) => {
        this.relevantHospitals = this.dataRequest.formatData(data, this.drgCode);
        this.activeSubset = this.relevantHospitals;
        this.loading = false;
        this.loadImages();
      });
  }

  getLocation(hos: Hospital): void {
    const baseurl = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAwzRGaPm9KP5ZjKvNs5qhFs3p0wePaI4c&address=';
    const loc = hos.getFullAddress();
    const url = baseurl + loc;
    if (hos.isGeocoded() !== true) {
      this.http.get(url).subscribe( (res) => {
        // @ts-ignore
        hos.setLat(res.results[0].geometry.location.lat);
        // @ts-ignore
        hos.setLong(res.results[0].geometry.location.lng);
      });
      hos.setGeocoded();
    }
  }

  selected(hospital: Hospital): void {
    this.activeHospital = hospital;
   // this.getLocation(hospital);
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
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        this.userLong = long;
        this.userLat = lat;
      });
      this.allowUserLocation = true;
    } else {
      this.allowUserLocation = false;
    }
  }
  loadImages() {
    // tslint:disable-next-line:max-line-length
    // api key: AIzaSyAjTxBehThv0yV7fu92frwHZ8iirhawO8s
    // custom search engine key: 017661927765718392632:g5y2ligvqqm
    // tslint:disable-next-line:max-line-length
    const baseurl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAjTxBehThv0yV7fu92frwHZ8iirhawO8s&cx=017661927765718392632:g5y2ligvqqm&q=';
    for (const hos of this.activeSubset) {
      const query = hos.getName() + ' ' + hos.getCity() + ' ' + hos.getState();
      const url = baseurl + query;
      this.http.get(url).subscribe((res) => {
        // @ts-ignore
        hos.setImageUrl(res.items[0].pagemap.cse_image[0].src);
        console.log(res);
      });
    }
  }
}
