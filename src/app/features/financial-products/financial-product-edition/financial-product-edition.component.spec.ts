import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FinancialProductEditionComponent} from './financial-product-edition.component';

describe('FinancialProductEditionComponent', () => {
  let component: FinancialProductEditionComponent;
  let fixture: ComponentFixture<FinancialProductEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialProductEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
