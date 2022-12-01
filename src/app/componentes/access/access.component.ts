import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  @Input() visible: string = 'login';

  constructor() { }

  ngOnInit(): void {
  }

  esVisible(e: any){
    this.visible = e;
  }

}
