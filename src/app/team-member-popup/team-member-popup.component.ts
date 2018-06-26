import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-team-member-popup',
  templateUrl: './team-member-popup.component.html',
  styleUrls: ['./team-member-popup.component.scss','./team-member-popup.responsive.scss']
})
export class TeamMemberPopupComponent implements OnInit {

	@Input() openPopup:boolean;
	@Input() teamMember:any;

	@Output() close = new EventEmitter<boolean>();

  siteUrl: string = "https://back.investme.ge";

	closePopup(){
		this.close.emit(true);
	}

  constructor() { }

  ngOnInit() {
  }

}
