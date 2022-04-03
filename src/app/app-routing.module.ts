import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaneuscodeComponent } from './pages/faneuscode/faneuscode.component';

const routes: Routes = [
  {path:'',redirectTo:'/products',pathMatch:'full' },
  { path:'faneuscode',component:FaneuscodeComponent },
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  {path:'**',redirectTo:'',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
