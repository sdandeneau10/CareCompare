import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PriceCompareComponent } from './price-compare/price-compare.component';
import { FAQComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path:"home", component: HomeComponent },
  { path:"priceCompare", component: PriceCompareComponent },
  { path:"faq", component: FAQComponent },
  { path:"about", component: AboutComponent},
  { path:"account", component: AccountComponent},
  { path:"sign-up", component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
