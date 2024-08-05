// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// import { of } from 'rxjs';

// import { UserContainerComponent } from './user-container.component';
// import { UserGridComponent } from '../user-grid/user-grid.component';

// import { UserContainerFacadeService } from './service/user-cointainer-facade.service';

// import { User } from '../../models/user.model';

// describe('UserContainerComponent', () => {
//   let component: UserContainerComponent;
//   let fixture: ComponentFixture<UserContainerComponent>;
//   let facadeService: jasmine.SpyObj<UserContainerFacadeService>;


//   beforeEach(async () => {
//     const facadeSpy = jasmine.createSpyObj('UserContainerFacadeService', ['loadUsers', 'getAllUsers', 'updateUser']);

//     await TestBed.configureTestingModule({
//       imports: [
//         CommonModule,
//         ReactiveFormsModule,
//         UserContainerComponent,
//         UserGridComponent
//       ],
//       providers: [
//         { provide: UserContainerFacadeService, useValue: facadeSpy }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(UserContainerComponent);
//     component = fixture.componentInstance;
//     facadeService = TestBed.inject(UserContainerFacadeService) as jasmine.SpyObj<UserContainerFacadeService>;
//     facadeService.getAllUsers.and.returnValue(of([]));
//   });

//   beforeEach(() => {
//     facadeService.getAllUsers.and.returnValue(of([])); // Cannot read properties of undefined (reading 'pipe')
//     fixture.detectChanges();
//   });

// it('should create', () => {
//   expect(component).toBeTruthy();
// });

// it('should load users on init', () => {
//   fixture.detectChanges();
//   expect(facadeService.loadUsers).toHaveBeenCalled();
// });

// it('should update user', () => {
//   const user: User = { id: '1', name: 'John Lane', username: 'johnlane', email: 'john@test.com', phone: '1234567890', website: 'test.com' };
//   component.onUpdateUser(user);
//   expect(facadeService.updateUser).toHaveBeenCalledWith(user);
// });
// });
