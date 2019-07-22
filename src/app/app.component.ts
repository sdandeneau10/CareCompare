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
  termsTitle = 'Terms of Service';
  privacyTitle = 'Privacy Statement';
  termsBody =  '';
  privacyBody =  '';
  termsID = 'termsmodal';
  privacyID = 'privacymodal';

  ngOnInit(): void {
    this.currentyear = this.date.getFullYear();
  }
}
