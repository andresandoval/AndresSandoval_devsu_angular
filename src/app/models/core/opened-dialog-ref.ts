import {Observable} from 'rxjs';

export interface OpenedDialogRef<T> {
  afterClose(): Observable<T>;
}
