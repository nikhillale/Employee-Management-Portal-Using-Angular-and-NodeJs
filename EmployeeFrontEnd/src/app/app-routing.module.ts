import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path : 'employee', loadChildren: './employee/employee.module#EmployeeModule',canActivate:[AuthGuard]},
  { path : 'authentication', loadChildren: './authentication/authentication.module#AuthenticationModule'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
