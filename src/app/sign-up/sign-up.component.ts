import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  login = true;

  changePage(event) {
    if (event.target.value === 'lg') {
      this.login = true;
    } else {
      this.login = false;
    }
  }
  changeBack(event) {
    this.login = true;
  }

  constructor() { }

  ngOnInit() {
  }

}
