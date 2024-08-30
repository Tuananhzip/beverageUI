import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, switchMap } from "rxjs";
import { AuthService } from "../auth/auth.service";


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const secureEndpoints = ['/api/Customers', '/api/OrderLines', '/api/Orders', '/api/OrderStatus', '/api/Payments'];
  const isSecureEndpoint = secureEndpoints.some(endpoint => req.url.includes(endpoint));
  if (isSecureEndpoint && token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(req);
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = authService.getToken();
            if (newToken) {
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
            }
            return next(req);
          })
        );
      } else {
        throw error;
      }
    })
  );
}