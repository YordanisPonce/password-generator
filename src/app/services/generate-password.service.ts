import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Password } from '../interfaces/Password';
import { BehaviorSubject } from 'rxjs';
import { RequestPassword } from '../interfaces/RequestPassword';

@Injectable({
  providedIn: 'root'
})
export class GeneratePasswordService {

  baseUrl: string = 'https://api.api-ninjas.com/v1/passwordgenerator?length=';
  private ps$ = new BehaviorSubject<string>('');
  passwordResult$ = this.ps$.asObservable();
  constructor(private http: HttpClient) { }


  getPassword({ range, numbers, symbols }: RequestPassword) {
    return this.http.get<Password>(`${this.baseUrl}${range}&exclude_numbers=${!numbers}&exclude_special_chars=${!symbols}`, {
      headers: {
        'X-Api-Key': 'dIq7IHNnfj1a/ejOPios4g==2qhFZU17fuwfPVWp'
      }
    });
  }

  sharePassword(password: string) {
    this.ps$.next(password);
  }
}
