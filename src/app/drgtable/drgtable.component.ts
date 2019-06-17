import { Component, OnInit } from '@angular/core';
import { MEDICARE_DRG_CODES } from '../medicareConstants';

@Component({
  selector: 'app-drgtable',
  templateUrl: './drgtable.component.html',
  styleUrls: ['./drgtable.component.css']
})
export class DrgtableComponent implements OnInit {
  fulldrgCodes: string[];
  drgcodes: string[] = [];
  p: number;
  nope: string;

  constructor() { }

  ngOnInit() {
    this.p = 1;
    this.nope = 'This drg does not exist!';
    this.fulldrgCodes = MEDICARE_DRG_CODES;
    this.getCodes();
  }
  getCodes() {
    for (const drg of this.fulldrgCodes) {
      const code = drg.substr(0, 3);
      this.drgcodes.push(code);
    }
  }
}

