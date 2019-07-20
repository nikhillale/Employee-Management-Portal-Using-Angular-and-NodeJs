import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {validateEmail} from 'src/app/validator';
import {validatePassword} from 'src/app/validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   message;
  constructor(private fb: FormBuilder , private http: HttpService, private router : Router, private toster: ToastrService) { }
  loginForm: FormGroup;

  set: boolean = false;
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', validateEmail],
      password : ['', validatePassword],
      resetEmail: ['', validateEmail]
    })
  }
  onChange(){
    if (this.set == false){
      this.set = true;
    }else{
      this.set = false;
    }
  }
  onSubmit(){
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    console.log(this.loginForm.controls.email);
    let data = {
      email: email,
      password : password
    }
    this.http.login(data).subscribe((response) => {
      localStorage.setItem('token', response.token);
      this.toster.success('Login Successfull','',{positionClass: 'toast-top-center'});
      this.router.navigate(['../employee']);
    }, error => {
      this.toster.error(error.error.error,'Authentication Failed',{
        positionClass: 'toast-top-center'
     });
    })
  }
  onSend(){
    const email2 = this.loginForm.get('resetEmail').value;
    let data = {
        email : email2
      }

    this.http.reset(data).subscribe((response) => {
      console.log(response);
      localStorage.setItem('token', response.token)
      this.toster.success('Reset Password link sent on your registered email','',{
        positionClass: 'toast-top-center'
     });
      this.router.navigate(['authentication/login'])
    })
  }

  get emailId(){
    return this.loginForm.controls.email;
  }
  get password(){
    return this.loginForm.controls.password;
  }
  get resetid(){
    return this.loginForm.controls.resetEmail;
  }

}
