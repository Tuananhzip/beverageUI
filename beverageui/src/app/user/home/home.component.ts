import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private auth: AuthService,private http: HttpClient) { }
  ngOnInit(): void {
  }
  logout(){
    //this.auth.logout();
    this.http.get('http://localhost:5051/api/customers').subscribe({
      next: (res) => console.log('Data received:', res),
      error: (error) => console.error('Error:', error)
    });
  }
}
