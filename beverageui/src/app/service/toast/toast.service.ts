import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toast: ToastrService){}

  showSuccess(message: string) {
    this.toast.success(message, 'Success');
  }

  showError(message: string) {
    this.toast.error(message, 'Error');
  }

  showInfo(message: string) {
    this.toast.info(message, 'Info');
  }

  showWarning(message: string) {
    this.toast.warning(message, 'Warning');
  }
}
