import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// ----------------------------------------------------------
import {validateName, validateEmail, validatAge, validatSalary, validatDob, validatPhoneNumber, validatPin, validatSkills, validatHobbies} from 'src/app/validator';
// ----------------------------------------------------------
@Component({
  selector: 'app-create-employee',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // -------------------Initializations---------------------
  bsDatepicker = new Date();
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  HobbiesArr = [
    { id: 1, name: 'Playing Cricket', value: 'false' },
    { id: 2, name: 'Singing', value: 'false' },
    { id: 3, name: 'Playingfootball', value: 'false' },
    { id: 4, name: 'Reading', value: 'false' },
    { id: 5, name: 'Music', value: 'false'}
  ];


  constructor(
    private fb: FormBuilder,
    private connection: HttpService,
    private router: Router,
    private route : ActivatedRoute,
    private toaster : ToastrService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  employee: FormGroup;
  myDateValue: Date;
  createResponse = { message: '' };
  state = {};
  marked: any;
  message: Boolean = false;
  message2: Boolean = false;
  count = 0;
  count2= 0;
  imageFiles :File = null;
  imgurl: any ='assets/avatar.png';
  StateList: Array<any> = [
    { name: 'Maharashtra', cities: ['Pune', 'Mumbai', 'Nashik', 'Amravati'] },
    { name: 'Uttar Pradesh', cities: ['Aagra', 'Aligad', 'Noidia'] }
  ];

  cities: Array<any>;
  changeState(count) {
    this.cities = this.StateList.find(con => con.name === count).cities;
  }

  ngOnInit() {
    this.myDateValue = new Date();
    this.employee = this.fb.group({
      firstName: ['',validateName],
      lastName: ['', validateName],
      email: ['',validateEmail],
      gender: ['Male'],
      age: ['',validatAge],
      salary: ['', validatSalary],
      Dob : ['',validatDob],
      address: ['', validateName],
      contactNumber: ['',validatPhoneNumber ],
      hobbies: this.fb.array([]),
      states: ['', [Validators.required]],
      cityes: ['', [Validators.required]],
      pinCode: ['', validatPin],
      skills :['',validatSkills]

    });
    this.HobbiesArr.map((o, i) => {
      const control = new FormControl(i);
      control.setValue(false);
      (this.employee.controls.hobbies as FormArray).push(control);
    });
  }
  onDateChange(newDate: Date) {
    console.log(newDate);
  }
  get hobbies() {
    return this.employee.get('hobbies') as FormArray;
  }
  // -----------------Validations------------------------
  onChange(i) {
    this.message = true;

    if (this.employee.controls.hobbies.get(i.toString()).value) {
     console.log(this.count++);

    } else {
      this.count--;
    }
    if (this.count > 1 || this.count ===0) {
      this.hobbies.clearValidators();
      this.hobbies.updateValueAndValidity();
      this.message =false;
    }else {
      this.hobbies.setValidators(Validators.requiredTrue);
      this.hobbies.updateValueAndValidity();
    }
  }

  get firstName() {
    return this.employee.get('firstName');
  }
  get skills() {
    return this.employee.get('skills');
  }
  get lastName() {
    return this.employee.get('lastName');
  }

  get email() {
    return this.employee.get('email');
  }

  get gender() {
    return this.employee.get('gender');
  }

  get age() {
    return this.employee.get('age');
  }

  get salary() {
    return this.employee.get('salary');
  }

  get phone() {
    return this.employee.get('contactNumber');
  }

  get address() {
    return this.employee.get('address');
  }

  get pin() {
    return this.employee.get('pinCode');
  }

  get city() {
    return this.employee.get('cityes');
  }

  get State() {
    return this.employee.get('states');
  }
  get dob() {
    return this.employee.get('Dob');
  }
  get upload() {
    return this.employee.get('')
  }
  get hobiesCount(){
    return this.employee.get('i')
  }
  // ---------------------------------------------------------------------------
  onFileUpload(event) {
    console.log(event);
    this.imageFiles = event.target.files[0] as File;
    const reader = new FileReader();

    reader.readAsDataURL(this.imageFiles);
    reader.onload = (event) => {
    this.imgurl = reader.result;

    }

    }

  OnSubmit() {
    const HobbiesArr2 = this.HobbiesArr;
    for (let i = 0; i < HobbiesArr2.length; i++) {
      HobbiesArr2[i].value = this.employee.controls.hobbies.get( i.toString()).value;
    }


    // const profileimage = inputData.get('image');
    // console.log(profileimage);

    const firstName = this.employee.get('firstName').value;
    const lastName = this.employee.get('lastName').value;
    const email = this.employee.get('email').value;
    const gender = this.employee.get('gender').value;
    const age = this.employee.get('age').value;
    const salary = this.employee.get('salary').value;
    const address = this.employee.get('address').value;
    const contactNumber = this.employee.get('contactNumber').value;
    const Dob = this.employee.get('Dob').value;
    const states = this.employee.get('states').value;
    const cityes = this.employee.get('cityes').value;
    const pinCode = this.employee.get('pinCode').value;
    const skills = this.employee.get('skills').value;
    console.log(skills);
   //const hobbies = HobbiesArr2;

    const inputData = new FormData();
    inputData.append('profileimage', this.imageFiles, this.imageFiles.name);
    inputData.append('firstName',firstName);
    inputData.append('lastName',lastName);
    inputData.append('email', email);
    inputData.append('gender', gender);
    inputData.append('age',age);
    inputData.append('salary',salary);
    inputData.append('Dob',Dob);
    inputData.append('address',address);
    inputData.append('contactNumber', contactNumber);
    inputData.append('states', states);
    inputData.append('cityes', cityes);
    inputData.append('pinCode', pinCode);
    inputData.append('skills[]',JSON.stringify(skills));
    for (let i=0 ; i<HobbiesArr2.length; i++) {
        inputData.append('hobbies[]',HobbiesArr2[i].value);
      }
    this.connection.createEmployee(inputData).subscribe(
      response => {
        this.createResponse = response;
        this.toaster.success('Employee Added Successfully');
        this.router.navigate(['../display'],{relativeTo : this.route});
      },
      error => {}
    );
  }
// ----------------nevigate----------------
//  toList(){
//   this.route.navigate(['/display']);
//  }
//  toAdd(){
//   this.route.navigate(['/create']);
//  }
}

