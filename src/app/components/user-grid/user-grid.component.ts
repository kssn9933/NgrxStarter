import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  userFormGroup: FormGroup = this.fb.group({
    userForms: this.fb.array([])
  });

  get userForms(): FormArray {
    return this.userFormGroup.get('userForms') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
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
    });
    this.userForms.push(userForm);
  }

  startEditing(index: number): void {
    this.userForms.at(index).enable();
  }

  saveEditing(index: number): void {
    const userForm = this.userForms.at(index);
    userForm.disable();

    const updatedUser = { ...this.users[index], ...userForm.value };
    this.updateUser.emit(updatedUser);
  }

}

// Ag grid implementation
// Was encoutering but with the grid methods, thus went ahead with basic html grid + form
// @Component({
//   selector: 'app-user-grid',
//   standalone: true,
//   imports: [AgGridModule, CustomActionsComponent],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   templateUrl: './user-grid.component.html',
//   styleUrl: './user-grid.component.css'
// })
// export class UserGridComponent {
//   constructor() { }

//   @Input() users: User[] = [];
//   @Output() editUser = new EventEmitter<User>();
//   @Output() updateUser = new EventEmitter<User>();

//   defaultColumnDefs: ColDef[] = [
//     { field: 'name', headerName: 'Name' },
//     { field: 'username', headerName: 'Username' },
//     { field: 'email', headerName: 'Email' },
//     {
//       headerName: 'action',
//       cellRenderer: CustomActionsComponent,
//       editable: false,
//       colId: "action",
//       cellRendererParams: {
//         context: {
//           componentParent: this
//         }
//       }
//     }
//   ];

//   gridOptions: GridOptions = {
//     columnDefs: this.defaultColumnDefs,
//     defaultColDef: {
//       editable: true
//     },
//     editType: "fullRow",
//     onRowEditingStarted: (params) => {
//       params.api.refreshCells({
//         columns: ["action"],
//         rowNodes: [params.node],
//         force: true
//       });
//     },
//     onRowEditingStopped: (params) => {
//       params.api.refreshCells({
//         columns: ["action"],
//         rowNodes: [params.node],
//         force: true
//       });
//     },
//     suppressClickEdit: true,
//     domLayout: 'autoHeight',
//   };

//   onGridReady(params: any) {
//     params.api.sizeColumnsToFit();
//   }

//   onEditUser(user: User) {
//     this.editUser.emit(user);
//   }

//   onUpdateUser(user: User) {
//     this.updateUser.emit(user);
//   }

// }
