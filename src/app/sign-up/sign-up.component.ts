import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  login = true;

  changePage(event) {
    if (event.target.value === 'l') {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
