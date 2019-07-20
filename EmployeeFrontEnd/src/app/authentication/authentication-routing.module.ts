import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  { path:'',redirectTo:'login', pathMatch:'full' },
  { path:'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'reset/:Id', component: ResetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
