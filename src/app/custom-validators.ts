import { AbstractControl } from "@angular/forms";

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  const emailRegex = /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})$/;

  const value = control.value;

  const result = emailRegex.test(value);

if (!result) {
  return {emailValidator: {value}};
}

  return null;
}

export function rangeValidator(minValue: number, maxValue: number): any {
  // Validators.pattern(/^\d+/)

  console.log(minValue);
  console.log(maxValue);

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = +control.value;

if (isNaN(value)) {
  return {rangeValidator: {value}};
} else if (value < minValue || value > maxValue) {
  return {rangeValidator: {value}};
}

    return null
  }
}