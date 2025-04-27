import {Component, Inject} from '@angular/core';
import {DIALOG_DATA, DIALOG_REF} from '../../providers/dialog.service';
import {DialogRef} from '../../models/core/dialog-ref';

export interface AlertDialogComponentData {
  title: string;
  message: string;
}

@Component({
  selector: 'asm-alert-dialog',
  imports: [],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {

  constructor(@Inject(DIALOG_DATA) public readonly dialogData: AlertDialogComponentData,
              @Inject(DIALOG_REF) private readonly dialogRef: DialogRef<void>) {
  }

  public ok(): void {
    this.dialogRef.close();
  }
}
