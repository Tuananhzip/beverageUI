import { AuthService } from './../../service/auth/auth.service';
import { ChangeDetectorRef, Component, inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../service/toast/toast.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  formGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
  ) {
    this.initFormGroup();
  }
  initFormGroup() {
    this.formGroup = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  submit() {
    if(this.formGroup.value.email !== 'admin' || this.formGroup.value.password !== 'admin'){
      this.toast.showError('Invalid email or password');
      return;
    }
    this.authService
      .adminLogin(this.formGroup.value.email, this.formGroup.value.password).subscribe({
        next: (res) => {
          if(res?.token && res?.refreshToken && res?.userId){
            this.authService.setSession(res.token, res.refreshToken, res.userId);
            this.router.navigate(['admin/dashboard']).then(() => {
              window.location.reload();
            });
          }
        },
        error: (error) => {
          this.toast.showError(error.error);
        },
        complete: () => {
          console.log('complete');
        }
      });
  }
}
