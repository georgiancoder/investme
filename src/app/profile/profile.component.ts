import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { LangsService } from '../services/langs.service';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  lang: string = '';

  profileTranslations: any;

  profileData: FormGroup;
  changePass: FormGroup;

  avatar: string;

  msgs: Message[] = [];

  name: string = '';
  lastname: string = '';
  livingPlace: string = '';
  username: string = '';
  email: string = '';
  tell: string = '';
  piradiN: number;
  facebook: string = '';
  twitter: string = '';
  instagram: string = '';

  day: number = 1;
  month: number = 0;
  year: number = 2010;
  post: any;

  old_password: string;
  password: string = '';
  password_confirmation: string= '';


  tellPrefixe;

  days: SelectItem[];
  months: SelectItem[];
  years: SelectItem[];
  tellPrefixes: SelectItem[];

  editProfile(post){
    if(post.day == 'day'){
      post.day = 1;
    }
    if(post.month == 'month'){
      post.month = 1;
    }
    if(post.year == "year"){
      post.year = 2010;
    }
    if(this.profileData.valid){
      this.profileservice.editProfile(post).subscribe(data => {
        localStorage.removeItem('user');
        localStorage.setItem('user',JSON.stringify(data.user));
        var event = new Event('profileUpdated');
        document.dispatchEvent(event);
      });
    }
  }

  getTranslations():void{
    this.profileservice.getTranslations().subscribe(data=>{
      this.profileTranslations = data.translations;
      console.log(data);
    });
  }

  uploadProfilePic(event){
    this.profileservice.uploadProfilePic(event.files[0],(user)=>{
      localStorage.removeItem('user');
      localStorage.setItem('user',JSON.stringify(user));
      this.avatar = user.avatar;
    });
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

  changePassword(post):void{
    this.profileservice.changePassword(post).subscribe(res => {
        if(res.status === 'error'){
          this.msgs.push({severity:'error', summary:'error', detail:res.text});
        }else{
          this.msgs.push({severity:'success', summary:'success', detail:res.text});
        }
    });
  }

  constructor(private fb: FormBuilder, private langsservice: LangsService, public profileservice: ProfileService, private authservice: AuthService) {
    this.years = [];
    for(var i = 2010; i >= 1900; i--){
      this.years.push({
        label: i.toString(), value: i
      });
    }
    this.days = [];
    for(var i=1; i<=31; i++){
      this.days.push({
        label: i.toString(), value: i
      });
    }
    this.months = [
      {label: 'იანვარი', value: 1},
      {label: 'თებერვალი', value: 2},
      {label: 'მარტი', value: 3},
      {label: 'აპრილი', value: 4},
      {label: 'მაისი', value: 5},
      {label: 'ივნისი', value: 6},
      {label: 'ივლისი', value: 7},
      {label: 'აგვისტო', value: 8},
      {label: 'სექტემბერი', value: 9},
      {label: 'ოქტომბერი', value: 10},
      {label: 'ნოემბერი', value: 11},
      {label: 'დეკემბერი', value: 12},
    ];
    this.tellPrefixes = [
      {label: '+995', value: 995}
    ];

    this.profileData = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.maxLength(32),Validators.pattern(/^([^0-9]*)$/)])],
      'lastname': [null, Validators.compose([Validators.required, Validators.maxLength(48),Validators.pattern(/^([^0-9]*)$/)])],
      'livingPlace': [null, Validators.compose([Validators.required])],
      'username': [null, Validators.compose([Validators.required,Validators.maxLength(32)])],
      'email': [null, Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'tell': [null, Validators.compose([Validators.required, Validators.maxLength(9),Validators.pattern(/^\d+$/)])],
      'piradiN': [null, Validators.compose([Validators.minLength(11),Validators.maxLength(11),Validators.required,Validators.pattern(/^(0|[0-9][0-9]*)$/)])],
      'facebook': new FormControl('facebook'),
      'twitter': new FormControl('twitter'),
      'instagram': new FormControl('instagram'),
      'day': new FormControl('day'),
      'month': new FormControl('month'),
      'year': new FormControl('year')
    });

    this.changePass = fb.group({
      'old_password': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'password_confirmation': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    },
    {
       validator: this.passwordConfirmation.bind(this)
    });

   }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    var user = this.authservice.getAuthenticatedUser();
    if(user){
      this.avatar = user.avatar;
      this.name = user.name;
      this.lastname = user.lastname;
      this.livingPlace = user.livingCity;
      this.username = user.username;
      this.piradiN = user.personalId;
      this.tell = user.phone;
      this.email = user.email;
      this.facebook = user.facebook;
      this.twitter = user.twitter;
      this.instagram = user.instagram;
      if(user.birthDate){
        this.day = user.birthDate.split('/')[0];
        this.month = user.birthDate.split('/')[1];
        this.year = user.birthDate.split('/')[2];
      }else{
        this.day = 1;
        this.month = 1;
        this.year = 2010;
      }
      this.profileData.setValue({
        name: user.name,
        lastname: user.lastname,
        livingPlace: user.livingCity,
        username: user.username,
        tell: user.phone,
        email: user.email,
        piradiN: user.personalId,
        facebook: user.facebook,
        twitter: user.twitter,
        instagram: user.instagram,
        day: this.day,
        month:this.month,
        year: this.year
      });
    }

    this.getTranslations();
    document.addEventListener('langchanged',(e)=>{
      this.getTranslations();
    });
  }

}
