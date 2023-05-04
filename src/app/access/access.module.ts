import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccessComponent } from './access.component';

const routes: Routes = [{ path: '', component: AccessComponent }];

@NgModule({
  declarations: [AccessComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AccessModule {}
