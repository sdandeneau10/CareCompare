import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PriceCompareComponent } from './price-compare/price-compare.component';
import { FAQComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AccountComponent } from './account/account.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProcedureSelectionComponent } from './procedure-selection/procedure-selection.component';
import { DrgtableComponent } from './drgtable/drgtable.component';
import { MaintenancePageComponent } from "./maintenance-page/maintenance-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'priceCompare', component: PriceCompareComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'account', component: AccountComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'procedureSelection', component: ProcedureSelectionComponent},
  { path: 'drgtable', component: DrgtableComponent},
  { path: 'oops', component: MaintenancePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
