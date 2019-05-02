import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  reqCount = 0;
  completed = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.reqCount++;
    this.showLoader();
    // console.log('show');
    return next.handle(req)
      .pipe(tap((event: HttpEvent<any>) => {
        // console.log('loading');
        if (event instanceof HttpResponse) {
          this.completed++;
          console.log(this.completed, this.reqCount);

          if (this.completed === this.reqCount) {
            // console.log('completed');

            this.reqCount = 0;
            this.completed = 0;
            this.onEnd();
          }
        } else {
          this.onEnd();
      }
    },
      (err: any) => {
        this.onEnd();
      }));
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

}
