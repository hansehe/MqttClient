import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export abstract class IMqttCommunicationService {
  abstract connect$(username: string, password: string): Subject<boolean>;
  abstract subscribe$(topic: string): Subject<string>;
  abstract send(topic: string, message: string): void;
}
