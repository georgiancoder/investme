import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-blogwidget',
  templateUrl: './blogwidget.component.html',
  styleUrls: ['./blogwidget.component.scss']
})
export class BlogwidgetComponent implements OnInit {

  @Input() data:any;

  @Input() type:string;

  @Input() totalItems: number = 1;

  siteUrl:string = "https://back.investme.ge";
  p: number = 1;

  pageChanged(event) {
    this.p = event;
    this.router.navigate(['media'],{queryParams: {page: this.p}});
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.p = (params['page']) ? params['page'] : 1;
    });
  }

}
