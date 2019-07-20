import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { CreateComponent } from './create/create.component';
import { DisplayComponent } from './display/display.component';
import { UpdateComponent } from './update/update.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../shared/http.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TagInputModule } from 'ngx-chips';
import { AvatarModule } from 'ngx-avatar';
import {NgxMaskModule} from 'ngx-mask';
import { NgxCurrencyModule } from "ngx-currency";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    CreateComponent,
    DisplayComponent,
    UpdateComponent,
    ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule,
    TagInputModule,
    AvatarModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule
   // ToastrModule.forRoot()
  ],
  providers: [HttpService]

})
export class EmployeeModule { }
