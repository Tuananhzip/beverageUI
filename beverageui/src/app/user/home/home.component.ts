import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../service/auth/auth.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class HomeComponent implements AfterViewInit{
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  constructor(private authService: AuthService){
    
  }
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    
  }
}
