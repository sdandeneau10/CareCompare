import { Component, OnInit } from '@angular/core';
import {Hospital} from '../Hospital';
import {Location} from '../Location';
import {MedicareDataService} from '../medicare-data.service';
import {HttpClient} from '@angular/common/http';
import {HotObservable} from 'rxjs/internal/testing/HotObservable';

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

  mapButtonStatus: string;

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
    this.mapButtonStatus = "Open Map"

    this.dataRequest.getData('001 - HEART TRANSPLANT OR IMPLANT OF HEART ASSIST SYSTEM W MCC').subscribe(
      (data) => {
        this.relevantHospitals = this.dataRequest.formatData(data, this.drgCode);
        // this.loadImages();
        this.activeSubset = this.relevantHospitals;
        this.loading = false;
        this.calculatePriceExtremes();
      });
  }

  calculatePriceExtremes() {
    for (const h of this.relevantHospitals) {
      const cost = h.getApproxOutOfPocket();
      if (cost < this.minPrice) { this.minPrice = cost; }
      if (cost > this.maxPrice) { this.maxPrice = cost; }
    }
  }
  changeButtonText(){
    if(this.mapButtonStatus === "Open Map"){
      this.mapButtonStatus = "Close Map";
    }
    else{
      this.mapButtonStatus = "Open Map";
    }
    document.getElementById("mapButton").innerText = this.mapButtonStatus;
  }

  getLocation(hos: Hospital): void {
    const medicareapi = 'https://data.medicare.gov/resource/rbry-mqwu.json?provider_id=' + hos.getID();
    this.http.get(medicareapi).subscribe((jsonresult) => {
      if (hos.isGeocoded() !== true) {
        if (jsonresult[0].location) {
          hos.setLat(jsonresult[0].location.coordinates[1]);
          hos.setLong(jsonresult[0].location.coordinates[0]);
          hos.setGeocoded();
        } else {
          const baseurl = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAwzRGaPm9KP5ZjKvNs5qhFs3p0wePaI4c&address=';
          const loc = hos.getFullAddress();
          const url = baseurl + loc;
          this.http.get(url).subscribe( (res) => {
            // @ts-ignore
            hos.setLat(res.results[0].geometry.location.lat);
            // @ts-ignore
            hos.setLong(res.results[0].geometry.location.lng);
          });
          hos.setGeocoded();
        }
      }
    });
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
  distanceChanged(value: string) {
    const val = parseInt(value, 10);
    return null;
  }

  // TODO: implement
  /**
   * Updates activeSubset to reflect the hospitals that fit in the updated range
   * @param value - The value of the slide 0 < value < 10
   */
  ratingChanged(value: string) {
    const val = parseInt(value, 10);
    return null;
  }

  /**
   * Updates activeSubset to reflect the hospitals that fit in the updated range
   * @param value - The value of the slide 0 < value < 10
   */
  priceChanged(value: string) {
    // First convert value to a price
    const val = parseInt(value, 10);
    // tslint:disable-next-line:max-line-length
    const TARG_PRICE = (val / 100.0) * (this.maxPrice - this.minPrice) + this.minPrice; // who's good at math, range can be top heavy, can we make a normal distribution here???
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
    // api key: AIzaSyAjTxBehThv0yV7fu92frwHZ8iirhawO8s
    // custom search engine key: 017661927765718392632:g5y2ligvqqm
    // tslint:disable-next-line:max-line-length
    const baseurl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAjTxBehThv0yV7fu92frwHZ8iirhawO8s&cx=017661927765718392632:g5y2ligvqqm&searchType=image&q=';
    for (const hos of this.relevantHospitals) {
      if (hos.isImgLoaded() !== true) {
        const query = hos.getName() + ' ' + hos.getCity() + ' ' + hos.getState();
        const url = baseurl + query;
        this.http.get(url).subscribe((res) => {
          // @ts-ignore
          hos.setImageUrl(res.items[0].link);
          // console.log(res);
        });
        hos.setImgLoaded();
      }
    }
  }
}
