import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidemenu',
  templateUrl: 'sidemenu.component.html',
  styleUrls: ['sidemenu.component.scss','sidemenu.responsive.scss']
})
export class SideMenu {

  @Input() data:any;

  sidemenu: any;

  constructor(){}

}
