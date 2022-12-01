//Service de autorización de usuario

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entidades/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  //Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  //Manejo de errores
  private handleError( error: HttpErrorResponse ){
    if( error.error instanceof ErrorEvent ){
      //error del lado cliente
      console.error('Ocurrió un error', error.error.message);
    } else{
      //error del lado servidor
      console.error(`El backend retornó el código de error ${error.status}. El cuerpo del mensaje de error es ${error.message}`);
    }
    return throwError(() => new Error('Algo malo sucedió. por favor intenta más tarde.'));
  }

  //Peticiones al servidor
  //GET
  getAuth( form: any ){
    return this.http.get<User[]>( environment.urlAuth )
               .pipe(
                catchError(this.handleError)
               );
  }

  //POST
  setNewUser( form: any ){
    return this.http.post<User>(environment.urlAuth, form, this.httpOptions)
               .pipe(
                catchError(this.handleError)
               );
  }

}
