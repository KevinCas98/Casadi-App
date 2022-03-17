import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' 
  },
  { path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'validation',
    loadChildren: () => import('./pages/validation/validation.module').then( m => m.ValidationPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./pages/information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'carnet-load',
    loadChildren: () => import('./pages/carnet-load/carnet-load.module').then( m => m.CarnetLoadPageModule)
  },
  {
    path: 'stores-list',
    loadChildren: () => import('./pages/stores/list/stores.module').then( m => m.StoresPageModule)
  },
  {
    path: 'stores-view/:id',
    loadChildren: () => import('./pages/stores/view/view.module').then( m => m.ViewPageModule)
  },
  {
    path: 'record-benefits',
    loadChildren: () => import('./pages/benefits/record-benefits/record-benefits.module').then( m => m.RecordBenefitsPageModule)
  },
  {
    path: 'benefits-take/:store/:benefit',
    loadChildren: () => import('./pages/benefits/take/take.module').then( m => m.TakePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
