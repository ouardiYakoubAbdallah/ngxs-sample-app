import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users')
  }

  addUser(userData: any) {
    return this.httpClient.post(
      'https://jsonplaceholder.typicode.com/users',
      userData
      )
  }

  deleteUser(id: number) {
    return this.httpClient.delete(
      'https://jsonplaceholder.typicode.com/users/' + id
    )
  }

  updateUser(payload: any, id: number) {
    return this.httpClient.patch(
      'https://jsonplaceholder.typicode.com/users' + id,
      payload
    )
  }
}
