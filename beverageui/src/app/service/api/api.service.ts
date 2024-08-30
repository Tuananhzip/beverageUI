import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private baseUrl: string = 'http://192.168.1.65:5051/api';
  private baseUrl: string = 'http://localhost:5051/api';
  
  getAuthUrl(param: string): string {
    return `${this.baseUrl}/Authentication/${param}`;
  }
}
