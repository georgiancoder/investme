import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'breadcrumbs',
  templateUrl: 'breadcrumbs.component.html',
  styleUrls: ['breadcrumbs.component.scss','breadcrumbs.responsive.scss']
})

export class BreadCrumbsComponent implements OnInit{

@Input() data;

constructor(){}

ngOnInit() {

}

}
