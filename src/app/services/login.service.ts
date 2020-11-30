import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://192.168.1.66/oauth/token';

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string) {

  }

}
