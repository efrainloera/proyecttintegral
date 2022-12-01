import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/entidades/pelicula';
import { AccesoService } from 'src/app/servicios/acceso.service';
import { CommComponentService } from 'src/app/servicios/comm-component.service';

import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean = false;
  user: string = 'admin';
  peliculas: Pelicula[];

  constructor( private acceso: AccesoService, private comm: CommComponentService, public auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.getPeliculas();
    this.comm.customLogger.subscribe( data => {
      (data)?this.isLoggedIn = true:this.isLoggedIn = false;
      data?this.user = data:'';
    } )
    this.auth.isAuthenticated$.subscribe(isAuthenticaed => {
      if(isAuthenticaed){
           this.router.navigate(['/app.compoonent'])
       }
   })
  
  }

  logOut(){
    this.auth.logout()
   
  }

  login() {
    this.auth.loginWithRedirect()
   }

  getPeliculas(){
    this.acceso.getPeliculas().subscribe( (data:any) => {
      this.peliculas = data;
    } );
  }

}
