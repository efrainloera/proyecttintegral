import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommComponentService } from 'src/app/servicios/comm-component.service';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit {

  constructor( private comm: CommComponentService, private router: Router ) { }

  ngOnInit(): void {

    localStorage.clear();
    this.comm.setLogger(localStorage.getItem('currentuser'))
    this.router.navigate(['home']);

  }

}
