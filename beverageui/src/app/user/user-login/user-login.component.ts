import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../service/toast/toast.service';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit{
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private auth: AuthService, private router: Router, private toast: ToastService){}
   ngOnInit(): void {
   }
   onSubmit() {
    if(this.loginForm.valid){
      const { email, password } = this.loginForm.value;
      if(!email || !password) return;
      this.auth.login(email, password).subscribe({
        next: (res) => {
          if(res?.token && res?.refreshToken && res?.userId){
            this.auth.setSession(res.token, res.refreshToken, res.userId);
            this.router.navigate(['user/home']);
          }
        },
        error: (err) => this.toast.showError(err.error),
      });
    } else {
      this.toast.showWarning('Please enter valid email and password');
    }
  }
  signUp(){
    this.router.navigate(['signup']);
  }
}
