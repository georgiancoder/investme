import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { AddProjectService } from '../services/add-project.service';
import { SelectItem } from 'primeng/api';
import { LangsService } from '../services/langs.service';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss','./add-project.responsive.scss']
})
export class AddProjectComponent implements OnInit {
  @ViewChild("transForm", {read: ElementRef}) transForm: ElementRef;
  transid: string;
  siteUrl: string = "https://back.investme.ge";

  siteLang: string;


  months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  years: number[] = [];

  projectData: any;
  stepIndex: number = 0;
  projectLang: string = 'ka';
  projectId: number;
  hash: string;

  // first step form main info

  firstStep: object = {
    project_id: null,
    hash: null,
    projectMainPic: '',
    category: '',
    imageType: '',
    interest: '',
    campainTime: '',
    ka: {
      campainTimes: [],
      categoriebi: [],
      title: '',
      smalldesc: '',
      longdesc: '',
      targetCapital: 0,
      interests: [],
    },
    en: {
      campainTimes: [],
      categoriebi: [],
      title: '',
      smalldesc: '',
      longdesc: '',
      targetCapital: 0,
      interests: [],
    },
    ru: {
      campainTimes: [],
      categoriebi: [],
      title: '',
      smalldesc: '',
      longdesc: '',
      targetCapital: 0,
      interests: [],
    },
    capital: 0
  };

  //second step form

  secondStep: object = {
    project_id: null,
    hash: null,
    ka:{
      documents: [{
        file: null,
        text: '',
        name: '',
        uploaded: false
      }],
      uploadedDocuments: [],
      videos: [{
        name: '',
        link: ''
      }],
      fotos: []
    },
    en:{
      documents: [{
        file: null,
        text: '',
        name: '',
        uploaded: false
      }],
      uploadedDocuments: [],
      videos: [{
        name: '',
        link: ''
      }],
      fotos: []
    },
    ru:{
      documents: [{
        file: null,
        text: '',
        name: '',
        uploaded: false
      }],
      uploadedDocuments: [],
      videos: [{
        name: '',
        link: ''
      }],
      fotos: []
    },
  }

  //third step form

  jildoebi: object = {
    hash: null,
    project_id: null,
    money: [""],
    doc: [''],
    pdfs: [{
      file_type: '',
      awardPdf: '',
      name: ''
    }],
    date: [{
      month: '',
      year: ''
    }],
    ka: [{
      title: '',
      desc: '',
    }],
    en: [{
      title: '',
      desc: '',
    }],
    ru: [{
      title: '',
      desc: '',
    }]
  };

  //foruth step form

  team = {
    project_id: null,
    hash : null,
    photoes: [{file: null, type: ''}],
    ka: [{
      fullname: '',
      email: '',
      role: '',
      information: ''
    }],
    en: [{
      fullname: '',
      email: '',
      role: '',
      information: ''
    }],
    ru: [{
      fullname: '',
      email: '',
      role: '',
      information: ''
    }]
  };

  //fifth step form

  finansebi: object = {
    project_id: null,
    hash: null,
    targetCapital: 0,
    prognos: 0,
    amount: 0,
    acountNumber: ''
  }

  //sixth step form

  payment = '';

  steps: any[];

  // first step functions

  addMainInfo(){
    this.addprojectservice.addMainInfo(this.firstStep).subscribe(res => {
      console.log(res);
      if(res && res.project_id){
        var newMainInfo = Object.assign({},this.firstStep);
        this.firstStep["project_id"] = res.project_id;
        this.projectId = res.project_id;
        this.firstStep["hash"] = res.hash;
        this.hash = res.hash;
        newMainInfo["projectMainPic"] = this.siteUrl + res.main_image;
        this.addprojectservice.saveProjectStep('mainInfo',newMainInfo);
      }
    });
  }
  uploadMainPic(event){
    var reader = new FileReader();
    reader.readAsDataURL(event.files[0]);
    this.firstStep['imageType'] = event.files[0].type;
    reader.onload = () =>{
      this.firstStep["projectMainPic"] = reader.result;
    }
  }

// second step functions

  documentChange(event, i){
    var reader = new FileReader();
    reader.readAsDataURL(event.srcElement.files[0]);
    if(reader){
      reader.onload = () => {
        this.secondStep[this.projectLang].documents[i].file = reader.result;
        this.secondStep[this.projectLang].documents[i].name = event.srcElement.files[0].name;
      }
    }
  }

