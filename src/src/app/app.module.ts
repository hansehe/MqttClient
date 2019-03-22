import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { MqttCommunicationService } from './mqtt-communication-service/mqtt-communication.service';
import { IMqttCommunicationService } from './mqtt-communication-service/mqtt-communication.interface';

import { MqttCommunicationComponent } from './mqtt-communication/mqtt-communication.component';

@NgModule({
  declarations: [
    AppComponent,
    MqttCommunicationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    HttpClientModule
  ],
  providers: [
    { provide: IMqttCommunicationService, useClass: MqttCommunicationService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
