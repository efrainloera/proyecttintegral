import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entidades/user';
import { emailValidator } from 'src/app/modulo/funciones/funciones';
import { AuthService } from 'src/app/servicios/auth.service';
import { CommComponentService } from 'src/app/servicios/comm-component.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  estadoSmt: string = "ingreso";
  form: FormGroup;
  @Output() visible = new EventEmitter<string>();

  constructor( private auth: AuthService, private router: Router, private comm: CommComponentService ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          emailValidator()
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]),
      //recuerdame: new FormControl('')
    })
  }

  onSubmit(){
    this.estadoSmt = "load";
    this.auth.getAuth(this.form.value).subscribe( (data: User[]) => {
      var index = data.findIndex( element => (element.email === this.form.value.email && element.password === this.form.value.password));
      if( index > -1){
        this.estadoSmt = "ok";
        localStorage.setItem('currentUser', data[index].nivel);
        this.comm.setLogger(data[index].nivel);
        (data[index].nivel == 'admin')?this.router.navigate(['tablero-adm'], {queryParams: {id:data[index].id}}):this.router.navigate(['tablero-bas'], {queryParams: {id:data[index].id}});
        console.log(data[index].nivel)
      } else{
        this.estadoSmt = "error";
      }
    } )
  }

  actualizarSmt(){
    (this.estadoSmt == 'error')?(this.estadoSmt = 'ingreso'):'';
  }

  irRegistro(){
    this.visible.emit('registro');
  }

}