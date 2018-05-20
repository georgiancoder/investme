import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from "@angular/router";
import { LangsService } from '../services/langs.service';
import { ProjectService } from '../services/project.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.scss']
})
export class EditprojectComponent implements OnInit {

  projectId: number;

  siteUrl: string = "https://back.investme.ge";

  siteLang: string;

  months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  years: number[] = [];

  projectData: any;
  stepIndex: number = 0;
  projectLang: string = 'ka';

  steps = [];


  firstStep: object = {};
  secondStep: object = {
    ka: {
      documents: [{file: null, text: '', name: ''}],
      uploadedPhotoes: [],
      photoes: [],
      videoDetail: [],
      videos: [{link: '', title: ''}]
    },
    en: {
      documents: [{file: null, text: '', name: ''}],
      uploadedPhotoes: [],
      photoes: [],
      videoDetail: [],
      videos: [{link: '', title: ''}]
    },
    ru: {
      documents: [{file: null, text: '', name: ''}],
      uploadedPhotoes: [],
      photoes: [],
      videoDetail: [],
      videos: [{link: '', title: ''}]
    }
  };
  thirdStep: object = {
    ka: [],
    en: [],
    ru: [],
    amount: [],
    deliver_date: []
  };
  fourthStep: object = {
    photoes: [],
    ka: [],
    en: [],
    ru: []
  };
  fifthStep: object = {
    targetCapital: '',
    prognos: '',
    amount: '',
    acountNumber: '',
    project_id: ''
  };

  getProjectData(){
    this.ProjectService.getProjectData(this.projectId).subscribe(res=>{
      console.log(res);
      this.projectData = res;
      this.projectId = res.project.id;
      this.steps = [
       {title: this.projectData.translations.aboutProject, active: true, selectable: true},
       {title: this.projectData.translations.files, active: false, selectable: false},
       {title: this.projectData.translations.awards, active: false, selectable: false},
       {title: this.projectData.translations.team, active: false, selectable: false},
       {title: this.projectData.translations.finance, active: false, selectable: false},
       {title: this.projectData.translations.pay, active: false, selectable: false}
     ];
     this.getFirstStepData();
     this.getSecondStepData();
     this.getThirdStepData();
     this.getFourthStepData();
     this.getFifthStepData();
    });
  }

