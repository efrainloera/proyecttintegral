import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

  //Función validadora de formato correo electrónico
  let emailReg = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
  //let emailReg: RegExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]/;

  export function emailValidator():ValidatorFn{
    return (control: AbstractControl):ValidationErrors|null => {
      const incorrecto = emailReg.test(control.value);
      return !incorrecto ? {incorrectoName: {value: control.value}} : null;
    };
  }
