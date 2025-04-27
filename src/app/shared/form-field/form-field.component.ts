import {AfterViewInit, Component, ContentChild, ElementRef, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FormControl, FormControlName} from '@angular/forms';

@Component({
  selector: 'asm-form-field',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements AfterViewInit, OnDestroy{

  private readonly handleInputBlur = () => {
    this.control?.markAsTouched();
  };

  @Input() public label: string = '';
  @ContentChild(FormControlName, {static: true}) public readonly controlName?: FormControlName;
  @ContentChild('inputRef', {static: true, read: ElementRef}) public readonly inputRef?: ElementRef;

  public get control(): FormControl | undefined {
    return this.controlName?.control;
  }

  public ngAfterViewInit(): void {
    if (this.inputRef) {
      this.inputRef.nativeElement.addEventListener('blur', this.handleInputBlur);
    }
  }

  public ngOnDestroy(): void {
    if (this.inputRef) {
      this.inputRef.nativeElement.removeEventListener('blur', this.handleInputBlur);
    }
  }

  public get showError(): boolean {
    const control = this.control;
    return !!control && control.invalid && (control.touched || control.dirty || (control.root as any)['submitted']);
  }


}