  getFirstStepData(){
    this.projectData.detail.forEach((data,i)=>{
      this.firstStep[data.lang] = data;
    });
    this.firstStep['ka']["categories"] = [];
    this.firstStep['en']["categories"] = [];
    this.firstStep['ru']["categories"] = [];
    this.projectData.categories.forEach((data,i)=>{
      data.category.forEach((data2,j)=>{
        this.firstStep[data2.lang]["categories"].push(data2);
      });
    });
    this.firstStep["capital"] = this.projectData.project.capital;
    this.firstStep["company_time"] = this.projectData.project.company_time;
    this.firstStep["category_id"] = this.projectData.project.category_id + '';
    this.firstStep['ka']["campainTimes"] = [];
    this.firstStep['en']["campainTimes"] = [];
    this.firstStep['ru']["campainTimes"] = [];
    for(var i = 30; i < 360; i+=10){
      this.firstStep['ka'].campainTimes.push({label: i + ' დღე', value: i});
      this.firstStep['en'].campainTimes.push({label: i + ' day', value: i});
      this.firstStep['ru'].campainTimes.push({label: i + ' день', value: i});
    }
    this.firstStep["interest"] = [];
    this.projectData.interest.forEach(data=>{
      this.firstStep["interest"].push(data.id);
    });
    this.firstStep['ka']["interests"] = [];
    this.firstStep['en']["interests"] = [];
    this.firstStep['ru']["interests"] = [];
    this.projectData.interests.forEach(data=>{
      data.interest.forEach(data2=>{
        var newinterest = {
          label: data2.title,
          value: data2.interest_id
        }
        this.firstStep[data2.lang].interests.push(newinterest);
      });
    });
  }
  getSecondStepData(){
    this.secondStep["ka"].uploadedDocuments = [];
    this.secondStep["en"].uploadedDocuments = [];
    this.secondStep["ru"].uploadedDocuments = [];
    this.projectData.fileDetail.forEach(data=>{
      if(data.file && data.file.length > 0)
        this.secondStep[data.lang]['uploadedDocuments'].push(data);
    });
    this.projectData.imageDetail.forEach(data=>{
      if(data.image && data.image.length > 0)
        this.secondStep[data.lang].uploadedPhotoes.push(data);
    });
    this.projectData.videoDetail.forEach(data=>{
      if(data.title && data.link){
        data.link = data.link.split('=')[1];
        this.secondStep[data.lang].videoDetail.push(data);
      }
    });
  }
  getThirdStepData(){
    this.projectData.awardDetail.forEach(data=>{
      data.month = data.deliver_date.split('/')[0];
      data.year = data.deliver_date.split('/')[1];
      this.thirdStep[data.lang].push(data);
      if(data.amount && data.amount){
          this.thirdStep["amount"].push(data.amount);
      }
      if(data.deliver_date != '/'){
        var d = {
          month: data.deliver_date.split('/')[0],
          year: data.deliver_date.split('/')[1]
        }
        this.thirdStep["deliver_date"].push(d);
      }
    });
  }
  getFourthStepData(){
    if(this.projectData.teamDetail.length > 0){
      this.projectData.teamDetail.forEach(data=>{
        this.fourthStep[data.lang].push(data);
        if(data.lang == 'ka')
          this.fourthStep["photoes"].push({file: data.image, imageType: ''});
      });
    }else{
      this.moreMemeber();
    }

    console.log(this.fourthStep);
  }
  getFifthStepData(){
    this.fifthStep["targetCapital"] = this.projectData.project.capital;
    // this.fifthStep["prognos"] = this.projectData.finance[0].prognos;
    // this.fifthStep["amount"] = this.projectData.finance[0].amount;
    // this.fifthStep["acountNumber"] = this.projectData.finance[0].bank_number;
    this.fifthStep["project_id"] = this.projectId;
  }



  step2PhotoUploadChange(event, i){
    var reader = new FileReader();
    var fcounter = 0;
    readfile(fcounter, this.secondStep);

    function readfile(fcounter, step){
      reader.readAsDataURL(event.srcElement.files[fcounter]);
      if(reader){
        reader.onload = () => {
          var files = {

          }
          var newfotoka = {
            title: '',
            file: reader.result,
            type: event.srcElement.files[fcounter].type
          }
          var newfotoen = {
            title: '',
            file: reader.result,
            type: event.srcElement.files[fcounter].type
          }
          var newfotoru = {
            title: '',
            file: reader.result,
            type: event.srcElement.files[fcounter].type
          }

          step['ka'].photoes.push(newfotoka);
          step['en'].photoes.push(newfotoen);
          step['ru'].photoes.push(newfotoru);
          fcounter++;
          if(fcounter < event.srcElement.files.length)
            readfile(fcounter, step);
        }
      }
    }
    console.log(this.secondStep)
  }

  documentChange(event, i){
    var reader = new FileReader();
    reader.readAsDataURL(event.srcElement.files[0]);
    if(reader){
      reader.onload = () => {
        this.secondStep[this.projectLang].documents[i]["file"] = reader.result;
        this.secondStep[this.projectLang].documents[i]["name"] = event.srcElement.files[0].name;
      }
    }
  }

