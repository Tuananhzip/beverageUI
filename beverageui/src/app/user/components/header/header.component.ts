import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isMobileView: boolean = false;
  userId: string = '';
  user: any = {};
  constructor(private authService: AuthService, private router: Router) {
    this.checkWindowSize();
    this.infoUser();
  }

  infoUser(){
    this.userId = this.authService.getUserId() ?? ''; 
    this.user = this.authService.getInfoUser(this.userId);
  }

  ngOnInit(): void {
    
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkWindowSize();
  }
  private checkWindowSize() {
    this.isMobileView = window.innerWidth < 768; 
  }

  logout(){
    this.authService.logout();
  }
}
