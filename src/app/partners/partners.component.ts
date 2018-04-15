import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  thumbsWidth: any;
  slideWidth: number = 0;
  @Input() partners: any;

  prevSlide(){
    if( this.slideWidth < 0 ){
      this.slideWidth+= 185;
    }
  }

  nextSlide(){
    if( (this.partners.length - Math.abs(this.slideWidth / 160)) > 6 ){
      this.slideWidth-=185;
    }
  }
  constructor() { }

  ngOnInit() {
    this.thumbsWidth = this.partners.length * 180 + 36 * this.partners.length;
  }

}