  updateFirstStep(){
    this.firstStep["project_id"] = this.projectId;
    this.ProjectService.editFirstStep(this.firstStep).subscribe(res=>{
      if(res && res.status){
        this.projectData.project.image = res.image;
      }
      this.stepIndex = 1;
    });
  }
  updateSecondStep(){
    this.secondStep["project_id"] = this.projectId;
    console.log(this.secondStep);
    this.ProjectService.editSecondStep(this.secondStep).subscribe(res=>{
      if(res && res.status){
        this.secondStep["ka"].documents = [{file: null, text: ''}];
        this.secondStep["en"].documents = [{file: null, text: ''}];
        this.secondStep["ru"].documents = [{file: null, text: ''}];

        this.secondStep["ka"].photoes = [];
        this.secondStep["en"].photoes = [];
        this.secondStep["ru"].photoes = [];

        this.secondStep["ka"].videos = [{link: '', title: ''}];
        this.secondStep["en"].videos = [{link: '', title: ''}];
        this.secondStep["ru"].videos = [{link: '', title: ''}];

        res.documents.forEach(data=>{
          if(data.file && data.file.length > 0)
            this.secondStep[data.lang]['uploadedDocuments'].push(data);
        });
        res.photoes.forEach(data=>{
          if(data.image && data.image.length > 0)
            this.secondStep[data.lang].uploadedPhotoes.push(data);
        });
        res.videos.forEach(data=>{
          if(data.title && data.link){
            data.link = data.link.split('=')[1];
            this.secondStep[data.lang].videoDetail.push(data);
          }
        });
      }
      this.stepIndex = 2;
    });
  }
  updateThirdStep(){
    let haserrors = false;
    this.thirdStep["ka"].forEach((data,i)=>{
      data.errors = [];
      data.amount = this.thirdStep['amount'][i];
      data.month = this.thirdStep["deliver_date"][i].month;
      data.year = this.thirdStep["deliver_date"][i].year;
      if(data.month.length == 0){
        data.errors.push('month required');
        haserrors = true;
      }
      if(data.year.length == 0){
        data.errors.push('year required');
        haserrors = true;
      }
    });
    this.thirdStep["en"].forEach((data,i)=>{
      data.errors = [];
      data.amount = this.thirdStep['amount'][i];
      data.month = this.thirdStep["deliver_date"][i].month;
      data.year = this.thirdStep["deliver_date"][i].year;
      if(data.month.length == 0){
        data.errors.push('month required');
        haserrors = true;
      }
      if(data.year.length == 0){
        data.errors.push('year required');
        haserrors = true;
      }
    });
    this.thirdStep["ru"].forEach((data,i)=>{
      data.errors = [];
      data.amount = this.thirdStep['amount'][i];
      data.month = this.thirdStep["deliver_date"][i].month;
      data.year = this.thirdStep["deliver_date"][i].year;
      if(data.month.length == 0){
        data.errors.push('month required');
        haserrors = true;
      }
      if(data.year.length == 0){
        data.errors.push('year required');
        haserrors = true;
      }
    });
    this.thirdStep["project_id"] = this.projectId;

    if(!haserrors){
      this.ProjectService.editThirdStep(this.thirdStep).subscribe(res=>{
        console.log(res);
        this.stepIndex = 3;
      });
    }else{
      console.log('errrooorr');
    }
  }
  updateFourthStep(){
    this.fourthStep["project_id"] = this.projectId;
    this.ProjectService.editFouthStep(this.fourthStep).subscribe(res=>{
      console.log(res);
      if(res && res.status){
        this.fourthStep["photoes"]  = [];
        this.fourthStep["ka"] = [];
        this.fourthStep["en"] = [];
        this.fourthStep["ru"] = [];
        res.teams.forEach(data=>{
          this.fourthStep[data.lang].push(data);
          if(data.lang == 'ka')
            this.fourthStep["photoes"].push({file: data.image, imageType: ''});
        });
      }
      this.stepIndex = 4;
    });
  }
  updateFifthStep(){
    console.log(this.fifthStep);
    this.ProjectService.editFifthStep(this.fifthStep).subscribe(res=>{
      console.log(res);
      this.stepIndex = 5;
    });
  }


  moreVieo(){
    this.secondStep["ka"].videos.push({link: '', title: ''});
    this.secondStep["ru"].videos.push({link: '', title: ''});
    this.secondStep["en"].videos.push({link: '', title: ''});
  }

  moreDoc(){
    this.secondStep["ka"].documents.push({file: null, text: ''});
    this.secondStep["en"].documents.push({file: null, text: ''});
    this.secondStep["ru"].documents.push({file: null, text: ''});
  }

