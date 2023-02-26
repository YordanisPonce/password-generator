import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Notification } from '../interfaces/NotificationInterface';
import { Password } from '../interfaces/Password';
import { RequestPassword } from '../interfaces/RequestPassword';
import { GeneratePasswordService } from '../services/generate-password.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {
  request: RequestPassword = {
    range: 4,
    uppercaseLetter: false,
    lowercaseLetter: false,
    numbers: false,
    symbols: false
  }
  loading: boolean = false;
  @Output() notifyChange = new EventEmitter<Notification>(undefined);
  @ViewChild('strengthSelected') strengthSelected: ElementRef<HTMLDivElement> | undefined;

  notify: Notification | undefined


  constructor(private get_password: GeneratePasswordService, private translate: TranslateService) { }

  getPassword() {
    const onError = (resp: HttpErrorResponse) => {
      this.notify = { error: true, message: this.getTranslateText('toast.error') };
    }
    const onSubscribe = (resp: Password) => {
      this.get_password.sharePassword(resp.random_password);
      this.notify = { error: false, message: this.getTranslateText('toast.success') };
    }
    this.setLoading(true)
    this.get_password.getPassword(this.request)
      .subscribe(
        {
          next: onSubscribe,
          error: onError,
        }
      ).add(() => {
        this.setLoading(false)
        this.notifyChange.emit(this.notify);
      });
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

  getTranslateText(text: string) {
    return this.translate.instant(text);
  }
  setStrength() {
    const range = this.request.range;
    if (range == 4) {
      this.paintBoxes();
    } else if (range >= 4 && range <= 8) {
      this.paintBoxes(1);
    } else if (range > 8 && range <= 15) {
      this.paintBoxes(2);
    } else {
      this.paintBoxes(3);
    }
  }

  private paintBoxes(amount: number = 0) {
    const setChild = (childs: HTMLCollection) => Array.from(childs).forEach((el: Element, i: number) => {
      if (i <= amount) {
        el.classList.replace('border-white', 'border-transparent');
        (<HTMLDivElement>el).classList.add('bg-strength-selected');
      } else {
        el.classList.replace('border-transparent', 'border-white');
        (<HTMLDivElement>el).classList.remove('bg-strength-selected');
      }
    });
    this.strengthSelected?.nativeElement.children && setChild(this.strengthSelected?.nativeElement.children);
  }
}
