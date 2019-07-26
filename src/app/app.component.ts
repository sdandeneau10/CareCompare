import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { OnInit } from '@angular/core';
import {PRIVACY} from "./Privacy";
import {TERMS} from "./Terms";

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
  termsBody =  TERMS;
  privacyBody = PRIVACY;
  termsID = 'termsmodal';
  privacyID = 'privacymodal';
  avatar: string;

  ngOnInit(): void {
    this.currentyear = this.date.getFullYear();
    this.checkSession();
  }

  constructor(public auth: AuthService) {
    auth.authState.subscribe((event: string) => {
      debugger
      if (event === AuthService.SIGN_IN)
        this.checkSession();
      if (event === AuthService.SIGN_OUT)
        this.avatar = undefined;
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
}
