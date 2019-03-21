import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

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
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule
  ],
  providers: [
    { provide: IMqttCommunicationService, useClass: MqttCommunicationService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
