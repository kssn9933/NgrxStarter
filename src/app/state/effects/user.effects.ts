// src/app/state/effects/user.effects.ts
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from '../actions/user.actions';

import { UserService } from '../../service/user.service';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    // Log actions
    logActions$ = createEffect(() => this.actions$.pipe(
        tap(action => {
            console.log('Action dispatched: ', action.type);

        })
    ), { dispatch: false });

    // Handle success actions
    handleSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(
            UserActions.loadUsersSuccess,
            UserActions.loadUserSuccess,
            UserActions.updateUserSuccess,
            UserActions.patchUserSuccess,
            UserActions.updateAllUsersSuccess
        ),
        tap(action => { // replace this with Toastr
            if (action.type === UserActions.loadUsersSuccess.type) {
                alert('Users loaded successfully');
            } else if (action.type === UserActions.loadUserSuccess.type) {
                alert('User loaded successfully');
            } else if (action.type === UserActions.updateUserSuccess.type) {
                alert('User updated successfully');
            } else if (action.type === UserActions.patchUserSuccess.type) {
                alert('User patch updated successfully');
            } else if (action.type === UserActions.updateAllUsersSuccess.type) {
                alert('User update all successful');
            }
        })
    ), { dispatch: false });

    // Handle failure actions
    handleFailure$ = createEffect(() => this.actions$.pipe(
        ofType(
            UserActions.loadUsersFailure,
            UserActions.loadUserFailure,
            UserActions.updateUserFailure,
            UserActions.patchUserFailure,
            UserActions.updateAllUsersFailure
        ),
        tap(action => { // replace this with Toastr
            if (action.type === UserActions.loadUsersFailure.type) {
                alert('Failed to load users');
            } else if (action.type === UserActions.loadUserFailure.type) {
                alert('Failed to load user');
            } else if (action.type === UserActions.updateUserFailure.type) {
                alert('Failed to update user');
            } else if (action.type === UserActions.patchUserFailure.type) {
                alert('Failed to patch update user');
            } else if (action.type === UserActions.updateAllUsersFailure.type) {
                alert('Failed to update all users');
            }
        })
    ), { dispatch: false });

    // Load all users
    // Multiple inner active and order of completion does not matter, so we use mergeMap.
    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loadUsers),
        mergeMap(() => this.userService.getUsers()
            .pipe(
                map(users => UserActions.loadUsersSuccess({ users })),
                catchError(error => of(UserActions.loadUsersFailure({ error })))
            ))
    ));

    // Load user based on ID
    // Multiple inner active and order of completion does not matter, so we use mergeMap.
    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loadUser),
        mergeMap(action => this.userService.getUserById(action.id)
            .pipe(
                map(user => UserActions.loadUserSuccess({ user })),
                catchError(error => of(UserActions.loadUserFailure({ error })))
            ))
    ));

    // Update user PUT. Using concatMap so we retain order in which they invoked.
    // Waits for each operation to complete before starting the next, so we use concatMap.
    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateUser),
        concatMap(action => this.userService.updateUser(action.user)
            .pipe(
                map(user => UserActions.updateUserSuccess({ user })),
                catchError(error => of(UserActions.updateUserFailure({ error })))
            ))
    ));

    // Update user PATCH. Using concatMap so we retain order in which they invoked.
    // Waits for each operation to complete before starting the next, so we use concatMap.
    patchUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.patchUser),
        concatMap(action => this.userService.patchUser(action.id, action.changes)
            .pipe(
                map(user => UserActions.patchUserSuccess({ update: { id: user.id, changes: user } })),
                catchError(error => of(UserActions.patchUserFailure({ error })))
            ))
    ));

    updateAllUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateAllUsers),
        mergeMap(action => this.userService.updateAllUsers(action.users)
            .pipe(
                map(users => UserActions.updateAllUsersSuccess({ users })),
                catchError(error => of(UserActions.updateAllUsersFailure({ error })))
            ))
    ));
}
