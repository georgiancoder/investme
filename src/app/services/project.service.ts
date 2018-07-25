import { Injectable } from '@angular/core';
import { PROJECTS } from '../projects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class ProjectService {

  getMyProjects(lng){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken, 'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/profile/myprojects",{
      headers: headers
    });
  }

  inverstProject(awardId){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/pay",{id: awardId},{
      headers: headers
    });
  }

  getFavoriteProjects(lng){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken, 'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/favorite",{
      headers: headers
    });
  }

  getAllProject(lng, page){
    if(this.auth.isAuthenticated()){
      let authToken = this.auth.getToken();
      const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken, 'X-App-Locale': lng});
      return this.http.get<any>("https://back.investme.ge/api/projects?page="+page,{
        headers: headers
      });
    }else{
      const headers = new HttpHeaders({'X-App-Locale': lng});
      return this.http.get<any>("https://back.investme.ge/api/projects?page="+page,{
        headers: headers
      });
    }
  }

  getPopularProjects(lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/ratingProject",{
      headers: headers
    });
  }

  getNewProjects(lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/newProject",{
      headers: headers
    });
  }

  filterProjects(lng, post){
    if(this.auth.isAuthenticated()){
      let authToken = this.auth.getToken();
      const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken, 'X-App-Locale': lng});
      return this.http.post<any>("https://back.investme.ge/api/filter",post,{
        headers: headers
      });
    }else{
      const headers = new HttpHeaders({'X-App-Locale': lng});
      return this.http.post<any>("https://back.investme.ge/api/filter",post,{
        headers: headers
      });
    }
  }

  getProject(id,lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/projects/"+ id,{
      headers: headers
    });
  }

  getProjectData(id){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.get<any>("https://back.investme.ge/api/editproject?id="+id,{
      headers: headers
    });
  }

  editFirstStep(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/editproject/updateFirstStep",post,{
      headers: headers
    });
  }

  editSecondStep(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/editproject/updateSecondStep",post,{
      headers: headers
    });
  }

  editThirdStep(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/editproject/updateThirdStep",post,{
      headers: headers
    });
  }

  editFouthStep(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/editproject/updateFourthStep",post,{
      headers: headers
    });
  }

  editFifthStep(post){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/editproject/updateFivethStep",post,{
      headers: headers
    });
  }

  deleteFile(id){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/editproject/updateSecondStep/deleteFile",{id: id},{
      headers: headers
    });
  }

  deletePhoto(id){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/editproject/updateSecondStep/deletePhoto",{id: id},{
      headers: headers
    });
  }

  deleteVideo(id){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/editproject/updateSecondStep/deleteVideo",{id: id},{
      headers: headers
    });
  }

  deleteAward(obj){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/editproject/updateThirdStep/deleteAward",{id: obj},{
      headers: headers
    });
  }

  deleteMember(obj){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/editproject/updateFourthStep/deleteMember",obj,{
      headers: headers
    });
  }

  addToFavorite(projectId){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/favorite",{project_id: projectId},{
      headers: headers
    });
  }

  removeFromFavorite(projectId){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
    return this.http.post<any>("https://back.investme.ge/api/favorite/deleteFavorite",{project_id: projectId},{
      headers: headers
    });
  }

  constructor(private http: HttpClient, private auth: AuthService) { }

}
