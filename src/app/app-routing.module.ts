import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment as env } from './../environments/environment';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const toLogin = () => redirectUnauthorizedTo(['/login']);
const toHome = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'home',
    title: `${env.appName} - Início`,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'contacts',
    title: `${env.appName} - Faça Contato`,
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule)
  },
  {
    path: 'about',
    title: `${env.appName} - Sobre`,
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: '404',
    title: `${env.appName} - Erro 404`,
    loadChildren: () => import('./pages/e404/e404.module').then(m => m.E404PageModule)
  },
  {
    path: 'login',
    title: `${env.appName} - Login / Entrar`,
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: toHome }
  },
  {
    path: 'logout',
    title: `${env.appName} - Logout / Sair`,
    loadChildren: () => import('./user/logout/logout.module').then(m => m.LogoutPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'profile',
    title: `${env.appName} - Perfil de Usuário`,
    loadChildren: () => import('./user/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
