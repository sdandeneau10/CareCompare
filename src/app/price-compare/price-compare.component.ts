import { Component, OnInit } from '@angular/core';
import {Hospital} from '../Hospital';
import {Location} from '../Location';
import {MedicareDataService} from '../medicare-data.service';
import {HttpClient} from '@angular/common/http';
import {HotObservable} from 'rxjs/internal/testing/HotObservable';
import {Router} from "@angular/router";
import {STATES} from '../States';

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
  distancelist: Hospital[] = [];
  pricelist: Hospital[] = [];
  ratinglist: Hospital[] = [];
  hospitalImgURLs: string[][];
  activeHospital: Hospital;
  loading: boolean;
  userLat: number;
  userLong: number;
  states: any[];

  procedureName: string;
  drgCode: string;
  maxPrice: number;
  minPrice: number;
  allowUserLocation: boolean;

  mapButtonStatus: string;
  drgDisplayedCode: string;

  constructor(private dataRequest: MedicareDataService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.states = [];
    this.formatStates();
    this.minPrice = 2000000000;
    this.maxPrice = 0;
    this.userLong = -71.8078491;
    this.userLat = 42.275093;
    // TODO: get DRG code
    this.drgCode = MedicareDataService.selectedDRG;
    if (this.drgCode == null || this.drgCode === '') {
      this.router.navigate(['/', 'procedureSelection']);
    }
    // this.getUserLocation();
    this.drgDisplayedCode = this.drgCode.substring(0, 3);

    this.dataRequest.getData(this.drgCode).subscribe(
      (data) => {
        this.relevantHospitals = this.dataRequest.formatData(data);
        // this.loadImages();
        this.activeSubset = this.relevantHospitals;
        this.ratinglist = this.relevantHospitals;
        this.distancelist = this.relevantHospitals;
        this.pricelist = this.relevantHospitals;
        this.calculatePriceExtremes();
        const providerIDList: number[] = [];
        for (const hospital of this.relevantHospitals) {
          providerIDList.push(hospital.providerID);
        }
        this.dataRequest.getGeneralData(providerIDList).subscribe(
          (data2) => {
            this.dataRequest.addRatings(data2, this.relevantHospitals);
            this.loading = false;
          });
      });
  }

  calculatePriceExtremes() {
    for (const h of this.relevantHospitals) {
      const cost = h.getApproxOutOfPocket();
      if (cost < this.minPrice) { this.minPrice = cost; }
      if (cost > this.maxPrice) { this.maxPrice = cost; }
    }
  }

  getLocation(hos: Hospital): void {
    // tslint:disable-next-line:max-line-length
    if (hos.isGeocoded() !== true) {
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
    this.ratinglist = [];
    const val = parseInt(value, 10);
    for (const hos of this.relevantHospitals) {
      const norm = (((99) * (hos.getRating() - 1)) / (5 - 1)) + 1;
      if (norm >= val) {
        this.ratinglist.push(hos);
        this.filterAll();
      }
    }
  }

  /**
   * Updates activeSubset to reflect the hospitals that fit in the updated range
   * @param value - The value of the slide 0 < value < 10
   */
  priceChanged(value: string) {
    this.pricelist = [];
    const val = parseInt(value, 10);
    for (const hos of this.relevantHospitals) {
      const norm = (((99) * (hos.getApproxOutOfPocket() - this.minPrice)) / (this.maxPrice - this.minPrice)) + 1;
      if (norm <= val) {
        this.pricelist.push(hos);
        this.filterAll();
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
  formatStates() {
    for (const state of STATES) {
      const formattedState = {name: state.substr(3, state.length), code: state.substr(0, 2), checked: false};
      this.states.push(formattedState);
    }
  }
  filterByState() {
    let count = 0;
    this.distancelist = [];
    for (const hos of this.relevantHospitals) {
      for (const state of this.states) {
        if (state.checked === true) {
          count++;
          if (hos.getState() === state.code) {
            this.distancelist.push(hos);
          }
        }
      }
    }
    if (count === 0) {
      this.distancelist = this.relevantHospitals;
    }
    this.filterAll();
  }
  filterAll() {
    this.activeSubset = [];
    for (const hos of this.relevantHospitals) {
      if (this.distancelist.includes(hos) && this.pricelist.includes(hos) && this.ratinglist.includes(hos)) {
        this.activeSubset.push(hos);
      }
    }
  }
}
