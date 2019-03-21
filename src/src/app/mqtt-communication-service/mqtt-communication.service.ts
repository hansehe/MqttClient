import { Injectable, OnInit } from '@angular/core';
import { Client, connect, IClientOptions, IPacket, ISubscriptionGrant } from 'mqtt';
import { Subject } from 'rxjs/Subject';
import { IMqttCommunicationService } from './mqtt-communication.interface';

@Injectable()
export class MqttCommunicationService extends IMqttCommunicationService {
  mqttClient: Client;
  topicSubscriptions$: { [topic: string]: Subject<string>; } = {};
  connected = false;

  constructor() {
    super();
  }

  connect$(username: string, password: string): Subject<boolean> {
    let sslEnabled = location.protocol == 'https:';

    const clientOptions: IClientOptions = {
      protocol: sslEnabled ? 'wss' : 'ws', // If ssl, use: 'wss'
      path: '/rabbitmq/ws',
      clientId: 'clientid_' + Math.floor(Math.random() * 65535),
      username: username,
      password: password,
      keepalive: 10,
      reconnectPeriod: 1000,
      connectTimeout: 10 * 1000
    };

    const connected$ = new Subject<boolean>();

    this.mqttClient = connect(clientOptions);

    this.mqttClient.on('connect', () => {
      this.connected = true;
      connected$.next(this.connected);
    });

    this.mqttClient.on('message', (topic: Buffer, message: Buffer) => {
      this.handleIncomingMessage(topic.toString(), message.toString());
    });

    return connected$;
  }

  subscribe$(topic: string): Subject<string> {
    this.assertConnected();
    const topicSubscription$ = this.createNewTopicSubscription$(topic);
    return topicSubscription$;
  }

  send(topic: string, message: string): void {
    this.assertConnected();
    this.mqttClient.publish(topic, message);
  }

  assertConnected(): void {
    if (!this.connected) {
      throw new Error('Mqtt is not connected! Please run connect()');
    }
  }

  createNewTopicSubscription$(topic: string): Subject<string> {
    topic = topic.replace('.', '/')
    if (!(topic in this.topicSubscriptions$)) {
      this.topicSubscriptions$[topic] = new Subject<string>();
      this.mqttClient.subscribe(topic);
    }
    return this.topicSubscriptions$[topic];
  }

  handleIncomingMessage(topic: string, message: string): void {
    if (!(topic in this.topicSubscriptions$)) {
      throw new Error('Unregistered subscription received on topic and message:\r\n' + topic + '\r\n' + message);
    }
    this.topicSubscriptions$[topic].next(message);
  }
}
