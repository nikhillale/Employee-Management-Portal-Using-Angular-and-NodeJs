import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup ,FormBuilder, Validators} from '@angular/forms';
import { HttpService } from './shared/http.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { longStackSupport } from 'q';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'employeeCrud';
  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder , private http : HttpService, private toaster : ToastrService, private modal: BsModalService , private router : Router, private toster:ToastrService){}
  employee : FormGroup;
  modalRef: BsModalRef;
  ngOnInit(){
    this.employee = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      email : ['', [ Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      address : ['', Validators.required],
      contactNumber : ['', [ Validators.required, Validators.pattern(/^[789]\d{9}$/)]]
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modal.show(template);
  }
  checkedLogin(){
    if(localStorage.getItem('token')){
      this.toaster.warning('You are already loged In')
    }else{
      this.router.navigate(['authentication'])

    }
  }
  OnSubmit(){

   const  firstName = this.employee.get('firstName').value;
   const  email = this.employee.get('email').value;
   const  address= this.employee.get('address').value;
   const contactNumber= this.employee.get('contactNumber').value;

   const inputdata = new FormData();
   inputdata.append('firstName', firstName);
   inputdata.append('email',email);
   inputdata.append('address', address);
   inputdata.append('contactNumber', contactNumber);

   this.http.createEmployee(inputdata)
   .subscribe(res =>{
     this.toaster.success('Employee Added Successfully');
     this.modalRef.hide();
   },error=>{
     console.log(error);

     this.toaster.warning('Something Wrong');
   })
  }
  logOut(){
     localStorage.removeItem('token');
     this.toster.success('Logout Successfully');
     this.router.navigate(['authentication/login'])

  }
// --------------------------------------------------------------------------------------
  get name(){
    return this.employee.get('firstName');
  }
  get email(){
    return this.employee.get('email');
  }
  get address(){
    return this.employee.get('address');
  }
  get contact(){
    return this.employee.get('contactNumber');
  }

}
