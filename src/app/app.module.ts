import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PriceCompareComponent } from './price-compare/price-compare.component';
import { FAQComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PriceCompareComponent,
    FAQComponent,
    AboutComponent,
    SignUpComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
