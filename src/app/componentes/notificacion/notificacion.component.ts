import { Component, OnInit } from '@angular/core';
import { Aviso } from 'src/app/entidades/aviso';
import { AccesoService } from 'src/app/servicios/acceso.service';
import { CommComponentService } from 'src/app/servicios/comm-component.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  estado: boolean = true;
  texto: string = "Los cambios se realizaron con éxito!";
  activo: boolean = false;

  constructor( private acceso: AccesoService, private comm: CommComponentService ) { }

  ngOnInit(): void {
    this.comm.customAviso.subscribe( (obj: Aviso) => {
      this.estado = obj.estado;
      this.texto = obj.texto;
      this.activo = obj.activo;
      this.activarNotificacion();
    } )
  }

  activarNotificacion(){
    setTimeout(() => {
      this.activo = false;
    }, 4000);
  }

}


