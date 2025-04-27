import {Routes} from '@angular/router';
import {MainComponent} from './main.component';

export const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {
        path: 'financial-products',
        loadChildren: () => import('../financial-products/financial-products.routes')
          .then(r => r.routes)
      },
      {
        path: '**',
        redirectTo: 'financial-products'
      }
    ]
  }
];
