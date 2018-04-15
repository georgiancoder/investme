import { AfterViewInit, Component, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FooterService } from './services/footer.service';
import { HeaderService } from './services/header.service';
import { AuthService } from './services/auth.service';
import { LangsService } from './services/langs.service';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {Router} from "@angular/router";
import  * as $  from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  @ViewChild('regforma') regforma: ElementRef;
  @ViewChild('logforma') logforma: ElementRef;

  user: any;

  authorized: any;

  regAuth: boolean = false;

  footer: any;
  header: any;
  post:any;
  regForm:FormGroup;
  logForm:FormGroup;

  lang: string = '';

  currentPage = '';

  name:string = '';
  username:string = '';
  lastname:string = '';
  email:string = '';
  password:string = '';
  password_confirmation: string = '';

  showregauth: boolean = false;
  showusermenu: boolean = false;

  dropDownHeight: number = 0;

  authorizationFormHeight: number = 0;
  regFormHeight: number = 0;
  logFormHeight: number = 0;

  regCurrHeight: number;
  logCurrHeight: number;

  getHeader(): void{
    this.headerservice.getHeader(this.lang).subscribe(headers => {this.header = headers; });
  }

  changeLang(lng){
    this.langsservice.setLang(lng);
    this.lang = lng;
    var event = new Event('langchanged');
    document.dispatchEvent(event);
  }

  passwordConfirmation(form: FormGroup){
    var valid = {errors: false};
    if(form.controls['password'].value == form.controls['password_confirmation'].value){
      valid = null;
    }else{
        form.controls['password_confirmation'].setErrors({notEquivalent: true});
    }
    return valid;
  }

  register(post){
    post.client_id = 1;
    post.client_secret = 'piZ2ZlYrN3c1mWEua91BJvnlCLN1t9gaDyZtgjcX';
    post.grant_type = 'personal_access';

    this.authservice.registration(post).subscribe(response => {
      this.logIn({username: post.email, password: post.password});
    }, err => {
      console.log(err);
    })
  }

  logOut(){
    this.authservice.logOut().subscribe((res)=>{
      if(res.success){
        this.authservice.destroyToken();
        this.authservice.removeAuthenticatedUser();
        this.authorized = false;
        this.user = null;
        this.dropDownHeight = 0;
        this.router.navigate(['/']);
      }
    });
  }

  logIn(post){
    post.client_id = 2;
    post.client_secret = 'lHYhuPulH7RKiczYeIjzh8xqvV6JrOX7RnpBryMK';
    post.grant_type = 'password';
    this.authservice.logIn(post).subscribe(res => {
      this.authservice.setToken(res.access_token,res.expires_in + Date.now());
      this.authorized = this.authservice.isAuthenticated();
      this.authservice.setAuthenticatedUser();
      setTimeout(() => {
        this.user = this.authservice.getAuthenticatedUser();
        this.dropDownHeight = 0;
        $("body").css({position: "static", width: '100%', overflow: "visible"});
      },500);
    });
  }

  getFooter(){
    this.footerservice.getFooter(this.lang).subscribe(f => { this.footer = f; console.log(f) });
  }

  usermenuDropDown(): void{
    if(this.authorized && this.user){
      this.showusermenu = (this.showusermenu) ? false : true;
      if(this.showusermenu){
        this.dropDownHeight = Number($(".usermenu > ul").innerHeight()) + 8;
      }else{
        this.dropDownHeight = 0;
      }
    }
  }

  regDropdown(): void{
    if(!this.authorized && !this.user){
      this.showregauth = (this.showregauth) ? false : true;
      if(this.showregauth){
        this.dropDownHeight = Number($(window).innerHeight() - 100);
        $("body").css({position: "fixed", width: '100%', overflow: "hidden"});
      }else{
        this.dropDownHeight = 0;
        $("body").css({position: "static", width: 'auto', overflow: "auto"});
      }
    }else if(this.authorized && this.user){
      this.showusermenu = (this.showusermenu) ? false : true;
      if(this.showusermenu){
        this.dropDownHeight = Number($(".usermenu > ul").innerHeight()) + 8;
      }else{
        this.dropDownHeight = 0;
      }
    }
  }


  constructor(private footerservice: FooterService, private headerservice: HeaderService, private fb: FormBuilder, private authservice: AuthService, private router: Router, private langsservice: LangsService){

    this.router.events.subscribe((val) => {
        if(val){
          this.currentPage = this.router.url;
        }
    });

    this.regForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
      'lastname': [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
      'email': [null, Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5) ])],
      'password_confirmation': [null, Validators.compose([Validators.required, Validators.minLength(5) ])]
    },{
       validator: this.passwordConfirmation.bind(this)
    });

    this.logForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit(){
    this.lang = this.langsservice.getLang();
    this.getFooter();
    this.getHeader();
    this.authorized = this.authservice.isAuthenticated();
    this.user = this.authservice.getAuthenticatedUser();

    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.getFooter();
      this.getHeader();
    });

    document.addEventListener('profileUpdated',(e)=>{
      this.user = this.authservice.getAuthenticatedUser();
    })

  }

  ngAfterViewInit() {

  }


}
