import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable, Subject, takeUntil } from 'rxjs';


import { User } from '../../models/user.model';

import { UserContainerFacadeService } from './service/user-cointainer-facade.service';

import { UserGridComponent } from '../user-grid/user-grid.component';


@Component({
  selector: 'app-user-container',
  standalone: true,
  imports: [UserGridComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-container.component.html',
  styleUrl: './user-container.component.css'
})
export class UserContainerComponent implements OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  users$!: Observable<User[]>;

  constructor(private userContainerFacadeService: UserContainerFacadeService) {
    this.users$ = this.userContainerFacadeService.getAllUsers().pipe(takeUntil(this.destroy$));
  }

  ngOnInit(): void {
    this.userContainerFacadeService.loadUsers();
  }

  onEditUser(user: User) {
  }

  onUpdateUser(user: User): void {
    this.userContainerFacadeService.updateUser(user);
  }

  onUpdateAllUsers(user: User[]): void {
    this.userContainerFacadeService.updateAllUsers(user);
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
