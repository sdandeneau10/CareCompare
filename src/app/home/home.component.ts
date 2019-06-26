import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { delay } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger("fade-in", [
      transition("void => *", [
        style({opacity: 0}),
        animate("2000ms")
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  title: boolean;
  video: boolean;

  phrase1: boolean;
  phrase2: boolean;
  phrase3: boolean;

  constructor() { }

  ngOnInit() {
    this.animationSequence();
  }

  async animationSequence(){
    this.title = true;
    this.video = false;
    this.phrase1 = false;
    this.phrase2 = false;
    this.phrase3 = false;
    await this.delay(1000);
    this.phrase1 = true;
    await this.delay(333);
    this.phrase2 = true;
    await this.delay(333);
    this.phrase3 = true;
    await this.delay(1000);
    this.video = true;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
