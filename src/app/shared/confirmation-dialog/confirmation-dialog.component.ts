import {Component, Inject} from '@angular/core';
import {DIALOG_DATA, DIALOG_REF} from '../../providers/dialog.service';
import {DialogRef} from '../../models/core/dialog-ref';

export interface ConfirmationDialogComponentData {
  title: string;
  message: string;
}

@Component({
  selector: 'asm-confirmation-dialog',
  imports: [],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(@Inject(DIALOG_DATA) public readonly dialogData: ConfirmationDialogComponentData,
              @Inject(DIALOG_REF) private readonly dialogRef: DialogRef<boolean>) {
  }

  public close(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
