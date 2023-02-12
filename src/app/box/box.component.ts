import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
  options = ['Upercase letters', 'lowercase letters', 'numbers', 'symbols'];
  loading: boolean = false;
  constructor(private get_password: GeneratePasswordService) { }

  getPassword() {
    const onError = (resp: HttpErrorResponse) => {
      alert(resp.statusText);
    }
    const onSubscribe = (response: Password) => {
      this.get_password.sharePassword(response.random_password);
    }
    this.setLoading(true)
    this.get_password.getPassword(this.request)
      .subscribe(
        {
          next: onSubscribe,
          error: onError
        }
      ).add(() => {
        this.setLoading(false)
      });
    console.log(this.request);

  }

  setLoading(value: boolean) {
    this.loading = value;
  }
}
