import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { AuthGuard } from './auth.guard';
import { HttpService } from './shared/http.service';





@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()


  ],
  providers: [ToastrService,BsModalService, AuthGuard,
              // {
              //   provide:HTTP_INTERCEPTORS,
              //   useClass:HttpService,
              //   multi: true
              // }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
