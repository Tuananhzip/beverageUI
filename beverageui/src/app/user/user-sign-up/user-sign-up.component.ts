import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../service/toast/toast.service';

@Component({
  selector: 'app-user-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './user-sign-up.component.html',
  styleUrl: './user-sign-up.component.scss'
})
export class UserSignUpComponent implements OnInit{
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
  });
  constructor(private auth: AuthService, private router: Router, private toast: ToastService){}

   ngOnInit(): void {}

   onSubmit() {
    if(this.signUpForm.valid){
      const loginVM = { ...this.signUpForm.value };
      if(loginVM.password !== loginVM.passwordConfirm){
        this.toast.showWarning('Passwords do not match');
        return;
      }
      this.auth.signUp(loginVM).subscribe({
        next: (res) => {
          if(res?.isSuccess){
            this.toast.showSuccess(res?.message);
            this.router.navigate(['login']);
          } else {
            this.toast.showError(res?.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
      })
    } else {
      if(this.signUpForm.get('firstName')?.invalid){
        if(this.signUpForm.get('firstName')?.errors?.['required']){
          this.toast.showWarning('First name is required');
        }
      } else if(this.signUpForm.get('lastName')?.invalid){
        if(this.signUpForm.get('lastName')?.errors?.['required']){
          this.toast.showWarning('Last name is required');
        }
      } else if (this.signUpForm.get('email')?.invalid) {
        if (this.signUpForm.get('email')?.errors?.['required']) {
          this.toast.showWarning('Email is required');
        } else if (this.signUpForm.get('email')?.errors?.['email']) {
          this.toast.showWarning('Please enter a valid email address');
        }
      } else if (this.signUpForm.get('password')?.invalid) {
        if (this.signUpForm.get('password')?.errors?.['required']) {
          this.toast.showWarning('Password is required');
        } else if (this.signUpForm.get('password')?.errors?.['minlength']) {
          this.toast.showWarning('Password must be at least 6 characters long');
        }
      } else if (this.signUpForm.get('passwordConfirm')?.invalid) {
        if (this.signUpForm.get('passwordConfirm')?.errors?.['required']) {
          this.toast.showWarning('Password confirmation is required');
        } else if (this.signUpForm.get('passwordConfirm')?.errors?.['minlength']) {
          this.toast.showWarning('Password confirmation must be at least 6 characters long');
        }
      }
    }
  }
}
