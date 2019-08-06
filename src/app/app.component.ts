import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  home: boolean;
  avatar: string;

  ngOnInit(): void {
    this.checkSession();
  }

  constructor(public auth: AuthService, private router: Router) {
    auth.authState.subscribe((event: string) => {
      if (event === AuthService.SIGN_IN) {
        this.checkSession();
      }
      if (event === AuthService.SIGN_OUT) {
        this.avatar = undefined;
      }
    });
  }

  async checkSession() {
    try {
      const userInfo = await Auth.currentUserInfo();
      if (userInfo && userInfo.attributes.profile) {
        const avatar = userInfo.attributes.profile;
        const url = await Storage.vault.get(avatar) as string;
        this.avatar = url;
      }
    } catch (error) {
      console.log('no session: ', error);
    }
  }
  setHomeFlag() {
    if (this.router.url === '/home') {
      this.home = true;
    } else {
      this.home = false;
    }
  }
  getBackgroundColor() {
    if (this.router.url === '/procedureSelection') {
      return '#c4e3f8';
    }
    else{
      return 'white';
    }
  }
}
