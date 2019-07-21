import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CareCompare';
  date = new Date();
  currentyear: number;

  ngOnInit(): void {
    this.currentyear = this.date.getFullYear();
  }
}
