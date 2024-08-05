import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { User } from "../../models/user.model";

export enum UserActionTypes {
    LoadUsers = '[User] Load Users',
    LoadUsersSuccess = '[User] Load Users Success',
    LoadUsersFailure = '[User] Load Users Failure',

    LoadUser = '[User] Load User',
    LoadUserSuccess = '[User] Load User Success',
    LoadUserFailure = '[User] Load User Failure',

    UpdateUser = '[User] Update User',
    UpdateUserSuccess = '[User] Update User Success',
    UpdateUserFailure = '[User] Update User Failure',

    PatchUser = '[User] Patch User',
    PatchUserSuccess = '[User] Patch User Success',
    PatchUserFailure= '[User] Patch User Failure'
}

// Load all users
export const loadUsers = createAction(UserActionTypes.LoadUsers);
export const loadUsersSuccess = createAction(
    UserActionTypes.LoadUsersSuccess,
    props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
    UserActionTypes.LoadUsersFailure,
    props<{ error: any }>()
);


// Load user based on ID
export const loadUser = createAction(
    UserActionTypes.LoadUser,
    props<{ id: number }>()
);

export const loadUserSuccess = createAction(
    UserActionTypes.LoadUserSuccess,
    props<{ user: User }>()
);

export const loadUserFailure = createAction(
    UserActionTypes.LoadUserFailure,
    props<{ error: any }>()
);


// Update user PUT
export const updateUser = createAction(
    UserActionTypes.UpdateUser,
    props<{ user: User }>()
);

export const updateUserSuccess = createAction(
    UserActionTypes.UpdateUserSuccess,
    props<{ user: User }>()
);

export const updateUserFailure = createAction(
    UserActionTypes.UpdateUserFailure,
    props<{ error: any }>()
);


// Update user PATCH
export const patchUser = createAction(
    UserActionTypes.PatchUser,
    props<{ id: number, changes: Partial<User> }>()
);

export const patchUserSuccess = createAction(
    UserActionTypes.PatchUserSuccess,
    props<{ update: Update<User> }>());

export const patchUserFailure = createAction(
    UserActionTypes.PatchUserFailure,
    props<{ error: any }>()
);
