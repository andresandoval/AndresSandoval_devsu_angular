import {inject, Injectable} from '@angular/core';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogComponentData
} from '../shared/confirmation-dialog/confirmation-dialog.component';
import {DialogService} from './dialog.service';
import {Observable} from 'rxjs';
import {AlertDialogComponent, AlertDialogComponentData} from '../shared/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly dialogService: DialogService = inject(DialogService);

  public success(message: string): Observable<void> {
    return this.alert($localize`:@@success:Success`, message);
  }

  public error(message: string): Observable<void> {
    return this.alert($localize`:@@error:Error`, message);
  }

  public warning(message: string): Observable<void> {
    return this.alert($localize`:@@warning:Warning`, message);
  }

  public confirm(title: string, message: string): Observable<boolean> {
    const dialogData: ConfirmationDialogComponentData = {
      title: title,
      message: message
    };
    return this.dialogService.open<any, any, boolean>(ConfirmationDialogComponent, dialogData)
      .afterClose();
  }

  private alert(title: string, message: string): Observable<void> {
    const dialogData: AlertDialogComponentData = {
      title: title,
      message: message
    };
    return this.dialogService.open<any, any, void>(AlertDialogComponent, dialogData)
      .afterClose();
  }
}
