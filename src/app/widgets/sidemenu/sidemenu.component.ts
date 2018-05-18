import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidemenu',
  templateUrl: 'sidemenu.component.html',
  styleUrls: ['sidemenu.component.scss']
})
export class SideMenu {

  @Input() data:any;

  sidemenu: any;

  constructor(){}

}
