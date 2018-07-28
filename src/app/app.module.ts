import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {GrowlModule} from 'primeng/growl';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipsModule} from 'primeng/chips';
import {MultiSelectModule} from 'primeng/multiselect';
import {RadioButtonModule} from 'primeng/radiobutton';
import {PaginatorModule} from 'primeng/paginator';
import {ShareButtonModule} from '@ngx-share/button';
import {YoutubeModule} from 'angularx-youtube';
import {NgxPaginationModule} from 'ngx-pagination';
import { ClipboardModule } from 'ngx-clipboard';
import { ModalDialogModule } from 'ngx-modal-dialog';


import {AppComponent} from './app.component';
import {AddProjectComponent} from './add-project/add-project.component';
import {HomeComponent} from './home/home.component';
import {ProjectSliderComponent} from './project-slider/project-slider.component';
import {PartnersComponent} from './partners/partners.component';
import {ProfileComponent} from './profile/profile.component';
import {MyprojectsComponent} from './myprojects/myprojects.component';
import {AllprojectComponent} from './allproject/allproject.component';
import {EditprojectComponent} from './editproject/editproject.component';
import {FavoriteprojectsComponent} from './favoriteprojects/favoriteprojects.component';
import {ProjectinnerComponent} from './projectinner/projectinner.component';
import {NgxCarouselModule} from 'ngx-carousel';
import 'hammerjs';

//services

import {EventsService} from "./services/events.service";
import {BlogService} from "./services/blog.service";
import {AskService} from "./services/ask.service";
import {ProjectService} from './services/project.service';
import {CategorieService} from './services/categorie.service';
import {FooterService} from './services/footer.service';
import {MainService} from './services/main.service';
import {HeaderService} from './services/header.service';
import {AuthService} from './services/auth.service';
import {LangsService} from './services/langs.service';
import {ProfileService} from './services/profile.service';
import {AddProjectService} from './services/add-project.service';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {ThumbsSliderComponent} from './thumbs-slider/thumbs-slider.component';
import {SafePipe} from './safe.pipe';
import {TeamMemberPopupComponent} from './team-member-popup/team-member-popup.component';
import {AboutComponent} from './about/about.component';
import {FaqComponent} from './faq/faq.component';
import {FaqPopupComponent} from './faq-popup/faq-popup.component';
import {ContactComponent} from './contact/contact.component';
import {MediaComponent} from './media/media.component';
import {MediaInnerComponent} from './media-inner/media-inner.component';
import {TextPagesService} from './services/text-pages.service';
import {PrivacyComponent} from './privacy/privacy.component';
import {RulesComponent} from './rules/rules.component';
import {MediaService} from './services/media.service';
import {BreadCrumbsComponent} from './widgets/breadcrumbs/breadcrumbs.component';
import {AskmodalComponent} from './widgets/askmodal/askmodal.component';
import {SideMenu} from './widgets/sidemenu/sidemenu.component';
import {RgoliComponent} from './widgets/rgoli/rgoli.component';
import {BlogwidgetComponent} from './widgets/blogwidget/blogwidget.component';
import {BlogwidgetinnerComponent} from './widgets/blogwidgetinner/blogwidgetinner.component';
import {BlogComponent} from "./blog/blog.component";
import {BloginnerComponent} from './bloginner/bloginner.component';
import { FbauthComponent } from './fbauth/fbauth.component';
import { AddProjectPageComponent } from './add-project-page/add-project-page.component';
import { InvestProjectComponent } from './invest-project/invest-project.component';
import { EventsComponent } from './events/events.component';
import {EventsInnnerComponent} from './events-innner/events-innner.component';
import { InvestProjectPopupComponent } from './widgets/invest-project-popup/invest-project-popup.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SuccessPayComponent } from './success-pay/success-pay.component';
import { ErrorPayComponent } from './error-pay/error-pay.component';
import { ErrorCallbackComponent } from './error-callback/error-callback.component';
import { CharityComponent } from './widgets/charity/charity.component';

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
    path: 'addProjectPage',
    component: AddProjectPageComponent
  },
  {
    path: 'investproject',
    component: InvestProjectComponent
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
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'media',
    component: MediaComponent
  },
  {
    path: 'media/:id',
    component: MediaInnerComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'rules',
    component: RulesComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'blog/:id',
    component: BloginnerComponent
  },
  {
    path: 'p/:id',
    redirectTo: 'project/:id',
    pathMatch: 'full'
  },
  {
    path: 'fb',
    component: FbauthComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'events/:id',
    component: EventsInnnerComponent
  },
  {
    path: 'categorypage/:id',
    component: CategoryPageComponent
  },
  {
    path: 'successPay',
    component: SuccessPayComponent
  },
  {
    path: 'errorPay',
    component: ErrorPayComponent
  },
  {
    path: 'errorCallback',
    component: ErrorCallbackComponent
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
    SafePipe,
    TeamMemberPopupComponent,
    AboutComponent,
    FaqComponent,
    FaqPopupComponent,
    ContactComponent,
    MediaComponent,
    MediaInnerComponent,
    PrivacyComponent,
    RulesComponent,
    BreadCrumbsComponent,
    AskmodalComponent,
    SideMenu,
    RgoliComponent,
    BlogwidgetComponent,
    BlogwidgetinnerComponent,
    BlogComponent,
    BloginnerComponent,
    FbauthComponent,
    AddProjectPageComponent,
    InvestProjectComponent,
    EventsComponent,
    EventsInnnerComponent,
    InvestProjectPopupComponent,
    CategoryPageComponent,
    SuccessPayComponent,
    ErrorPayComponent,
    ErrorCallbackComponent,
    CharityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {useHash: true}),
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
    YoutubeModule,
    NgxPaginationModule,
    ClipboardModule,
    ModalDialogModule.forRoot()
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
    TextPagesService,
    MediaService,
    AddProjectService,
    AskService,
    BlogService,
    EventsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InvestProjectPopupComponent,
    CharityComponent
  ]
})
export class AppModule {
}
