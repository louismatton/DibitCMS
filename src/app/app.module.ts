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
import {AuthGuard} from './guards/auth.guard';


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
      {path: 'pages', component: PagesComponent},
      {path: 'users', component: UsersComponent},
      {path: 'settings', component: SettingsComponent},
      // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      // {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}]
    ]
    ),
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