  addNewDocumentForm(){
    this.secondStep["ka"].documents.push({ file: null, text: ''});
    this.secondStep["en"].documents.push({ file: null, text: ''});
    this.secondStep["ru"].documents.push({ file: null, text: ''});
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

          step['ka'].fotos.push(newfotoka);
          step['en'].fotos.push(newfotoen);
          step['ru'].fotos.push(newfotoru);
          fcounter++;
          if(fcounter < event.srcElement.files.length)
            readfile(fcounter, step);
        }
      }
    }
  }

  jildoPdf(event, i){
    var reader = new FileReader();
    reader.readAsDataURL(event.srcElement.files[0]);
    if(reader){
      reader.onload = () => {
        this.jildoebi["pdfs"][i].awardPdf = reader.result;
        console.log(this.jildoebi);
        this.jildoebi["pdfs"][i].name = event.srcElement.files[0].name;
      }
    }


  }

  addDocuments(){
    var ki = 0;
    var ei = 0;
    var ri = 0;
    this.secondStep["project_id"] = this.projectId;
    this.secondStep["hash"] = this.hash;
    if(this.secondStep["ka"].fotos.length == 0){
      this.secondStep["ka"].fotos = [{title: ''}];
    }
    if(this.secondStep["en"].fotos.length == 0){
      this.secondStep["en"].fotos = [{title: ''}];
    }
    if(this.secondStep["ru"].fotos.length == 0){
      this.secondStep["ru"].fotos = [{title: ''}];
    }
    this.addprojectservice.uploadDocuments(this.secondStep).subscribe(res=>{
      console.log(res);
      if(res && res.status){
        var newSecondStep = Object.assign({},this.secondStep);
        newSecondStep["ka"].documents.forEach(d=>{
          d.file = null;
        });
        newSecondStep["en"].documents.forEach(d=>{
          d.file = null;
        });
        newSecondStep["ru"].documents.forEach(d=>{
          d.file = null;
        });

        res.files.forEach((f,i)=>{
           if(f.lang == 'ka'){
            this.secondStep['ka'].documents[ki].file = f.file;
            if(f.file)
              this.secondStep['ka'].documents[ki].uploaded = true;
            ki++;
            }
            if(f.lang == 'en'){
              this.secondStep['en'].documents[ei].file = f.file;
              if(f.file)
                this.secondStep['en'].documents[ei].uploaded = true;
              ei++;
            }
            if(f.lang == 'ru'){
              this.secondStep['ru'].documents[ri].file = f.file;
              if(f.file)
              this.secondStep['ru'].documents[ri].uploaded = true;
              ri++;
            }
        });


        newSecondStep["ka"].fotos = [];
        newSecondStep["en"].fotos = [];
        newSecondStep["ru"].fotos = [];



        this.addprojectservice.saveProjectStep('failebi',newSecondStep);
      }
    });
  }

  addVideos(){
    this.secondStep["ka"].videos.push({name: '', link: ''});
    this.secondStep["en"].videos.push({name: '', link: ''});
    this.secondStep["ru"].videos.push({name: '', link: ''});
  }

  // third step functions

  addAwards(){

    let haserrors = false;
    this.jildoebi['date'].forEach((d)=>{
      if(d.month.length == 0 || d.year.length == 0){
        haserrors = true;
      }
    });
    this.jildoebi["project_id"] = this.projectId;
    this.jildoebi["hash"] = this.hash;
    if(!haserrors){
      this.addprojectservice.addAwards(this.jildoebi).subscribe(res=>{
        console.log(res);
        if(res && res.status){
          this.addprojectservice.saveProjectStep('jildoebi',this.jildoebi);
          this.stepIndex++;
        }
      });
    } else {
      console.log('error while adding award')
    }

  }

  moreAward(){
    this.jildoebi["doc"].push('');
    this.jildoebi["date"].push({
      month: '',
      year: ''
    })
    this.jildoebi["money"].push('');
    this.jildoebi["pdfs"].push({
      file_type: '',
      awardPdf: '',
      name: ''
  });
    this.jildoebi['ka'].push({
      title: '',
      desc: ''
    });
    this.jildoebi['en'].push({
      title: '',
      desc: ''
    });
    this.jildoebi['ru'].push({
      title: '',
      desc: ''
    });
  }

  // fourth step function

  uploadMemberPhoto(event, i){
    var reader = new FileReader();
    reader.readAsDataURL(event.srcElement.files[0]);
    if(reader){
      reader.onload = () => {
        this.team.photoes[i].file = reader.result;
        this.team.photoes[i].type =event.srcElement.files[0].type;
      }
    }
  }

  moreMember(){
    this.team['ka'].push({
      fullname: '',
      email: '',
      role: '',
      information: ''
    });
    this.team['en'].push({
      fullname: '',
      email: '',
      role: '',
      information: ''
    });
    this.team['ru'].push({
      fullname: '',
      email: '',
      role: '',
      information: ''
    });
    this.team.photoes.push({file: null, type: ''});
  }

  addMember(){
    this.team.hash = this.hash;
    this.team.project_id = this.projectId;
    console.log(this.team);
    this.addprojectservice.addMember(this.team).subscribe(res=>{
      console.log(res);
      if(res && res.status){
        res.teams.forEach((t,i)=>{
          console.log(t);
          this.team["photoes"][i].file = t;
        });

        // this.team["photoes"].

        this.addprojectservice.saveProjectStep('members',this.team);
        this.stepIndex++;
      }
    });
  }

  //fifth step functions

  addFinances(){
    console.log(this.finansebi);
    this.finansebi["project_id"] = this.projectId;
    this.finansebi["hash"] = this.hash;
    this.addprojectservice.addFinances(this.finansebi).subscribe(res=>{
      console.log(res);
      if(res && res.status){
        this.addprojectservice.saveProjectStep('finances',this.finansebi);
        this.stepIndex++;
      }
    });
  }


  sendPayment(post){
    var json = {
      method: post,
      project_id: this.projectId,
      hash: this.hash
    }

    this.addprojectservice.sendPayment(json).subscribe(res=>{
      if(post == 'online'){
        this.transid = res["TRANSACTION_ID"];
        let cv = this.transForm.nativeElement;
        setTimeout(function () {
          cv.submit();
        }, 300);
      }

      this.addprojectservice.removeProjectStep('mainInfo');
      this.addprojectservice.removeProjectStep('failebi');
      this.addprojectservice.removeProjectStep('jildoebi');
      this.addprojectservice.removeProjectStep('members');
      this.addprojectservice.removeProjectStep('finances');
    });
  }

  getData(){

    this.addprojectservice.getData(this.siteLang).subscribe(data => {
      this.projectData = data;
      // console.log(data);
      this.steps = [
       {title: this.projectData.translations.aboutProject, active: true, selectable: true},
       {title: this.projectData.translations.files, active: false, selectable: false},
       {title: this.projectData.translations.awards, active: false, selectable: false},
       {title: this.projectData.translations.team, active: false, selectable: false},
       {title: this.projectData.translations.finance, active: false, selectable: false},
       {title: this.projectData.translations.pay, active: false, selectable: false}
     ];

     this.projectData.categories.forEach((cat)=>{
       cat.category.forEach((c)=>{
         var newcat = {
           value: cat.id,
           label: c.title
         }
          this.firstStep[c.lang].categoriebi.push(newcat);
       });
     });

     this.projectData.interests.forEach((intrst)=>{
       intrst.interest.forEach((i)=>{
         var newintrst = {
           label: i.title,
           value: intrst.id
         };
         this.firstStep[i.lang].interests.push(newintrst);
       });
     });
     if(this.addprojectservice.getProjectStep('mainInfo')){
       this.firstStep = JSON.parse(this.addprojectservice.getProjectStep('mainInfo'));
       this.projectId = this.firstStep["project_id"];
       this.hash = this.firstStep["hash"];
       this.finansebi["targetCapital"] = this.firstStep["capital"];
     }
     if(this.addprojectservice.getProjectStep('failebi')){
       this.secondStep = JSON.parse(this.addprojectservice.getProjectStep('failebi'));
     }
     if(this.addprojectservice.getProjectStep('jildoebi')){
       this.jildoebi = JSON.parse(this.addprojectservice.getProjectStep('jildoebi'));
     }
     if(this.addprojectservice.getProjectStep('members')){
       this.team = JSON.parse(this.addprojectservice.getProjectStep('members'));
     }
     if(this.addprojectservice.getProjectStep('finances')){
       this.finansebi = JSON.parse(this.addprojectservice.getProjectStep('finances'));
     }
    });
  }


  selectStep(step){
    // if(step.selectable){
      this.stepIndex = this.steps.indexOf(step);
    // }
  }

  constructor(private fb: FormBuilder, private addprojectservice: AddProjectService, private langservice: LangsService) {

    var currentYear = new Date().getFullYear();

    for(var i = currentYear; i <= 2030; i++){
      this.years.push(i);
    }

    for(var i = 30; i < 100; i+=10){
      this.firstStep['ka'].campainTimes.push({label: i + ' დღე', value: i});
      this.firstStep['en'].campainTimes.push({label: i + ' day', value: i});
      this.firstStep['ru'].campainTimes.push({label: i + ' день', value: i});
    }

   }

  ngOnInit() {
    this.siteLang = this.langservice.getLang();
    this.getData();
    document.addEventListener('langchanged',()=>{
      this.siteLang = this.langservice.getLang();
      this.getData();
    });
  }

}
