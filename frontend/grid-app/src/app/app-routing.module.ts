import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsModule)
},
{
  path: 'companies',
  loadChildren: () => import('./pages/companies/companies.module').then(m => m.CompaniesModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
