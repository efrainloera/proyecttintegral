import { Component, OnInit } from '@angular/core';
import { Estreno } from 'src/app/entidades/estrenos';
import { AccesoService } from 'src/app/servicios/acceso.service';

@Component({
  selector: 'app-lista-estrenos',
  templateUrl: './lista-estrenos.component.html',
  styleUrls: ['./lista-estrenos.component.css']
})
export class ListaEstrenosComponent implements OnInit {

  loading: boolean;
  estrenos: Estreno[];

  constructor( private acceso: AccesoService ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getEstrenos();
  }

  getEstrenos(){
    this.acceso.getEstrenos().subscribe( (data:Estreno[]) => {
      this.estrenos = data;
      this.loading = false;
    } ); 
  }

}
