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
   * See bootstrap scroll spy, possible improvement for this page
   */

  /**
   * Also how about that gaussian blur transition???
   */

  /**
   * Current process for selection
   *
   *  1 - Do you have a DRG Code?
   *    - yes, let them enter a drg code (autocomplete? see MEDICARE_DRG_CODES from medicareConstatns
   *      - Search for that code
   *    - no, continue to 2
   *  2 - Enter the name of the procedure
   *  3 - ask if there's any known complications, minor or major.
   */

  /**
   * This page should be heavily integrated with a good FAQs page to make this process as easy as possible. Ease of use
   * and transparency are key
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

  /**
   * This function is garbage
   *
   */
  setCode() {
    MedicareDataService.selectedDRG = this.selectedDRG;
    console.log(MedicareDataService.selectedDRG);
  }

  getPanelClass(active: boolean): string {
    return active ? 'jumbotron' : 'jumbotron blur';
  }
}
