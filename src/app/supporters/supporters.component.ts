import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supporters',
  templateUrl: './supporters.component.html',
  styleUrls: ['./supporters.component.scss','./supporters.responsive.component.scss']
})
export class SupportersComponent implements OnInit {
	flag=false;
  constructor() { }

  ngOnInit() {
  }
  activeMoreinfp(){
  	this.flag=!this.flag;
  }
}
