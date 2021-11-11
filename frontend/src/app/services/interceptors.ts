import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, retry} from 'rxjs/operators';
import { AuthService } from './auth.service';




@Injectable()
export class AndHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      const hardcodedTokens= localStorage.getItem('currentUser')
    // Add Auth Token
    // In production you would get the token value from an auth service
  
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${hardcodedTokens?hardcodedTokens:null}`
      }
      
      
    });
   
    return next.handle(req)
      .pipe(
        // Retry on failure
        retry(2),

        // Handle errors
        catchError((error: HttpErrorResponse) => {
          // TODO: Add error handling logic here
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