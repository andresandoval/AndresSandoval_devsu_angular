import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {filter, finalize, map, mergeMap, Observable, of} from 'rxjs';
import {FinancialProductService} from '../../../providers/financial-products/financial-product.service';
import {FinancialProduct} from '../../../models/financial-products/financial-product';
import {AsyncPipe, DatePipe} from '@angular/common';
import {SkeletonComponent} from '../../../shared/skeleton/skeleton.component';
import {RouterLink} from '@angular/router';
import {AlertService} from '../../../providers/alert.service';

@Component({
  selector: 'asm-financial-products-list',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    SkeletonComponent,
    DatePipe,
    RouterLink
  ],
  templateUrl: './financial-products-list.component.html',
  styleUrl: './financial-products-list.component.scss'
})
export class FinancialProductsListComponent implements OnInit {

  private readonly financialProductService: FinancialProductService = inject(FinancialProductService);
  private readonly alertService: AlertService = inject(AlertService);

  public financialProducts$: Observable<FinancialProduct[]> = of([]);

  public filter: string = "";

  constructor() {
  }

  public ngOnInit(): void {
    this.financialProducts$ = this.financialProductService.list()
      .pipe(
        map(list => {
          if (this.filter.length <= 0) {
            return list;
          }
          return list.filter(p => p.logo.toLowerCase().includes(this.filter) ||
            p.name.toLowerCase().includes(this.filter) ||
            p.description.toLowerCase().includes(this.filter));
        })
      );
  }

  public onFilterChange(event: any): void {
    this.filter = event.target.value.toLowerCase();
    this.ngOnInit();
  }

  public delete(product: FinancialProduct): void {
    const subscription = this.alertService.confirm($localize `:@@confirm:Confirm`, $localize `:@@delete-product:Delete product`)
      .pipe(
        filter(response => response),
        mergeMap(() => this.financialProductService.delete(product.id)),
        finalize(() => subscription.unsubscribe())
      )
      .subscribe(response => {
        this.ngOnInit();
      });
  }
  public highlightText(text: string): string {
    if (!this.filter) return text; // If no filter text, return as is
    const regex = new RegExp(`(${this.filter})`, 'gi');
    return text.replace(regex, '<span class="text">$1</span>'); // Wrap the matched text in a span
  }


}
