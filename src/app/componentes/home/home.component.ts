import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/entidades/pelicula';
import { AccesoService } from 'src/app/servicios/acceso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recomendados: Pelicula[];
  loading: boolean;

  constructor( private acceso: AccesoService ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getRecomendados();
  }

  getRecomendados(){
    this.acceso.getPeliculas().subscribe( (data: Pelicula[]) => {
      data = data.sort( (a, b) => b.imdb - a.imdb );
      this.recomendados = [ data[0], data[1], data[2] ];
      this.loading = false;
    } )
  }

}
