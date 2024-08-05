import { Injectable } from '@angular/core';

import { GridOptions } from 'ag-grid-community';

import { Store, select } from '@ngrx/store';

import { selectAllUsers } from '../../../state/selectors/user.selectors';
import { loadUsers, updateUser } from '../../../state/actions/user.actions';

import { Observable } from 'rxjs';

import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserContainerFacadeService {

  constructor(private store: Store) { }

  loadUsers(): void {
    this.store.dispatch(loadUsers())
  }

  getAllUsers(): Observable<User[]> {
    return this.store.pipe(select(selectAllUsers))
  }

  updateUser(user: User): void {
    this.store.dispatch(updateUser({ user }));
  }
}
