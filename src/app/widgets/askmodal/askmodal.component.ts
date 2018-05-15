import { Component } from '@angular/core';

@Component({
  selector: 'askmodal',
  templateUrl: 'askmodal.component.html',
  styleUrls: ['askmodal.component.scss']
})
export class AskmodalComponent {
  hidden: boolean = true;

  show(){
    this.hidden = false;
  }

  stoppropagation(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  hide(){
    this.hidden = true;
    return false;
  }
}
