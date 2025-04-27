import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Provider,
  Type
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DialogRef} from '../models/core/dialog-ref';
import {OpenedDialogRef} from '../models/core/opened-dialog-ref';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
export const DIALOG_REF = new InjectionToken<DialogRef<any>>('DIALOG_REF');

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private appRef = inject(ApplicationRef);
  private envInjector = inject(EnvironmentInjector);

  constructor() {
  }

  public open<C, D, R>(component: Type<C>, data?: D): OpenedDialogRef<R> {
    const closeSubject: Subject<R> = new Subject<R>();
    const dialogRef: DialogRef<R> = {} as any;

    const providers: Provider[] = [
      {provide: DIALOG_DATA, useValue: data},
      {provide: DIALOG_REF, useValue: dialogRef}
    ];

    const customInjector = Injector.create({
      providers,
      parent: this.envInjector as unknown as Injector
    });

    const modalRef: ComponentRef<C> = createComponent(component, {
      environmentInjector: this.envInjector,
      elementInjector: customInjector
    });

    this.appRef.attachView(modalRef.hostView);

    const domElem = (modalRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    dialogRef.close = (result: R) => {
      setTimeout(() => {
        closeSubject.next(result);
        closeSubject.complete();
      });
      this.appRef.detachView(modalRef.hostView);
      modalRef.destroy();
    };

    return {
      afterClose(): Observable<R> {
        return closeSubject.asObservable();
      }
    };

  }

  /*
    public confirm(title: string, message: string): ConfirmationDialogRef {

      const closeSubject: Subject<boolean> = new Subject();
      const dialogData: ConfirmationDialogComponentData = {
        title: title,
        message: message,
        closeSubject: closeSubject
      };
      const providers: Provider[] = [
        {provide: CONFIRMATION_DIALOG_DATA, useValue: dialogData}
      ];

      const customInjector = Injector.create({
        providers,
        parent: this.envInjector as unknown as Injector
      });

      const modalRef: ComponentRef<ConfirmationDialogComponent> = createComponent(ConfirmationDialogComponent, {
        environmentInjector: this.envInjector,
        elementInjector: customInjector
      });

      this.appRef.attachView(modalRef.hostView);

      const domElem = (modalRef.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);

      return new ConfirmationDialogRef(closeSubject.pipe(
        tap(() => {
          this.appRef.detachView(modalRef.hostView);
          modalRef.destroy();
        })
      ));
    }*/
}
