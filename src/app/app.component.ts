import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CareCompare';
  avatar: string;

  constructor(
    public auth: AuthService,
  ) {
    auth.authState.subscribe((event: string) => {
      debugger
      if (event === AuthService.SIGN_IN)
        this.checkSession();
      if (event === AuthService.SIGN_OUT)
        this.avatar = undefined;
    });
  }

  ngOnInit() {
    this.checkSession();
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
