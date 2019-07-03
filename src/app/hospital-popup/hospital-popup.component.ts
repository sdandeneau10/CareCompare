import {Component, OnInit, Input} from '@angular/core';
import { Hospital } from '../Hospital';

@Component({
  selector: 'app-hospital-popup',
  templateUrl: './hospital-popup.component.html',
  styleUrls: ['./hospital-popup.component.css']
})
export class HospitalPopupComponent implements OnInit {

  @Input() hospitalData: Hospital;
  @Input() userLat: number;
  @Input() userLong: number;
  @Input() allowUserLocation: boolean;

  constructor() { }

  ngOnInit() {
  }
}
