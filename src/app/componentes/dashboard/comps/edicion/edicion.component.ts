import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pelicula } from 'src/app/entidades/pelicula';
import { AccesoService } from 'src/app/servicios/acceso.service';
import { CommComponentService } from 'src/app/servicios/comm-component.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

  activar: boolean;
  loading: boolean;
  formulario: FormGroup;

  constructor( private acceso: AccesoService, private comm: CommComponentService ) { }

  ngOnInit(): void {
    this.comm.customId.subscribe( idData => {
      if(idData != ''){
        this.acceso.getPelicula(idData).subscribe( (data:any) => {
          this.activarFormulario(data);
        } )
      } else{
        this.activar = true;
      }
    })
  }

  creaFormulario( pelicula?:Pelicula ){
    this.formulario = new FormGroup({
      foto: new FormControl((pelicula?.foto)?pelicula.foto:'',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      titulo: new FormControl((pelicula?.titulo)?pelicula.titulo:'',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      genero: new FormControl((pelicula?.genero)?pelicula.genero:'',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      year: new FormControl((pelicula?.year)?pelicula.year:'',
      [
        Validators.required,
        Validators.min(1900),
        Validators.max(2100)
      ]),
      imdb: new FormControl((pelicula?.imdb)?pelicula.imdb:'',
      [
        Validators.required,
        Validators.max(10.1)
      ]),
      sinopsis: new FormControl((pelicula?.sinopsis)?pelicula.sinopsis:'',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(500)
      ]),
      stock: new FormControl((pelicula?.stock)?pelicula.stock:'',
      [
        Validators.required,
        Validators.max(100000)
      ]),
      precio: new FormControl((pelicula?.precio)?pelicula.precio:'',
      [
        Validators.required,
        Validators.max(1000000)
      ]),
      id: new FormControl((pelicula?.id)?pelicula.id:''),
      cantidad: new FormControl((pelicula?.cantidad)?pelicula.cantidad:'')
    });
    this.loading = false;
  }

  activarFormulario( pelicula?:Pelicula ){
    this.activar = false;
    this.loading = true;
    this.creaFormulario( pelicula );
  }

  onSubmit(){
    if(this.formulario.value.id > 0){
      //modifica un registro
      this.acceso.editaPelicula(this.formulario.value).subscribe({
        next: () => {
          this.comm.setAviso(
            {estado: true, texto: "El registro se ha modificado con éxito!", activo: true}
          )
        },
        error: () => {
          this.comm.setAviso(
            {estado: false, texto: "Ocurrió un problema al modificar el registro.", activo: true}
          )
        },
        complete: () => {
          this.cerrarFormulario();
        }
      })
    } else{
      //crea un registro
      this.acceso.creaPelicula(this.formulario.value).subscribe({
        next: () => {
          this.comm.setAviso(
            {estado: true, texto: "El nuevo registro se creó con éxito!", activo: true}
          )
        },
        error: () => {
          this.comm.setAviso(
            {estado: false, texto: "Ocurrió un problema al crear el registro.", activo: true}
          )
        },
        complete: () => {
          this.cerrarFormulario();
        }
      })
    }
  }

  cerrarFormulario(){
    this.activar = true;
    this.comm.setId('');
  }

}
