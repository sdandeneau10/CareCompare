import { Component, OnInit } from '@angular/core';
import { MEDICARE_DRG_CODES } from '../medicareConstants';
import { MedicareDataService } from "../medicare-data.service";

@Component({
  selector: 'app-procedure-selection',
  templateUrl: './procedure-selection.component.html',
  styleUrls: ['./procedure-selection.component.css']
})
export class ProcedureSelectionComponent implements OnInit {
  drgCodes: string[];
  selectedDRG = '';
  constructor() { }

  ngOnInit() {
    this.drgCodes = MEDICARE_DRG_CODES;
  }

  setCode() {
    MedicareDataService.selectedDRG = this.selectedDRG;
    console.log(MedicareDataService.selectedDRG);
  }
}
