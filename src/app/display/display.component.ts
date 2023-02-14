import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Notification } from '../interfaces/NotificationInterface';
import { GeneratePasswordService } from '../services/generate-password.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  password: string = '';
  tooltipText: string | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;

  constructor(private generatePassword: GeneratePasswordService, private transLateService: TranslateService) {
  }
  ngOnInit(): void {

    this.generatePassword.passwordResult$.subscribe(psw => {
      this.password = psw
    });
  }



  copyToclipBoard() {
    navigator.clipboard.writeText(this.passwordInput?.nativeElement.value).then(resp => { this.setTextClipboard('display.textCopied'); }
    ).catch(resp => { this.tooltipText = "Error"; });

  }

  replace() {
    setTimeout(() => {
      this.setTextClipboard('display.cliboardCopy');
    }, 201);
  }

  setTextClipboard(text: string) {
    this.tooltipText = this.transLateService.instant(text);
  }
}
