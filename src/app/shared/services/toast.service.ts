import { Injectable } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toasterService: ToasterService) {}

  config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade',
    showCloseButton: true,
    tapToDismiss: false,
    mouseoverTimerStop: true,
    timeout: 2000,
    newestOnTop: true,
    titleClass: 'h4'
  });

  success(body) {
    this.toasterService.pop({
      type: 'success',
      title: 'Success!',
      body
    });
  }
  error(body) {
    this.toasterService.pop({
      type: 'error',
      title: 'Failed!',
      body
    });
  }
  info(body) {
    this.toasterService.pop({
      type: 'info',
      title: 'Info!',
      body
    });
  }
  warning(body) {
    this.toasterService.pop({
      type: 'warning',
      title: 'Warning!',
      body
    });
  }
}
