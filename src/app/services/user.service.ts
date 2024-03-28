import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serviceBase: string = "https://localhost:7229/UsersController/";

  //subject for passing the chosen user to it's details
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  
  setUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getUser(): User | null{
    return this.currentUserSubject.getValue();
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceBase + 'GetAllUsers');
  }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.serviceBase + 'AddUser', newUser);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.serviceBase + 'UpdateUser', user);
  }

  DeleteUser(userId: number): Observable<User> {
    const url = `${this.serviceBase}DeleteUser/${userId}`;
    return this.http.delete<User>(url);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.serviceBase}GetUserById/${userId}`);
  }
}
