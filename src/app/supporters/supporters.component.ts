import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from "@angular/router";
import { SupportersService } from '../services/supporters.service';

@Component({
  selector: 'app-supporters',
  templateUrl: './supporters.component.html',
  styleUrls: ['./supporters.component.scss','./supporters.responsive.component.scss']
})
export class SupportersComponent implements OnInit {

	supporters: any;
  constructor(private supportersService: SupportersService, private routerPath: RouterModule, private acrR: ActivatedRoute) { }

  // getSupporters(){
  //   this.supportersService.getSupporters('3', 'ka').subscribe(supporters=>{
  //     this.supporters = supporters;
  //     console.log(this.supporters)
  //   });
  // }

  ngOnInit() {
    this.acrR.params.subscribe((router)=>{
      this.supportersService.getSupporters(router.projectId, 'ka').subscribe(supporters=>{
        this.supporters = supporters;
      });
    });
    
  }
  activeMoreinfo(i){
     i.classList.toggle('show');
  }
}
