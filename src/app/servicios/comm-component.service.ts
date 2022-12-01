//Comunicación entre componentes sin relación

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Aviso } from '../entidades/aviso';

@Injectable({
  providedIn: 'root'
})
export class CommComponentService {

  constructor() { }

  //KIT que comunica la película a modificar con el formulario de edición
  private id = new BehaviorSubject<string>('');
  public customId = this.id.asObservable();

  public setId( idEdit: string ):void{
    this.id.next(idEdit);
  }

  //KIT que escucha los cambios de estado de peticiones HTTP y llama a la notificación
  private aviso = new BehaviorSubject<Aviso>({estado: false, texto: "", activo: false});
  public customAviso = this.aviso.asObservable();

  public setAviso( nuevaNot: Aviso ):void{
    this.aviso.next(nuevaNot);
  }

  //KIT que comunica el login/logoff/register con la barra navbar para que muestre tablero ó componente login
  private logger = new BehaviorSubject<string|null>(null);
  public customLogger = this.logger.asObservable();

  public setLogger( nivel: string|null ):void{
    this.logger.next(nivel);
  }

}
