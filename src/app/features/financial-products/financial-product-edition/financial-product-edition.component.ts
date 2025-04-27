import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FinancialProductService} from '../../../providers/financial-products/financial-product.service';
import {FinancialProduct} from '../../../models/financial-products/financial-product';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormFieldComponent} from '../../../shared/form-field/form-field.component';
import {NgIf} from '@angular/common';
import {FormFieldErrorComponent} from '../../../shared/form-field-error/form-field-error.component';
import {AlertService} from '../../../providers/alert.service';
import {filter, finalize, mergeMap} from 'rxjs';

@Component({
  selector: 'asm-financial-product-edition',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    FormFieldErrorComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './financial-product-edition.component.html',
  styleUrl: './financial-product-edition.component.scss'
})
export class FinancialProductEditionComponent {

  private readonly router: Router = inject(Router);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly financialProductService: FinancialProductService = inject(FinancialProductService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly alertService: AlertService = inject(AlertService);

  public readonly formGroup: FormGroup;
  public readonly financialProduct: FinancialProduct | null;
  public readonly today: string = new Date().toISOString().split('T')[0];


  constructor() {
    this.financialProduct = this.activatedRoute.snapshot.data['product'];
    this.formGroup = this.formBuilder.group({
      id: [this.financialProduct?.id, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: [this.financialProduct?.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [this.financialProduct?.description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [this.financialProduct?.logo, [Validators.required]],
      date_release: [this.financialProduct?.date_release, [Validators.required]],
      date_revision: [this.financialProduct?.date_revision, [Validators.required]]
    });
  }

  public submit(): void {
    if (this.formGroup.invalid) {
      this.alertService.error('Invalid form values').subscribe();
      return;
    }
    const subscription = this.alertService.confirm($localize `:@@confirm:Confirm`, $localize `:@@save-product:Save product`)
      .pipe(
        filter(response => response),
        mergeMap(() => {
          if (this.financialProduct == null) {
            return this.financialProductService.create(this.formGroup.value);
          }
          return this.financialProductService.update(this.financialProduct.id, this.formGroup.value);
        }),
        finalize(() => subscription.unsubscribe())
      )
      .subscribe(response => {
        this.router.navigate(['../']).then();
      });
  }

  public get idFormCtrl(): FormControl {
    return this.formGroup.get('id') as FormControl;
  }

  public get nameFormCtrl(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  public get descriptionFormCtrl(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }

  public get logoFormCtrl(): FormControl {
    return this.formGroup.get('logo') as FormControl;
  }

  public get dateReleaseFormCtrl(): FormControl {
    return this.formGroup.get('date_release') as FormControl;
  }

  public get dateRevisionFormCtrl(): FormControl {
    return this.formGroup.get('date_revision') as FormControl;
  }


}
