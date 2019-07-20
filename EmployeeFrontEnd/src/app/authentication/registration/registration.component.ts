import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import {validateEmail} from 'src/app/validator';
import {validatePassword} from 'src/app/validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb:FormBuilder , private http:HttpService , private router: Router, private toster:ToastrService) { }
  registrationForm: FormGroup;
  ngOnInit() {
    this.registrationForm= this.fb.group({
      email:['',validateEmail],
      password : ['',validatePassword]
    })
  }
  onSubmit(){
    const email = this.registrationForm.get('email').value;
    const password = this.registrationForm.get('password').value;

    let data ={
        email:email,
        password :password
      }

    this.http.register(data).subscribe((response)=>{
      console.log(response);
      this.toster.success('Registered Successfull');
      this.router.navigate(['authentication/login'])
    })
  }

  get emailId(){
    return this.registrationForm.controls.email;
  }
  get password(){
    return this.registrationForm.controls.password;
  }

}
