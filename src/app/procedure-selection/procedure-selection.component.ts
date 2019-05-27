import { Component, OnInit } from '@angular/core';
import { MEDICARE_DRG_CODES } from '../medicareConstants';
import { MedicareDataService } from '../medicare-data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-procedure-selection',
  templateUrl: './procedure-selection.component.html',
  styleUrls: ['./procedure-selection.component.css']
})
export class ProcedureSelectionComponent implements OnInit {

  /**
   * Current process for selection
   *
   *  1 - Do you have a DRG Code?
   *    - yes >>> let them enter a drg code
   *    - no cont to 2
   *  2 - type in the procedure name
   *    - have option for if cant find procedure. Show them the list of DRGs
   *  3 - ask if there's any known complications, minor or major.
   */

  knowsCode: boolean;
  foundProc: boolean;

  drgCodes: string[];
  selectedDRG = '';
  myControl = new FormControl();

  constructor() { }

  ngOnInit() {
    this.drgCodes = MEDICARE_DRG_CODES;
    this.knowsCode = null;
    this.foundProc = null;
  }

  // I'm so sorry, i threw OOP out the window
  setCode() {
    MedicareDataService.selectedDRG = this.selectedDRG;
    console.log(MedicareDataService.selectedDRG);
  }

  getPanelClass(active: boolean): string {
    return active ? 'jumbotron' : 'jumbotron blur';
  }
}
