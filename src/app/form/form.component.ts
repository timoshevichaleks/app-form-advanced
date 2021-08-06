import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { asyncUrlValidator, emailValidator, observableUrlValidator, rangeValidator } from '../custom-validators';
import { FORM_ERRORS, FORM_LABELS, FORM_PLACEHOLDERS, FORM_ROLES, FORM_SUCCESS, FORM_VALIDATION_MESSAGES } from '../form-data';
import { User } from '../user.class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  label = FORM_LABELS;
  formPlaceholders = FORM_PLACEHOLDERS;
  formSuccess: any = FORM_SUCCESS;
  formErrors: any = FORM_ERRORS;
  validationMessages: any = FORM_VALIDATION_MESSAGES;
  roles: string[] = FORM_ROLES;

  userForm!: FormGroup;
  private user: User = new User(1, null, null, null, null, null, null);

  name!: AbstractControl;
  password!: AbstractControl;
  email!: AbstractControl;
  age!: AbstractControl;
  site!: AbstractControl;
  role!: AbstractControl;

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
      email: [this.user.email, [Validators.required, emailValidator]],
      age: [this.user.age, [Validators.required, rangeValidator(18, 122)]],
      site: [this.user.site, [Validators.required], [observableUrlValidator]],
      role: [this.user.role, [Validators.required]]
    });
    this.createControls();

    this.userForm.valueChanges.subscribe(() => this.onValueChanged());
  }

  private createControls() {
    this.name = this.userForm.controls.name;
    this.password = this.userForm.controls.password;
    this.email = this.userForm.controls.email;
    this.age = this.userForm.controls.age;
    this.site = this.userForm.controls.site;
    this.role = this.userForm.controls.role;
  }

  public onValueChanged(): void {

    if (!this.userForm) { return; }

    const form: any = this.userForm;

    // const keys = Object.keys(this.formErrors);
    // keys.forEach(key => console.log(key));
    // const entries = Object.entries(this.formErrors);
    // entries.forEach(([key, value]) => console.log(key));

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && (control.dirty || control.touched) && control.invalid) {
        const message = this.validationMessages[field]

        console.log(control)

        for (const key in control.errors) {
          console.log(message[key]);
          this.formErrors[field] = message[key];
          break;
        }
      }
    }
  }

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
