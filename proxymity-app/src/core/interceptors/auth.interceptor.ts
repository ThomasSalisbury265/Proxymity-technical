import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.jsonPlaceholderUrl)) {
      const modifiedReq = req.clone({
        setHeaders: {
          Author: 'Proxymity',
        },
      });
      return next.handle(modifiedReq);
    } else {
      return next.handle(req);
    }
  }
}
