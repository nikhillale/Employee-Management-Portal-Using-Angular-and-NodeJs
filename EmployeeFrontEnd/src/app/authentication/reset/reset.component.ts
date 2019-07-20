import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(private fb:FormBuilder , private http:HttpService , private router: Router, private active: ActivatedRoute) { }
  resetForm: FormGroup;
  resetId :any;
  enable:any;
  ngOnInit() {
   this.resetId = this.active.snapshot.paramMap.get('Id');
   console.log(this.resetId);

   this.resetForm= this.fb.group({
      password:[''],
      conform:['']
    })

   if(localStorage.getItem('token')){
      this.enable = true;
    } else {
      this.router.navigate(['authentication/login'])
    }
  }
  onSubmit(){
    const password = this.resetForm.get('conform').value;
    let data = {
        email : this.resetId,
        password : password
      }

    this.http.resetPassword(data).subscribe((response)=>{
      console.log(response);
      localStorage.removeItem('token');
      this.router.navigate(['authentication/login'])
    })
  }

}
