import { Component, OnInit } from '@angular/core';
import { MEDICARE_DRG_CODES } from '../medicareConstants';

@Component({
  selector: 'app-drgtable',
  templateUrl: './drgtable.component.html',
  styleUrls: ['./drgtable.component.css']
})
export class DrgtableComponent implements OnInit {
  drgCodes: string[];

  constructor() { }

  ngOnInit() {
    this.drgCodes = MEDICARE_DRG_CODES;
  }

}
