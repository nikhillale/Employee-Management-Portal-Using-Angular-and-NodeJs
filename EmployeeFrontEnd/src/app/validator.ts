import {AbstractControl, Validators} from '@angular/forms';

export function validateEmail(control : AbstractControl){

  if(control && (control.value !== null || control.value !== undefined)){
     const regex = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
     if (!regex.test(control.value)) {
      return {isError :  true }
    }
  }
  return null;
}

export function validatePassword(control : AbstractControl){

  if(control && (control.value !== null || control.value !== undefined)){
     const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
     if (!regex.test(control.value)) {
      return {isError :  true }
    }
  }
  return null;
}

export function validateName(control : AbstractControl){

  if(control && (control.value !== null || control.value !== undefined)){
    const regex = new RegExp(/^[a-zA-Z]{3,}/);
    if(! regex.test(control.value)){
      return {isError : true}
    }
  }
  return null;
}

export function validatAge(control : AbstractControl){
  if(control && (control.value !== null || control.value !== undefined)){
    const regex = new RegExp(/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/);
    if(! regex.test(control.value)){
      return {isError : true}
    }
  }
  return null;

}

export function validatSalary(control : AbstractControl){
  if(control && (control.value !== null || control.value !== undefined)){
    const regex = new RegExp(/^[0-9]+$/);
    if(! regex.test(control.value)){
      return {isError : true}
    }
  }
  return null;

}
export function validatDob(control : AbstractControl){
  if(control){
    if(control.value == null){
      return {isError : true};
    }
  }
  return null;
}
export function validatBrowse(control : AbstractControl){
  if(control){
    if(control.value == null){
      return {isError : true};
    }
  }
  return null;
}

export function validatPhoneNumber(control : AbstractControl){
  if(control && (control.value !== null || control.value !== undefined)){
    const regex = new RegExp(/^[789]\d{9}$/);
    if(! regex.test(control.value)){
      return {isError : true}
    }
  }
  return null;
}

export function validatPin(control: AbstractControl){
  if(control && (control.value !== null || control.value !== undefined)){
    const regex = new RegExp(/^[0-9]\d{5}$/);
    if(! regex.test(control.value)) {
      return {isError : true}
    }
  }
  return null;
}

export function validatSkills(control:AbstractControl){


  if(control && (control.value !== null || control.value !== undefined)){
    if(control.value.length == 1 ){
      return {isError : true}
    }

  }
  return null;
}

export function validatHobbies(control:AbstractControl){
  console.log(control);

  if(control && (control.value !== null || control.value !== undefined)){
    console.log(control.value.length);

    if(control.value.length ==1 ){
      return {isError : true}
    }

  }
  return null;
}


// export function validateCheckBox(control : AbstractControl){

//     console.log(control);

// }
