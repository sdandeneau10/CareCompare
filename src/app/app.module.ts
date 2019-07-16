import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PriceCompareComponent } from './price-compare/price-compare.component';
import { FAQComponent } from './faq/faq.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './account/account.component';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { ProcedureSelectionComponent } from './procedure-selection/procedure-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrgtableComponent } from './drgtable/drgtable.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HospitalPopupComponent } from './hospital-popup/hospital-popup.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MaintenancePageComponent } from './maintenance-page/maintenance-page.component';
import {MatFormFieldModule, MatInputModule} from '@angular/material'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PriceCompareComponent,
    FAQComponent,
    SignUpComponent,
    AccountComponent,
    ProcedureSelectionComponent,
    DrgtableComponent,
    HospitalPopupComponent,
    ContactUsComponent,
    MaintenancePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwzRGaPm9KP5ZjKvNs5qhFs3p0wePaI4c'
    }),
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
