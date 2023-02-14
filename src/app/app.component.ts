import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Notification } from './interfaces/NotificationInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'password generator';
  hide: boolean = true
  notification: Notification = { error: false, message: '' }

  constructor(private translate: TranslateService) {

  }
  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }



  showToast(value: any) {
    this.notification = <Notification>value;
    this.hide = false;

    setTimeout(() => {
      this.hide = true;
    }, 1495);

  }

  hideToast() {
    this.hide = true;
  }
}
