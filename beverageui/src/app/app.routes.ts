import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';


export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    //canActivate: [adminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    component: UserLayoutComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: '**', redirectTo: '' }
];
