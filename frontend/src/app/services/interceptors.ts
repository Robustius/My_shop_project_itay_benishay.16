import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';




@Injectable()
export class AndHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const login = '/login'
    if (req.url.search(login) === -1){
    const hardcodedTokens= JSON.parse(localStorage.currentUser)?.token
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
          console.log(`HTTP Error: ${req.url}`);
          return throwError(error);
        }),

        // PROFILING
        finalize(() => {
          const profilingMsg = `${req.method} "${req.urlWithParams}"`;
          console.log(profilingMsg);

        })
      );
  }
}