import { Component } from '@angular/core';
import { HeaderComponent } from "../../user/components/header/header.component";
import { FooterComponent } from "../../user/components/footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

} 
