import { Component, OnInit } from '@angular/core';
import {FaqService} from "../faq.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

  constructor(private questionsService: FaqService) { }
  drgQandA: string[][];
  ngOnInit() {
    this.drgQandA = this.getQuestionsAndAnswers('drg-codes.json');
  }

  getQuestionsAndAnswers(url: string): string[][] {
    console.log('fire!');
    const data: string[][] = [];
    this.questionsService.getQuestions(url).subscribe(results => {
      console.log(results);
      for (const entry in results) {
        console.log(results[entry]);
        data.push(results[entry]);
      }
      this.loaded1 = true;
    });
    console.log('loaded!');
    return data;
  }

}
