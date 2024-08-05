import { TestBed } from '@angular/core/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { Observable, of } from 'rxjs';

import { UserContainerFacadeService } from './user-cointainer-facade.service';

import { User } from '../../../models/user.model';

import * as UserActions from '../../../state/actions/user.actions';

import { selectAllUsers } from '../../../state/selectors/user.selectors';

describe('UserContainerFacadeService', () => {
  let service: UserContainerFacadeService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserContainerFacadeService,
        provideMockStore()
      ]
    });

    service = TestBed.inject(UserContainerFacadeService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch loadUsers action', () => {
    spyOn(store, 'dispatch');
    service.loadUsers();

    expect(store.dispatch).toHaveBeenCalledWith(UserActions.loadUsers());
  });

  it('should return all users from store', () => {
    const users: User[] = [{ id: '1', name: 'John Lane', username: 'johnlane', email: 'john@test.com', phone: '1234567890', website: 'test.com' }];

    store.overrideSelector(selectAllUsers, users);
    service.getAllUsers().subscribe(result => {
      expect(result).toEqual(users);
    });
  });

  it('should dispatch updateUser action', () => {
    spyOn(store, 'dispatch');

    const user: User = { id: '1', name: 'John Lane', username: 'johnlane', email: 'john@test.com', phone: '1234567890', website: 'test.com' };
    service.updateUser(user);

    expect(store.dispatch).toHaveBeenCalledWith(UserActions.updateUser({ user }));
  });
});