  deleteFile(doc){
    this.ProjectService.deleteFile(doc.id).subscribe(res=>{
      if(res && res.status){
        var index = this.secondStep[this.projectLang].uploadedDocuments.indexOf(doc);
        this.secondStep[this.projectLang].uploadedDocuments.splice(index, 1);
      }
    });
  }

  deletePhoto(photo){
    this.ProjectService.deletePhoto(photo.id).subscribe(res=>{
      if(res && res.status){
        var index = this.secondStep[this.projectLang].uploadedPhotoes.indexOf(photo);
        this.secondStep[this.projectLang].uploadedPhotoes.splice(index, 1);
      }
    })
  }

  deleteVideo(video){
    this.ProjectService.deleteVideo(video.id).subscribe(res=>{
      if(res && res.status){
        var index = this.secondStep[this.projectLang].videoDetail.indexOf(video);
        this.secondStep[this.projectLang].videoDetail.splice(index, 1);
      }
    });
  }

  deleteAward(award, i){
    var obj = {
      ka: this.thirdStep["ka"][i].id,
      en: this.thirdStep["en"][i].id,
      ru: this.thirdStep["ru"][i].id
    }
    console.log(obj);
    this.ProjectService.deleteAward(obj).subscribe(res=>{
      console.log(res);
      if(res && res.status){
        this.thirdStep["ka"].splice(i,1);
        this.thirdStep["en"].splice(i,1);
        this.thirdStep["ru"].splice(i,1);

        this.thirdStep["amount"].splice(i,1);
        this.thirdStep["deliver_date"].splice(i,1);
        if(this.thirdStep["ka"].length == 0){
            this.moreAward();
        }
      }
    });
  }

  deleteMember(member, i){
    var obj = {
      ka: this.fourthStep["ka"][i].id,
      en: this.fourthStep["en"][i].id,
      ru: this.fourthStep["ru"][i].id
    }
    console.log(obj);
    this.ProjectService.deleteMember(obj).subscribe(res=>{
      console.log(res);
      if(res && res.status){
        this.fourthStep["ka"].splice(i,1);
        this.fourthStep["en"].splice(i,1);
        this.fourthStep["ru"].splice(i,1);

        this.fourthStep["photoes"].splice(i,1);

        if(this.fourthStep["ka"].length == 0){
            this.moreMemeber();
        }
      }
    });
  }

  moreMemeber(){
    this.fourthStep["ka"].push({
      name: '',
      email: '',
      role: '',
      description: '',
      image: ''
    });
    this.fourthStep["en"].push({
      name: '',
      email: '',
      role: '',
      description: '',
      image: ''
    });
    this.fourthStep["ru"].push({
      name: '',
      email: '',
      role: '',
      description: '',
      image: ''
    });
    this.fourthStep["photoes"].push({file: null, imageType: ''});
  }

  moreAward(){
    this.thirdStep["ka"].push({title: '', amout: '', month: '', year: '', description: ''});
    this.thirdStep["en"].push({title: '', amout: '', month: '', year: '', description: ''});
    this.thirdStep["ru"].push({title: '', amout: '', month: '', year: '', description: ''});

    this.thirdStep["amount"].push('');
    this.thirdStep["deliver_date"].push({month: '', year: ''});
  }

  memberPhotoChange(event, i){
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.fourthStep["photoes"][i].imageType = event.target.files[0].type;
    reader.onload = () =>{
      this.fourthStep["photoes"][i].file = reader.result;
    }
  }

  uploadMainPic(event){
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.firstStep['imageType'] = event.target.files[0].type;
    reader.onload = () =>{
      this.firstStep["projectMainPic"] = reader.result;
      console.log(this.firstStep);
    }
  }

  deleteMainPic(){
    this.projectData.project.image = '';
  }


  constructor(private langservice: LangsService, private ProjectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer) {
    var currentYear = new Date().getFullYear();
    for(var i = currentYear; i <= 2030; i++){
      this.years.push(i);
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.projectId = params["id"];
      });
      this.siteLang = this.langservice.getLang();
      this.getProjectData();
      document.addEventListener('langchanged',()=>{
        this.siteLang = this.langservice.getLang();
      });
  }

}
