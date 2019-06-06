import { Component, OnInit } from '@angular/core';
import { MEDICARE_DRG_CODES } from '../medicareConstants';
import { MedicareDataService } from '../medicare-data.service';
import { FormControl } from '@angular/forms';
import { Router} from '@angular/router';


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

  /**OUTDATED!!!!!
   * Old process for selection
   *
   *  1 - Do you have a DRG Code?
   *    - yes, let them enter a drg code (autocomplete? see MEDICARE_DRG_CODES from medicareConstatns
   *      - Search for that code
   *    - no, continue to 2
   *  2 - Enter the name of the procedure
   *  3 - ask if there's any known complications, minor or major.
   */

   /**
    * New process for selection
    *
    *  1 - enter the DRG Code
    *  2 - click enter and you will be navigated to the procedure comparison page
    *
    *  Alternate Flow:
    *  3 - click "what is a DRG?" button
    *  4 - enter the name of the procedure
    *  5 - ask if there's any known complications, minor or major
    */

  /**
   * This page should be heavily integrated with a good FAQs page to make this process as easy as possible. Ease of use
   * and transparency are key
   */

  knowsCode: boolean;
  foundProc: boolean;
  incorrectDRG: boolean;

  drgCodes: string[];
  selectedDRG = '';
  myControl = new FormControl();

  constructor(private router: Router) { }

  ngOnInit() {
    this.drgCodes = MEDICARE_DRG_CODES;
    this.knowsCode = null;
    this.foundProc = null;
    this.incorrectDRG = false;
  }

  /**
   * This function is garbage
   *
   */
  setCode() {
    console.log(this.selectedDRG.length);
    for (const drg of this.drgCodes) {
      if (this.selectedDRG === drg.substr(0, 3)) {
        MedicareDataService.selectedDRG = this.selectedDRG;
        console.log(MedicareDataService.selectedDRG);
        this.router.navigate(['/', 'priceCompare']);
      } else {
        this.incorrectDRG = true;
        console.log('this input is not valid!');
        console.log(this.incorrectDRG);
      }
    }
  }

  getPanelClass(active: boolean): string {
    return active ? 'jumbotron' : 'jumbotron blur';
  }
}
