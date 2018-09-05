import { Component, OnInit } from '@angular/core';

import { SupportersService } from '../services/supporters.service';

@Component({
  selector: 'app-supporters',
  templateUrl: './supporters.component.html',
  styleUrls: ['./supporters.component.scss','./supporters.responsive.component.scss']
})
export class SupportersComponent implements OnInit {
	flag=false;

	supporters: any;
  constructor(private supportersService: SupportersService) { }

  getSupporters(){
    this.supportersService.getSupporters('3', 'ka').subscribe(supporters=>{
      this.supporters = supporters;
      console.log(this.supporters)
    });
  }

  ngOnInit() {
    this.getSupporters();
  }
  activeMoreinfp(){
  	this.flag=!this.flag;
  }
}
