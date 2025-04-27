import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';
import {Observable} from 'rxjs';

const apiPath: string = 'http://localhost:3002';

function httpApiPathInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.url.startsWith('::api')) {
    const newUrl = req.url.replace('::api', apiPath);
    req = req.clone({
      url: newUrl
    });
  }
  return next(req)
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        httpApiPathInterceptor
      ])
    )
  ]
};
