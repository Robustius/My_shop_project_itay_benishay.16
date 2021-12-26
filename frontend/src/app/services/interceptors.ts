import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const interceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class SkippableInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    if (req.headers.has(interceptorSkipHeader)) {
     
      
      const headers = req.headers.delete(interceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    }else{
    
    const hardcodedTokens = JSON.parse(localStorage?.currentUser)?.token;
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${hardcodedTokens ? hardcodedTokens : null}`,
      },
    });

    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        
        if (error.status === 403) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        
        return throwError(error);
      }),
      finalize(() => {
        const profilingMsg = `${req.method} "${req.urlWithParams}"`;
      })
    );
  }
}
}
// @Injectable()
// export class AndHttpInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const urlcart = new URL('http://localhost:4000/home');
//     const login = '/login';
//     const register = '/register';

// let localstorage=JSON.parse(localStorage?.currentUser)?.token
//       const hardcodedTokens = JSON.parse(localStorage.currentUser)?.token;
//       req = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${hardcodedTokens ? hardcodedTokens : null}`,
//         },
//       });

//     return next.handle(req).pipe(
//       // Retry on failure
//       retry(1),

//       // Handle errors
//       catchError((error: HttpErrorResponse) => {
//         console.log(this.router.url, 'outside if');
//         if (error.status === 403) {
//           localStorage.clear();
//           this.router.navigate(['/login']);
//         }
//         console.log(`HTTP Error: ${req.url},${error.status}`);
//         return throwError(error);
//       }),
//       finalize(() => {
//         const profilingMsg = `${req.method} "${req.urlWithParams}"`;
//       })
//     );
//   }
// }
