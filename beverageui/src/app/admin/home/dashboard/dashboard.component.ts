import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  constructor(private authService: AuthService){
    
  }
  ngOnInit(): void {
  }
}
