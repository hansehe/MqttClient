import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('mqtt-service App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should connect to rabbit mq', () => {
    page.navigateTo();
    page.getConnectRabbitMqButton().click();
    browser.sleep(100);
    page.getConnectedText();
  });

  // it('should send message to rabbit mq', () => {
  //   page.navigateTo();
  //   page.getSendMessageToRabbitMqButton().click();
  //   page.getConnectRabbitMqButton().click();
  //   browser.sleep(100);
  //   page.getConnectedText();
  //   page.getSendMessageToRabbitMqButton().click();
  //   browser.sleep(100);
  //   page.getReceivedMessageText();
  // });
});
