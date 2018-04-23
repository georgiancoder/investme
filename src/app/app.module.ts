import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { GrowlModule } from 'primeng/growl';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PaginatorModule } from 'primeng/paginator';
import { ShareButtonModule } from '@ngx-share/button';
import { YoutubeModule } from 'angularx-youtube';


import { AppComponent } from './app.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { HomeComponent } from './home/home.component';
import { ProjectSliderComponent } from './project-slider/project-slider.component';
import { PartnersComponent } from './partners/partners.component';
import { ProfileComponent } from './profile/profile.component';
import { MyprojectsComponent } from './myprojects/myprojects.component';
import { AllprojectComponent } from './allproject/allproject.component';
import { EditprojectComponent } from './editproject/editproject.component';
import { FavoriteprojectsComponent } from './favoriteprojects/favoriteprojects.component';
import { ProjectinnerComponent } from './projectinner/projectinner.component';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

//services
import { ProjectService } from './services/project.service';
import { CategorieService } from './services/categorie.service';
import { FooterService } from './services/footer.service';
import { MainService } from './services/main.service';
import { HeaderService } from './services/header.service';
import { AuthService } from './services/auth.service';
import { LangsService } from './services/langs.service';
import { ProfileService } from './services/profile.service';
import { AddProjectService } from './services/add-project.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ThumbsSliderComponent } from './thumbs-slider/thumbs-slider.component';
import { SafePipe } from './safe.pipe';

const routes: Routes = [
{
  path: '',
  component: HomeComponent
},
{
  path: 'addProject',
  component: AddProjectComponent,
  canActivate: [AuthGuard]
},
{
  path: 'myprojects',
  component: MyprojectsComponent,
  canActivate: [AuthGuard]
},
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard]
},
{
  path: 'allproject',
  component: AllprojectComponent
},
{
  path: 'editproject/:id',
  component: EditprojectComponent,
  canActivate: [AuthGuard]
},
{
  path: 'favorite',
  component: FavoriteprojectsComponent,
  canActivate: [AuthGuard]
},
{
  path: 'project/:id',
  component: ProjectinnerComponent
}
];

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    HomeComponent,
    ProjectSliderComponent,
    PartnersComponent,
    ProfileComponent,
    MyprojectsComponent,
    AllprojectComponent,
    EditprojectComponent,
    FavoriteprojectsComponent,
    ProjectinnerComponent,
    ThumbsSliderComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,{useHash: true}),
    NgxCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DropdownModule,
    FileUploadModule,
    GrowlModule,
    TooltipModule,
    InputTextareaModule,
    CheckboxModule,
    ChipsModule,
    MultiSelectModule,
    RadioButtonModule,
    PaginatorModule,
    ShareButtonModule.forRoot(),
    YoutubeModule
  ],
  providers: [
    ProjectService,
    CategorieService,
    FooterService,
    MainService,
    HeaderService,
    AuthService,
    LangsService,
    AuthGuard,
    ProfileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
