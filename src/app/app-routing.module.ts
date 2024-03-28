import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { InsurancePolicyFormComponent } from './components/insurance-policy-form/insurance-policy-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'insurance-policies', component: InsurancePolicyFormComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
