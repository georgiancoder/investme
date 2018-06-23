import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from "@angular/router";
import { AuthService } from '../services/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  template: ``
})
export class FbauthComponent implements OnInit{

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private http: HttpClient){

  }


  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(param=>{
      if(param['token']){
        let token = param['token'];
        // const headers = new HttpHeaders({'Authorization': 'Bearer '+ token});
        this.http.post<any>("https://back.investme.ge/api/checkAuth",{token: token}).subscribe(user => {
          console.log(user);
          let post = {
            client_id: 2,
            client_secret: 'lHYhuPulH7RKiczYeIjzh8xqvV6JrOX7RnpBryMK',
            grant_type: 'password',
            username: user.email,
            password: 'secret'
          };
          this.authService.logIn(post).subscribe(res=>{
            this.authService.setToken(res.access_token,res.expires_in + Date.now());
            this.authService.setAuthenticatedUser(()=>{
              window.location.href = "https://investme.ge/";
            });

          });

        });

      }
    });
  }


}
