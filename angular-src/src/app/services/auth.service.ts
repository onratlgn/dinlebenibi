import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  trainer: any;
  isDev: true;
  constructor(private http: Http) {
      this.isDev = true;  // Change to false before deployment
      }

    

  registerTraining(training){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('trainings/new', training, {headers: headers})
      .map(res => res.json());
  }
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, {headers: headers})
      .map(res => res.json());
  }
  
  registerTrainer(trainer) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('trainers/register', trainer, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }
  
  authenticateTrainer(trainer) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('trainers/authenticate', trainer, {headers: headers})
      .map(res => res.json());
  }



  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('users/profile', {headers: headers})
      .map(res => res.json());
  }
  getTrainerProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('trainers/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  
  storeTrainerData(token, trainer) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('trainer', JSON.stringify(trainer));
    this.authToken = token;
    this.trainer = trainer;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    this.trainer = null;
    localStorage.clear();
  }
}
