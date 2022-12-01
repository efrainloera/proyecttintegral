//Service de acceso a la DB

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estreno } from '../entidades/estrenos';
import { Pelicula } from '../entidades/pelicula';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  constructor(private http: HttpClient ) { }

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
  getPeliculas(){
    return this.http.get<Pelicula[]>( environment.urlGeneral )
               .pipe(
                catchError(this.handleError)
               );
  }

  getPelicula( id: string ){
    return this.http.get<Pelicula>( environment.urlGeneral + '/' + id )
               .pipe(
                catchError(this.handleError)
               );
  }

  getPedidas(){
    return this.http.get<Pelicula[]>( environment.urlGeneral )
               .pipe(
                catchError(this.handleError)
               );
  }

  getEstrenos(){
    return this.http.get<Estreno[]>( environment.urlEstrenos )
               .pipe(
                catchError(this.handleError)
               );
  }

  //POST
  creaPelicula( post: Pelicula ){
    return this.http.post<Pelicula>(environment.urlGeneral, post, this.httpOptions)
               .pipe(
                catchError(this.handleError)
               );
  }


  //PUT
  rentaPelicula( post: Pelicula ){
    return this.http.put<Pelicula>( environment.urlGeneral + '/' + post.id, post, this.httpOptions )
               .pipe(
                catchError(this.handleError)
               );
  }

  editaPelicula( post: Pelicula ){
    return this.http.put<Pelicula>( environment.urlGeneral + '/' + post.id, post, this.httpOptions )
               .pipe(
                catchError(this.handleError)
               );
  }

  sumaPelicula( post: Pelicula ){
    return this.http.put<Pelicula>( environment.urlGeneral + '/' + post.id, post, this.httpOptions )
               .pipe(
                  catchError(this.handleError)
               );
  }

  //DELETE
  eliminarPelicula( id: string ){
    return this.http.delete( environment.urlGeneral + '/' + id, this.httpOptions )
               .pipe(
                catchError(this.handleError)
               );
  }

}
