import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';




@Injectable()
export class AndHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const login = '/login'
    if (req.url.search(login) === -1) {
      const hardcodedTokens = JSON.parse(localStorage.currentUser)?.token
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${hardcodedTokens ? hardcodedTokens : null}`
        }
      });
    }

    return next.handle(req)
      .pipe(
        // Retry on failure
        retry(1),

        // Handle errors
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            localStorage.clear()
this.router.navigate(['/login'])
          }
          console.log(`HTTP Error: ${req.url},${error.status}`);
          return throwError(error);
        }),

        // PROFILING
        finalize(() => {
          const profilingMsg = `${req.method} "${req.urlWithParams}"`;
          // console.log(profilingMsg);

        })
      );
  }
}