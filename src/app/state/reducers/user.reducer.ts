import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';

import { User } from '../../models/user.model';


export interface UserState extends EntityState<User> {
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: user => user.id
});

export const initialState: UserState = adapter.getInitialState({
    loading: false,
    error: null
});

export const userReducer = createReducer(
    initialState,
    on(UserActions.loadUsers, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.loadUsersSuccess, (state, { users }) =>
    ({
        ...adapter.setAll(users, { ...state, loading: false, error: null })
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
        ...state, loading: false, error
    })),

    on(UserActions.loadUser, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.loadUserSuccess, (state, { user }) => ({
        ...adapter.upsertOne(user, { ...state, loading: false, error: null }) // update an existing entity or insert a new one if it does not exist 
    })),
    on(UserActions.loadUserFailure, (state, { error }) => ({
        ...state, loading: false, error
    })),

    on(UserActions.updateUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.updateUserSuccess, (state, { user }) => ({
        ...adapter.updateOne({ id: user.id, changes: user }, { ...state, loading: false, error: null }) // update an existing entity
    })),
    on(UserActions.updateUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(UserActions.patchUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.patchUserSuccess, (state, { update }) => ({
        ...adapter.updateOne(update, state) // update an existing entity
    })),
    on(UserActions.patchUserFailure, (state, { error }) => ({
        ...state, error
    }))
);

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal,
} = adapter.getSelectors();