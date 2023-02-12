import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    this.generatePassword.passwordResult$.subscribe(psw => { this.password = psw });
  }



  copyToclipBoard() {
    navigator.clipboard.writeText(this.passwordInput?.nativeElement.value);
    this.tooltipText = "Copied!";
  }

  replace() {
    setTimeout(() => {
      this.tooltipText = "Copy to clipboard!";
    }, 201);
  }
}
