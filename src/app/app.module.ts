import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { WebsiteService } from './services/website.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PagesComponent,
    UsersComponent,
    SettingsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},

      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      {path: 'pages', component: PagesComponent, canActivate: [AuthGuard] },
      {path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
      {path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
      {path: '**', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] }
    ]
    ),
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, HttpClient, AuthGuard,AuthenticationService, WebsiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
