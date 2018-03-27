import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PagesComponent,
    UsersComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: DashboardComponent},
      {path: 'pages', component: PagesComponent},
      {path: 'users', component: UsersComponent},
      {path: 'settings', component: SettingsComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
