import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Notification } from './interfaces/NotificationInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {

  title = 'password generator';
  hide: boolean = true
  notification: Notification = { error: false, message: '' }

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {

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
