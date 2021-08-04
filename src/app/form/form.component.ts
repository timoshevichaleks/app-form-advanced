import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../user.class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  userForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  })
  constructor() { }

  ngOnInit(): void { }

  onSubmit(form: FormGroup) {
    console.log(form.valid);
    console.log(form.value);
  }
}


// formErrors: any = {
//   name: '',
//   age: ''
// }

// validationMessages: any = {
//   name: {
//     required: 'Имя обязательно',
//     minlength: 'Имя должно содержать минимум 4 символа'
//   },
//   age: {
//     required: 'Возраст обязателен'
//   }
// }

// @ViewChild('userForm') userForm: NgForm | null = null;

// constructor() { }

// ngOnInit(): void {

// }

// ngAfterViewInit(): void {
//   this.userForm?.valueChanges?.subscribe(() => this.onValueChanged());
// }

// private onValueChanged(): void {
//   const form: any = this.userForm?.form;

//   // const keys = Object.keys(this.formErrors);
//   // keys.forEach(key => console.log(key));

//   // const entries = Object.entries(this.formErrors);
//   // entries.forEach(([key, value]) => console.log(key));

//   for (const field in this.formErrors) {
//     this.formErrors[field] = '';
//     const control = form.get(field);

//     if (control && control.dirty && control.invalid) {
//       const message = this.validationMessages[field]

//       for (const key in control.errors) {
//         this.formErrors[field] += message[key] + ' '
//       }
//     }
//   }
// }

// onSubmit() {
//   console.log('Form submited');
// }
// }
