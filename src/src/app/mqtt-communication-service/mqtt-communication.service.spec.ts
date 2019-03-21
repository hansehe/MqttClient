import { TestBed, inject } from '@angular/core/testing';

import { MqttCommunicationService } from './mqtt-communication.service';

describe('MqttCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MqttCommunicationService]
    });
  });

  it('should be created', inject([MqttCommunicationService], (service: MqttCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
