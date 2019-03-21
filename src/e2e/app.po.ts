import { browser, by, element } from 'protractor';

export class AppPage {
  msTimeout = 1000;

  navigateTo() {
    return browser.get('/');
  }

  getConnectRabbitMqButton() {
    return element(by.id('connectButton'));
  }

  getSendMessageToRabbitMqButton() {
    return element(by.id('sendMessageButton'));
  }

  getConnectedText() {
    return browser.wait(() => element(by.id('rabbitConnected')), this.msTimeout);
  }

  getReceivedMessageText() {
    return browser.wait(() => element(by.id('messageResult')), this.msTimeout);
  }
}
