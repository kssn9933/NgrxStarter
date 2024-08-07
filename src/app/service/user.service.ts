import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { User } from '../models/user.model';

interface Payload {
  [key: string]: User | number;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateAllUsers(users: User[]): Observable<User[]> {
    return this.http.post<Payload>(`${this.apiUrl}`, users).pipe(
      map(response =>
        Object.entries(response)
          .filter(([key]) => !isNaN(Number(key))) // Filter out non-numeric keys
          .map(([key, user]) => ({ ...(user as User), id: key })) // Add id to each user without conflict
      )
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);  // full User payload
  }

  patchUser(id: number, partialUser: Partial<User>): Observable<User> { // User attributes that are updated
    return this.http.patch<User>(`${this.apiUrl}${id}`, partialUser)
  }

}
