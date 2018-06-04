import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blogwidgetinner',
  templateUrl: './blogwidgetinner.component.html',
  styleUrls: ['./blogwidgetinner.component.scss','./blogwidgetinner.responsive.scss']
})
export class BlogwidgetinnerComponent implements OnInit {
  @Input() type:string;
  @Input() data:any;
  siteUrl: string = "https://back.investme.ge";

  constructor() { }

  ngOnInit() {
  }

}
