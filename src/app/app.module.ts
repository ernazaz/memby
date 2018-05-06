import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database'; 
import { AngularFireAuthModule } from 'angularfire2/auth'; 
import { RouterModule } from '@angular/router'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { AgmCoreModule } from '@agm/core';
import { enableProdMode } from '@angular/core';
import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AnalysisComponent } from './analysis/analysis.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { HomeComponent } from './home/home.component';
import { LoyaltyComponent } from './loyalty/loyalty.component';
import { PlacesComponent } from './places/places.component';
import { HaversineService } from 'ng2-haversine';
import { IndividualFormComponent } from './individual-form/individual-form.component';
import { AdminBonusComponent } from './admin-bonus/admin-bonus.component';
import { PlacesService } from './places/places.service';
import { DiscountsService } from './discounts/discounts.service';
import { LoyaltyService } from './loyalty/loyalty.service';
import { IndividualService } from './individual-form/individual.service';
import { AdminBonusService } from './admin-bonus/admin-bonus.service';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { WorkersComponent } from './workers/workers.component';
import { WorkersService } from './workers/workers.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { RequestComponent } from './request/request.component';
import { RequestService } from './request/request.service';
import { ReturnComponent } from './return/return.component';
import { ReturnService } from './return/return.service';
import { ChatComponent } from './chat/chat.component';
import { PrizesComponent } from './prizes/prizes.component';
import { ImageCropperModule,   } from 'ngx-image-cropper';




@NgModule({
  declarations: [
    AppComponent,
    AnalysisComponent,
    BsNavbarComponent,
    DiscountsComponent,
    HomeComponent,
    LoyaltyComponent,
    PlacesComponent,
    IndividualFormComponent,
    AdminBonusComponent,
    RegistrationComponent,
    LoginComponent,
    WorkersComponent,
    RequestComponent,
    ReturnComponent,
    ChatComponent,
    PrizesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ImageCropperModule,
   
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFtuLuNLbmCN7rXwbgl5KzaUWAwL-lm6A',
      libraries: ["places"],
      language: 'lt',
    }),
    RouterModule.forRoot([
      { 
        path: 'places',
        component: PlacesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'discounts',
        component: DiscountsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'loyalty',
        component: LoyaltyComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'loyalty/new',
        component: LoyaltyComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'loyalty/prizes',
        component: PrizesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'analysis',
        component: AnalysisComponent,
        canActivate: [AuthGuard]
      },
      { path: 'individual',
        component: IndividualFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-bonus',
        component: AdminBonusComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'request',
        component: RequestComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'workers',
        component: WorkersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'return',
        component: ReturnComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuard]
      },

    ]),
  ],
  providers: [
    PlacesService,
    DiscountsService,
    LoyaltyService,
    IndividualService,
    HaversineService,
    AdminBonusService,
    AuthService,
    AuthGuard,
    UserService,
    WorkersService,
    AdminAuthGuard,
    RequestService,
    ReturnService,
    ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
