import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  updatedata;
  imgUrl: any;
  constructor(private  http: HttpClient) {
  }

   httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'Application/json',Authorization: 'bearer '+this.getToken() })
  };

  // intercept(req, next){
  //   let tok =  localStorage.getItem('token');
  //   console.log(tok);

  //   let tokenVarify = req.clone({
  //     headers: req.headers.set('Authorization',
  //     'Bearer'+tok)
  //   });
  //   return next.handle(tokenVarify);
  // }

  createEmployee( inputData) {
   const  url = 'http://localhost:3000/employee/add/';
   return this.http.post<any>(url,inputData);
  };

  displayEmployee() {
    const url2 = 'http://localhost:3000/employee/display';
    return this.http.get<any>(url2, this.httpOptions);
  }
  getData(id) {
    const url5 = 'http://localhost:3000/employee/data/'+id;
    return this.http.get<any>(url5,this.httpOptions);
  }
  update(id,data) {
    const url4 = 'http://localhost:3000/employee/update/'+id;
    return this.http.patch<any>(url4, data);
  }
  deleteEmp(empId) {
    let id = empId;
    const url3 = 'http://localhost:3000/employee/delete/'+id;
    return this.http.delete<any>(url3, this.httpOptions);
  }

  // ----------------------------------------------------------
  register(regData){
    const url6 = 'http://localhost:3000/employee/register/';
    return this.http.post<any>(url6,regData,this.httpOptions);
  }

  login(logData){
    const url7 = 'http://localhost:3000/employee/login/';
    return this.http.post<any>(url7,logData,this.httpOptions);
  }

  reset(resetData){
    const url8 = 'http://localhost:3000/employee/reset/';
    return this.http.post<any>(url8,resetData);
  }

  resetPassword(resetPass){
    const url9= 'http://localhost:3000/employee/resetpass/';
    return this.http.post<any>(url9,resetPass);
  }
  logedIn(){
    return  localStorage.getItem('token');
  }

  getToken(){
    return  localStorage.getItem('token');
  }
}


