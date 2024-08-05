import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState, adapter, selectAll, selectEntities, selectIds, selectTotal } from '../reducers/user.reducer';

// Feature selector
export const selectUserState = createFeatureSelector<UserState>('users');

// Select all user IDs
export const selectUserIds = createSelector(
    selectUserState,
    selectIds
);

// Select user entities as a dict object
export const selectUserEntities = createSelector(
    selectUserState,
    selectEntities
);

// Select all users as array
export const selectAllUsers = createSelector(
    selectUserState,
    selectAll
);

// Select total users
export const selectUserTotal = createSelector(
    selectUserState,
    selectTotal
);

// Select user based on ID 
export const selectUserById = (id: number) => createSelector(
    selectUserEntities,
    entities => entities[id]
);
