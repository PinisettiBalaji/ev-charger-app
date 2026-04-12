import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { EmptyStateComponent } from './shared/components/empty-state/empty-state.component';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from './home/filter/filter.component';
import { ListComponent } from './home/list/list.component';
import { CardComponent } from './home/card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { AddChargerComponent } from './charger/add-charger/add-charger.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    LoaderComponent,
    EmptyStateComponent,
    HomeComponent,
    FilterComponent,
    ListComponent,
    CardComponent,
    LoginComponent,
    AddChargerComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
