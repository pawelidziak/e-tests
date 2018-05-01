import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoaderService} from "./services/loader.service";

const BASE_URL = 'http://35.229.74.15:8000/api/';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // show loader
    this.loader.start();

    request = request.clone({
      url: BASE_URL + request.url
    });


    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        this.loader.complete();
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
        }
      }
    });
  }
}
