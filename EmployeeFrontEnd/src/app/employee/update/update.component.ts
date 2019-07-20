import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { validatDob } from 'src/app/validator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  updateEmp: FormGroup;
  empdata;
  data = [];
  message: Boolean = false;
  count = 0;
  imageFiles :File = null;
   inputData = new FormData();
  flag = false;
  url = 'http://localhost:3000/upload/2019-07-08T07:27:52.511Zlogo.png';
   HobbiesArr : any= [
    {id: 1, name: 'PlayingCricket', value : false},
    {id: 2, name: 'Singing', value : false},
    {id: 3, name: 'Playingfootball', value : false},
    {id: 4, name: 'Reading', value : false},
    {id: 5, name: 'Music', value : false},
  ];
  hb: any;
  constructor(private router: Router, private fb: FormBuilder, private Service: HttpService , private active: ActivatedRoute) { }


  StateList: Array<any> = [
    { name: 'Maharashtra', cities: ['Pune', 'Mumbai', 'Nashik'] },
    { name: 'Uttar Pradesh', cities: ['Aagra', 'Aligad', 'Noidia'] },
  ];
  cities: Array<any>;
  changeState(state) {
    this.updateEmp.patchValue({cities :''})
    if(state){
      this.cities = this.StateList.find(con => con.name == state).cities;
    }

  }
  get hobbies() {
    return this.updateEmp.get('hobbies') as FormArray;
  }
  ngOnInit() {

    this.updateEmp = this.fb.group({
      firstName : ['', [Validators.required, Validators.minLength(3)]],
      lastName : ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern( '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]],
      gender : ['', Validators.required],
      age : ['', [Validators.required, Validators.pattern('^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$')]],
      salary : ['', Validators.required],
      Dob :Date,
      address : ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      hobbies : this.fb.array([]),
      states : ['', validatDob],
      cityes: ['', validatDob],
      pinCode: ['', [Validators.required, Validators.pattern(/^[0-9]\d{5}$/)]],
      skills :['', [Validators.required, Validators.minLength(2)]]


    });
    this.HobbiesArr.map((o, i) => {
      const control = new FormControl(i);
      (this.updateEmp.controls.hobbies as FormArray).push(control);
    });
    this.operationUp();
  }

  operationUp() {
    let id = this.active.snapshot.paramMap.get('id');
    this.Service.getData(id)
    .subscribe(response => {
      this.empdata = response.EmployeeDetails;

      if(this.empdata[0].states !== '' ){
        this.changeState(this.empdata[0].states);
        this.updateEmp.patchValue({skills: JSON.parse(this.empdata[0].skills)})
      }

      this.url ='http://localhost:3000/'+ this.empdata[0].profileimage;

      this.empdata[0].hobbies.map((v,i) =>{
        v === "true" ?this.HobbiesArr[i].value = true : this.HobbiesArr[i].value=false;
      })
      console.log(this.empdata[0]);

      this.updateEmp.patchValue({
        firstName : this.empdata[0].firstName,
        lastName : this.empdata[0].lastName,
        email : this.empdata[0].email,
        gender : this.empdata[0].gender,
        age : this.empdata[0].age,
        salary : this.empdata[0].salary,
        Dob : new Date(this.empdata[0].Dob),
        address : this.empdata[0].address,
        contactNumber: this.empdata[0].contactNumber,
        states : this.empdata[0].states,
        cityes: this.empdata[0].cityes ,
        pinCode: this.empdata[0].pinCode,
        profileimage :this.empdata[0].profileimage,
       // skills :JSON.parse(this.empdata[0].skills)
      });
      for (let i = 0 ; i < this.HobbiesArr.length; i++) {
        this.updateEmp.controls.hobbies.get(i.toString()).patchValue(this.HobbiesArr[i].value);
        if (this.empdata[0].hobbies[i]) {
          this.count++;
        }
      }
    });
  }

  // -----------------Validations------------------------
  onChange(i) {
    this.message = true;

    if (this.updateEmp.controls.hobbies.get(i.toString()).value) {
      this.count++;
    } else {
      this.count--;
    }
    if (this.count > 1) {
      this.message = false;
    }
  }

  get firstName() {
    return this.updateEmp.get('firstName');
  }
  get skills(){
    return this.updateEmp.get('skills');
  }
  get lastName() {
    return this.updateEmp.get('lastName');
  }

  get email() {
    return this.updateEmp.get('email');
  }

  get gender() {
    return this.updateEmp.get('gender');
  }

  get age() {
    return this.updateEmp.get('age');
  }

  get salary() {
    return this.updateEmp.get('salary');
  }

  get phone() {
    return this.updateEmp.get('contactNumber');
  }

  get address() {
    return this.updateEmp.get('address');
  }

  get pin() {
    return this.updateEmp.get('pinCode');
  }

  get city() {
    return this.updateEmp.get('cityes');
  }

  get State() {
    return this.updateEmp.get('states');
  }
  // --------------------------------------------------------------

  onFileUpload(event){
    console.log(event);
    this.flag = true;
    this.imageFiles = event.target.files[0] as File;
    }

  OnSubmit() {
    const HobbiesArr2 = this.HobbiesArr;
    for (let i = 0 ; i < HobbiesArr2.length; i++) {
      HobbiesArr2[i].value = this.updateEmp.controls.hobbies.get(i.toString()).value;
    }
    const firstName = this.updateEmp.get('firstName').value;
    const lastName = this.updateEmp.get('lastName').value;
    const email = this.updateEmp.get('email').value;
    const gender = this.updateEmp.get('gender').value;
    const age = this.updateEmp.get('age').value;
    const salary = this.updateEmp.get('salary').value;
    const Dob= this.updateEmp.get('Dob').value;
    const address = this.updateEmp.get('address').value;
    const contactNumber = this.updateEmp.get('contactNumber').value;
    const states = this.updateEmp.get('states').value;
    const cityes = this.updateEmp.get('cityes').value;
    const pinCode = this.updateEmp.get('pinCode').value;
    const hobbies = HobbiesArr2;
    const skills= this.updateEmp.get('skills').value;

    if(this.flag){
      this.inputData.append('profileimage', this.imageFiles,this.imageFiles.name);
    }

    this.inputData.append('firstName',firstName);
    this.inputData.append('lastName',lastName);
    this.inputData.append('email', email);
    this.inputData.append('gender', gender);
    this.inputData.append('age',age);
    this.inputData.append('salary',salary);
    this.inputData.append('Dob',Dob);
    this.inputData.append('address',address);
    this.inputData.append('contactNumber', contactNumber);
    this.inputData.append('states', states);
    this.inputData.append('cityes', cityes);
    this.inputData.append('pinCode', pinCode);
    this.inputData.append('skills',JSON.stringify(skills));

    // inputData.append('hobbies', JSON.stringify(HobbiesArr2));
    for (let i=0 ; i<HobbiesArr2.length;i++){
      this.inputData.append('hobbies[]',HobbiesArr2[i].value);
    }


    this.Service.update(this.empdata[0]._id, this.inputData)
    .subscribe(response => {


    }, error => {
      console.log(error);
    });

}

// ----------------nevigate----------------
toList(){
  this.router.navigate(['../../display'], {relativeTo : this.active});
 }
toAdd(){
  this.router.navigate(['../../create'], {relativeTo : this.active});
 }

}
