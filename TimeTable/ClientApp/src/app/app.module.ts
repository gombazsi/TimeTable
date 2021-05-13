import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
//import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { SubjectsComponent } from './subject-section/subjects/subjects.component';
import { LessonsComponent } from './lessons-section/lessons/lessons.component';
import { LocationsComponent } from './locations-section/locations/locations.component';
import { SubjectItemComponent } from './subject-section/subject-item/subject-item.component';
import { SubjectsService } from './subject-section/subjects.service';
import { LocationItemComponent } from './locations-section/location-item/location-item.component';
import { LocationsService } from './locations-section/locations.service';
import { EditModalComponent } from './shared/edit-modal/edit-modal.component';
import { LessonComponent } from './lessons-section/lesson/lesson.component';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { UserManager } from 'oidc-client';
import { LessonsService } from './lessons-section/lessons.service';
import { EditLessonComponent } from './lessons-section/edit-lesson/edit-lesson.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FetchDataComponent,
    SubjectsComponent,
    LessonsComponent,
    LocationsComponent,
    SubjectItemComponent,
    LocationItemComponent,
    EditModalComponent,
    LessonComponent,
    EditLessonComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ApiAuthorizationModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: SubjectsComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
      { path: 'locations', component: LocationsComponent },
      { path: 'lessons', component: LessonsComponent },
      
    ])
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    SubjectsService,
    LocationsService,
    AuthorizeService,
    LessonsService,
    UserManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
