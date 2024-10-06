import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/user'; // Update with your actual backend URL
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private personIdKey = 'person_id';

  constructor(private http: HttpClient) {
    this.isLoggedIn$.next(this.isAuthenticated());
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        if (response.person_id) {
          this.storePersonId(response.person_id);
          this.isLoggedIn$.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.personIdKey);
    this.isLoggedIn$.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.personIdKey);
  }


  getAuthStatus(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  private storePersonId(person_id: number): void {
    localStorage.setItem(this.personIdKey, person_id.toString());
  }

  getPersonId(): number | null {
    const personId = localStorage.getItem(this.personIdKey);
    return personId ? +personId : null;
  }

  getSellerId(): Observable<number | null> {
    const personId = this.getPersonId();
    if (personId) {
      return this.http.get<number>(`${this.apiUrl}/seller_id/${personId}`);
    } else {
      return new BehaviorSubject<number | null>(null).asObservable();
    }
  }
  
}
