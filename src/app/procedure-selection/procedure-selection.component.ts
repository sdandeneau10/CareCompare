import { Component, OnInit } from '@angular/core';
import { MEDICARE_DRG_CODES } from '../medicareConstants';
import { MedicareDataService } from '../medicare-data.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { delay } from 'q';


@Component({
  selector: 'app-procedure-selection',
  templateUrl: './procedure-selection.component.html',
  styleUrls: ['./procedure-selection.component.css'],
  animations: [
    trigger("flyInOut", [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(100%)'}),
        animate('250ms')
      ]),
      transition('* => void', [
        animate('250ms', style({ opacity: 1, transform: 'translateX(-100%)'}))
      ])
    ])
  ]
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

  showFirstDiv: boolean;
  showSecondDiv: boolean;
  nope: string;

  drgCodes: string[];
  filteredCodes: string[];
  selectedDRG = '';
  control = new FormControl();

  constructor(private router: Router) { }

  ngOnInit() {
    this.nope = 'This DRG code does not exist!';
    this.drgCodes = MEDICARE_DRG_CODES;
    this.filteredCodes = this.drgCodes;
    this.knowsCode = null;
    this.foundProc = null;
    this.incorrectDRG = false;
    this.showFirstDiv = true;
    this.showSecondDiv = false;
  }

  /**
   * This function is garbage
   *
   */
  setCode(s: string) {
    this.selectedDRG = s;
    for (const drg of this.drgCodes) {
      if (this.selectedDRG.substr(0, 3) === drg.substr(0, 3)) {
        MedicareDataService.selectedDRG = drg;
        this.router.navigate(['/', 'priceCompare']);
        return;
      } else {
        this.incorrectDRG = true;
      }
    }
  }
  filter() {
    this.filteredCodes = [];
    for (const code of this.drgCodes) {
      if (code.toLowerCase().includes(this.selectedDRG.toLowerCase())) {
        this.filteredCodes.push(code);
      }
    }
  }

  async switchDiv(){
    this.knowsCode = false;
    this.showFirstDiv = false;
    await delay(250);
    this.showSecondDiv = true;
  }
  goToDRG() {
    this.router.navigate(['/drgtable']);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
