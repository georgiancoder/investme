import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AskService } from "../../services/ask.service";

@Component({
  selector: 'askmodal',
  templateUrl: 'askmodal.component.html',
  styleUrls: ['askmodal.component.scss']
})
export class AskmodalComponent {
  hidden: boolean = true;

  askdata:any;
  name:string;
  email:string;
  message:string;

  show(){
    this.hidden = false;
  }

  stoppropagation(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  ask(value){
    this.askService.ask(value).subscribe(result=>{
      console.log(result)
    });
  }

  hide(){
    this.hidden = true;
    return false;
  }

  constructor(private fb: FormBuilder, private askService: AskService){
    this.askdata = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.maxLength(32),Validators.pattern(/^([^0-9]*)$/)])],
      'email': [null, Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'message': [null, Validators.compose([Validators.required, Validators.maxLength(32)])]
    });
  }
}
