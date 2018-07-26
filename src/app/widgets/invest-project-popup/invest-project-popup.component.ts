import { Component, OnInit, ComponentRef, ViewChild, ElementRef } from '@angular/core';
import { IModalDialog, IModalDialogButton, IModalDialogOptions} from 'ngx-modal-dialog';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-invest-project-popup',
  templateUrl: './invest-project-popup.component.html',
  styleUrls: ['./invest-project-popup.component.scss']
})
export class InvestProjectPopupComponent implements OnInit, IModalDialog {
  activateBtn: boolean = false;
  transid: string;
  actionButtons: IModalDialogButton[];
  awardId: number;
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
    this.projectService.inverstProject(this.awardId).subscribe(transid=>{
      this.transid = transid["TRANSACTION_ID"];
      let cv = this.transForm.nativeElement;
      setTimeout(function () {
        cv.submit();
      }, 300);
    });
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
    this.awardId = options.data;
  }
}
