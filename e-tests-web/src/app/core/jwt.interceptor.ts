import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {LoaderService} from './services/loader.service';
import {Observable} from 'rxjs/index';
import {tap} from 'rxjs/operators';

const BASE_URL = 'http://35.229.74.15:8000/api/';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // show loader
    // this.loader.start();

    // request = request.clone({
    //   url: BASE_URL + request.url
    // });


    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        // this.loader.complete();
      }
    }, (err: any) => {
      // this.loader.complete();
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the auth route
          // or show a modal
        }
      }
    }));
  }
}
