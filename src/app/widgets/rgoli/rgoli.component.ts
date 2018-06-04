import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rgoli',
  templateUrl: './rgoli.component.html',
  styleUrls: ['./rgoli.component.scss','./rgoli.responsive.scss']
})
export class RgoliComponent implements OnInit {

  @Input() percent:number;

  constructor() { }

  ngOnInit() {
  }

}
