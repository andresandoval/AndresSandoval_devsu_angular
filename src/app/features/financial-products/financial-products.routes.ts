import {ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router, RouterStateSnapshot, Routes} from "@angular/router";
import {FinancialProduct} from '../../models/financial-products/financial-product';
import {inject} from '@angular/core';
import {FinancialProductService} from '../../providers/financial-products/financial-product.service';
import {firstValueFrom} from 'rxjs';

const productByIdResolver: ResolveFn<FinancialProduct> = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const financialProductService = inject(FinancialProductService);
  try {
    return await firstValueFrom(financialProductService.getById(route.params['productId']));
  } catch {
    return new RedirectCommand(router.parseUrl('/'));
  }
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import(  './financial-products-list/financial-products-list.component')
      .then(c => c.FinancialProductsListComponent),
    title: $localize`:@@financial-products:Financial products`,
    pathMatch: "full"
  },
  {
    path: 'new',
    loadComponent: () => import(  './financial-product-edition/financial-product-edition.component')
      .then(c => c.FinancialProductEditionComponent),
    title: $localize`:@@new-financial-product:New financial product`,
    pathMatch: "full"
  },
  {
    path: ':productId',
    loadComponent: () => import(  './financial-product-edition/financial-product-edition.component')
      .then(c => c.FinancialProductEditionComponent),
    title: $localize`:@@financial-product-edition:Financial product edition`,
    pathMatch: "full",
    resolve: {
      product: productByIdResolver
    }
  }
];
