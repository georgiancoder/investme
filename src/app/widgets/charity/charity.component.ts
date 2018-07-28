import {Component, ComponentRef, OnInit, ViewChild, ElementRef} from '@angular/core';
import { IModalDialog, IModalDialogButton, IModalDialogOptions} from 'ngx-modal-dialog';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.scss']
})
export class CharityComponent implements OnInit {
  actionButtons: IModalDialogButton[];
  projectId;
  transid: string;
  amount:number = 0;
  @ViewChild("transForm", {read: ElementRef}) transForm: ElementRef;
  constructor(private projectService: ProjectService) {
    this.actionButtons = [
      { text: 'Close' }, // no special processing here
      { text: 'I will always close', onAction: () => true },
      { text: 'I never close', onAction: () => false }
    ];
  }

  ngOnInit() {
  }

  submit(){
    this.projectService.charity(this.projectId, this.amount).subscribe(transid=>{
      this.transid = transid["TRANSACTION_ID"];
      let cv = this.transForm.nativeElement;
      setTimeout(function () {
        cv.submit();
      }, 300);
    });
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
    this.projectId = options.data;
  }
}
