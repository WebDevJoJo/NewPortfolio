import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { WelcomeComponent } from './welcome/welcome.component';
import { PreventiveComponent } from './preventive/preventive.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PartnerCompaniesComponent } from './partner-companies/partner-companies.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'preventive', component: PreventiveComponent },
  { path: 'payment', component: PaymentMethodsComponent },
  { path: 'companies', component: PartnerCompaniesComponent },
];

@NgModule({
  declarations: [
    PreventiveComponent,
    PaymentMethodsComponent,
    PartnerCompaniesComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class PersonalAreaModule {}
