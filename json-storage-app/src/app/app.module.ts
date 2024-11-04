// src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataFormComponent } from './components/data-form/data-form.component';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { JsonDataService } from './json-data.service';

@NgModule({
  declarations: [
    AppComponent,
    DataFormComponent,
    DataDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [JsonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
