import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Notification } from '../interfaces/NotificationInterface';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent{

 

  @Input() text: string | undefined
  @Input() errorMessage: boolean = true 
}
