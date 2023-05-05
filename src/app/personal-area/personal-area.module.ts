import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventiveComponent } from './preventive/preventive.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PartnerCompaniesComponent } from './partner-companies/partner-companies.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    PreventiveComponent,
    PaymentMethodsComponent,
    PartnerCompaniesComponent,
    WelcomeComponent,
  ],
  imports: [CommonModule],
})
export class PersonalAreaModule {}
