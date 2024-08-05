import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all users', () => {
    const mockUsers: User[] = [
      { id: '1', name: 'John Lane', username: 'johnlane', email: 'john@test.com', phone: '1234567890', website: 'test.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch a user by ID', () => {
    const mockUser: User = { id: '1', name: 'John Lane', username: 'johnlane', email: 'john@test.com', phone: '1234567890', website: 'test.com' };

    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should update a user', () => {
    const mockUser: User = { id: '1', name: 'John Lane', username: 'johnlane', email: 'john@test.com', phone: '1234567890', website: 'test.com' };

    service.updateUser(mockUser).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);
  });

});
