import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Notification } from '../interfaces/NotificationInterface';
import { GeneratePasswordService } from '../services/generate-password.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  password: string = '';
  tooltipText = "Copy to clipboard!";
  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;

  constructor(private generatePassword: GeneratePasswordService) {

  }
  ngOnInit(): void {
    this.generatePassword.passwordResult$.subscribe(psw => {
      this.password = psw
    });
  }



  copyToclipBoard() {
    navigator.clipboard.writeText(this.passwordInput?.nativeElement.value).then(resp => { this.tooltipText = "Copied!"; }
    ).catch(resp => { this.tooltipText = "Error"; });

  }

  replace() {
    setTimeout(() => {
      this.tooltipText = "Copy to clipboard!";
    }, 201);
  }
}
