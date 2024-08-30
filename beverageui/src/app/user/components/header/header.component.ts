import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  isMobileView: boolean = false;
  userId: string = '';
  
  constructor(private authService: AuthService, private router: Router) {
    this.checkWindowSize();
    this.userId = this.authService.getUserId() ?? '';
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

  signUp(){
    this.router.navigate(['signup']);
  }

  login(){
    this.router.navigate(['login']);
  }
}
