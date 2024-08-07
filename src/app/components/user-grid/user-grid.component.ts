import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { User } from '../../models/user.model';


@Component({
  selector: 'app-user-grid',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-grid.component.html',
  styleUrl: './user-grid.component.css'
})
export class UserGridComponent implements OnChanges {
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() updateUser = new EventEmitter<User>();
  @Output() updateAllUsers = new EventEmitter<User[]>();

  userFormGroup: FormGroup = this.fb.group({
    userForms: this.fb.array([])
  });

  get userForms(): FormArray {
    return this.userFormGroup.get('userForms') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Changes: ', changes['users'], 'Current: ', changes['users'].currentValue);
    if (changes['users'] && changes['users'].currentValue) {
      this.userForms.clear();
      this.users.forEach(user => this.addUserForm(user));
    }
  }

  addUserForm(user: User): void {
    const userForm = this.fb.group({
      name: new FormControl({ value: user.name, disabled: true }),
      username: new FormControl({ value: user.username, disabled: true }),
      email: new FormControl({ value: user.email, disabled: true })
      // email: new FormControl(user.email, [Validators.required, Validators.email]),
    });
    this.userForms.push(userForm);
  }

  editAll() {
    this.userForms.controls.forEach((form) => form.enable());
  }

  startEditing(index: number): void {
    this.userForms.at(index).enable();
  }

  saveAll() {
    let usersList: User[] = [];
    this.userForms.controls.forEach((form) => usersList.push(form.value));

    this.updateAllUsers.emit(usersList);

  }

  saveEditing(index: number): void {
    const userForm = this.userForms.at(index);
    userForm.disable();

    const updatedUser = { ...this.users[index], ...userForm.value };
    this.updateUser.emit(updatedUser);
  }

}
