import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  public mockData = [];
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'POST' && request.url === '/login') {
      const reqData = request.body;
      let responseData = {};
      if (reqData.username === 'admin' && reqData.password === 'admin') {
        responseData = {
          name: 'admin'
        };
        return of(new HttpResponse({ status: 200, body: responseData }));
      } else if (reqData.username === 'guest' && reqData.password === 'guest') {
        responseData = {
          name: 'guest'
        };
        return of(new HttpResponse({ status: 200, body: responseData }));
      } else {
        responseData = { 
          err: 'Wrong User credentals'
        };
        return of(new HttpResponse({ status: 200, body: responseData }));
      }
    } else if (request.method === 'GET' && request.url === '/getData') {
      return of(new HttpResponse({ status: 200, body: JSON.parse(localStorage.getItem('mockData')) }));
    } else if (request.method === 'POST' && request.url === '/getData') {
      this.mockData = JSON.parse(localStorage.getItem('mockData'));
      if (!this.mockData) {
        this.mockData = [];
      }
      const dataResp = request.body;
      dataResp.id = this.createId();
      this.mockData.push(dataResp);
      localStorage.setItem('mockData', JSON.stringify(this.mockData));
      return of(new HttpResponse({ status: 200, body: this.mockData }));
    } else if (request.method === 'PUT' && request.url === '/getData') {
      this.mockData = JSON.parse(localStorage.getItem('mockData'));
      if (!this.mockData) {
        this.mockData = [];
      }
      for (let i = 0; i < this.mockData.length; i++) {
        if (this.mockData[i].id === request.body.id) {
          this.mockData[i] = request.body;
        }
      }
      console.log(this.mockData);
      localStorage.setItem('mockData', JSON.stringify(this.mockData));
      return of(new HttpResponse({ status: 200, body: this.mockData }));
    } else if (request.method === 'DELETE' && request.url.includes('/getData')) {
      this.mockData = JSON.parse(localStorage.getItem('mockData'));
      if (!this.mockData) {
        this.mockData = [];
      }
      const urlFragments = request.url.split('/');
      const deleteId = urlFragments[urlFragments.length - 1];
      if (this.mockData.length) {
        this.mockData = this.mockData.filter(mock => mock.id !== deleteId);
      }
      localStorage.setItem('mockData', JSON.stringify(this.mockData));
      return of(new HttpResponse({ status: 200, body: this.mockData }));
    }
    return next.handle(request);
  }

  public createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
