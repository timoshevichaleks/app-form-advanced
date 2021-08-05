import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { emailValidator, rangeValidator } from '../custom-validators';
import { User } from '../user.class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  userForm!: FormGroup;

  roles: string[] = ['Гость', 'Модератор', 'Администратор'];
  user: User = new User(1, null, null, null, null, null);

  formErrors: any = {
      name: '',
      password: '',
      email: '',
      age: '',
      role: ''
    }

    validationMessages: any = {
      name: {
        required: 'Имя обязательно',
        minlength: 'Имя должно содержать не менее 4 символов',
        maxlength: 'Имя должно содержать не более 15 символов'
      },
      password: {
        required: 'Пароль обязателен',
        minlength: 'Пароль должен содержать не менее 7 символов',
        maxlength: 'Пароль должен содержать не более 25 символов'
      },
      email: {
        required: 'Email обязателен',
        emailValidator: 'Неправильный формат email адреса'
      },
      age: {
        required: 'Возраст обязателен',
        rangeValidator: 'Значение должно быть в диапазоне 18...122'
      },
      role: {
        required: 'Обязательное поле'
      }
    }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();

  };

  private buildForm() {
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)]
      ],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(25)]
      ],
      email: [this.user.email, [
        Validators.required,
        emailValidator]
      ],
      age: [this.user.age, [
        Validators.required,
        rangeValidator(18, 122)]
      ],
      role: [this.user.role, [Validators.required]]
    });

    this.userForm.valueChanges.subscribe(() => this.onValueChanged());
  }

  private onValueChanged(): void {

    if (!this.userForm) { return; }

    const form: any = this.userForm;

    // const keys = Object.keys(this.formErrors);
    // keys.forEach(key => console.log(key));

    // const entries = Object.entries(this.formErrors);
    // entries.forEach(([key, value]) => console.log(key));

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && control.invalid) {
        const message = this.validationMessages[field]

        for (const key in control.errors) {
          console.log(message[key]);
          this.formErrors[field] += message[key] + ' ';
        }
      }
    }
  }

  onSubmit(form: FormGroup) {
    console.log(form.valid);
    console.log(form.value);

    console.log(this.user);
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
