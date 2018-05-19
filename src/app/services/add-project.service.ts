import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AddProjectService {

  saveProjectStep(name,obj){
    if(localStorage.getItem(name)){
      localStorage.removeItem(name);
      localStorage.setItem(name,JSON.stringify(obj));
    }else{
      localStorage.setItem(name,JSON.stringify(obj));
    }

    // console.log(localStorage.getItem(name));
  }

  getProjectStep(name){
    return localStorage.getItem(name);
  }

  removeProjectStep(name){
    localStorage.removeItem(name);
  }

  getData(lng){
    console.log(lng);
    if(this.auth.isAuthenticated()){
      let authToken = this.auth.getToken();
      const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken, 'X-App-Locale': lng});
      return this.http.get<any>("https://back.investme.ge/api/addproject",{
        headers: headers,
      });
    }
  }

  addMainInfo(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/addproject/storeFirstStep",post,{
      headers: headers
    });
  }

  uploadDocuments(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/addproject/storeSecondStep",post,{
      headers: headers
    });
  }

  addAwards(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/addproject/storeThirdStep",post,{
      headers: headers
    });
  }

  sendPayment(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/addproject/storeSixethStep",post,{
      headers: headers
    });
  }

  addMember(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/addproject/storeFourthStep",post,{
      headers: headers
    });
  }

  addFinances(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/addproject/storeFivethStep",post,{
      headers: headers
    });
  }

  uploadMainPic(file, cb){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(this.auth.isAuthenticated()){
        let authToken = this.auth.getToken();
        const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
        return this.http.post<any>("https://back.investme.ge/api/addproject/uploadImage",{image: reader.result, type: file.type},{
          headers: headers
        }).subscribe(user => {
          cb(user);
        });
      }
    }
  }

  constructor(private http: HttpClient, private auth: AuthService) {
  }

}
