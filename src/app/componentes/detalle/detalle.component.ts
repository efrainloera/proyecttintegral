import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pelicula } from 'src/app/entidades/pelicula';
import { AccesoService } from 'src/app/servicios/acceso.service';
import { CommComponentService } from 'src/app/servicios/comm-component.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  pelicula: Pelicula;
  id: string|null;
  loading: boolean;

  constructor( private activatedRoute: ActivatedRoute, private acceso: AccesoService, private comm: CommComponentService ) { };

  ngOnInit(): void {
    this.loading = true;
      this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
        this.id = params.get('id');
        if(this.id){
          this.getPelicula( this.id );
        }
      });
  }


  getPelicula( id: string ){
    this.acceso.getPelicula(id).subscribe( (data: any) => {
      this.loading = false;
      this.pelicula = {...data};
    } )
  }

  rentaPelicula( post: Pelicula ){
    post.stock--;
    this.acceso.rentaPelicula(post).subscribe({
      next: () => {
        this.comm.setAviso(
          {estado: true, texto: "La película se ha rentado con éxito!", activo: true}
        )
      },
      error: () => {
        this.comm.setAviso(
          {estado: false, texto: "Ocurrió un problema al rentar la película.", activo: true}
        )
      },
      complete: () => {
        this.sumaPelicula(post);
      }
    })
  }


  //actualizacion
 

  sumaPelicula( post: Pelicula ){
    post.cantidad++;
    this.acceso.sumaPelicula(post).subscribe();
  }

}
