import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';

import { IMqttCommunicationService } from '../mqtt-communication-service/mqtt-communication.interface';
import { EventContract } from '../contracts/event-contract'

@Component({
  selector: 'app-mqtt-communication',
  templateUrl: './mqtt-communication.component.html',
  styleUrls: ['./mqtt-communication.component.css']
})
export class MqttCommunicationComponent implements OnInit {
  count = 0;
  topic = 'Contracts.Event';
  nReceivedMessages = 0;
  lastnReceivedMessages = 0;
  nReceivedMessagesPerSec = 0;
  connected = false;
  username = 'amqp';
  password = 'amqp';
  messageInput = 'ping pong!';
  maxPingpongs = 1000;
  pingPongs = 100;
  sendMessageDisabled = false;

  receivedEvents: { [id: string]: EventContract } = {};
  receivedEventKeys: string[] = [];

  cols: any[];

  constructor(
    private http: HttpClient,
    private mqttCommunicationService: IMqttCommunicationService) { }

  ngOnInit() {
    setInterval(this.handleTimerUpdate.bind(this), 500);
    this.cols = [
      { field: 'Event', header: 'Event' },
      { field: 'PingPongs', header: 'PingPongs' }
    ];
  }

  connect() {
    this.mqttCommunicationService.connect$(this.username, this.password).subscribe((connected) => {
      this.handleConnected(connected);
    });
  }

  publishMessage() {
    const message = this.messageInput;
    let eventContract: EventContract = 
    {
      Id: Guid.create().toString(),
      Event: message,
      Stop: false,
      PingPongs: this.getValidPingPongs(),
      Forward: true
    }
    this.mqttCommunicationService.send(this.topic, JSON.stringify(eventContract));
  }

  sendMessage() {
    this.sendMessageDisabled = true;
    const pingPongUrl = '/pingpong/api/event/';
    const message = this.messageInput;
    let eventContract: EventContract = 
    {
      Id: Guid.create().toString(),
      Event: message,
      Stop: false,
      PingPongs: this.getValidPingPongs(),
      Forward: true
    }
    this.http.post(pingPongUrl, eventContract).subscribe(() => {
      this.sendMessageDisabled = false;
    });
  }

  handleConnected(connected: boolean) {
    this.connected = connected;
    if (!connected) {
      throw new Error('Could not connect to rabbitmq');
    }

    this.mqttCommunicationService.subscribe$(this.topic).subscribe((message) => {
      let contract: EventContract = JSON.parse(message);
      this.nReceivedMessages++;

      let index = this.receivedEventKeys.indexOf(contract.Id)

      if (contract.PingPongs > 0 && index < 0)
      {
        this.receivedEvents[contract.Id] = contract;
        this.receivedEventKeys.push(contract.Id);
      }
      else if (contract.PingPongs > 0 && index >= 0)
      {
        this.receivedEvents[contract.Id].PingPongs = contract.PingPongs;
      }
      else if (contract.PingPongs == 0 && index >= 0)
      {
        this.receivedEventKeys.splice(index);
        delete this.receivedEvents[contract.Id];
      }
    });
  }

  getValidPingPongs(): number {
    if (this.pingPongs > this.maxPingpongs)
    {
      this.pingPongs = this.maxPingpongs;
    }
    else if (this.pingPongs < 0)
    {
      this.pingPongs = 0;
    }
    return this.pingPongs;
  }

  handleTimerUpdate()
  {
    this.nReceivedMessagesPerSec = (this.nReceivedMessages - this.lastnReceivedMessages)*2;
    this.lastnReceivedMessages = this.nReceivedMessages;
  }

}
