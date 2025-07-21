import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError, delay, map } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Health check method to test server connectivity
  checkServerHealth(): Observable<any> {
    return this.http.get(`${this.API_URL}/users`).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.get<any>(`${this.API_URL}/users/login`, {
      params: {
        username: credentials.username,
        password: credentials.password
      }
    }).pipe(
      map(response => {
        console.log('Login response:', response);
        return this.mapUserDTOToAuthResponse(response);
      }),
      tap(response => {
        if (response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error details:', error);
        return this.handleError(error);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Combine firstName and lastName into fullName for backend
    const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
    
    return this.http.get<any>(`${this.API_URL}/users/register`, {
      params: {
        username: userData.username,
        password: userData.password,
        fullName: fullName
      }
    }).pipe(
      map(response => this.mapUserDTOToAuthResponse(response)),
      tap(response => {
        if (response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // If server is not available, simulate successful registration for demo purposes
        if (error.status === 0 || error.status === 404 || error.status === 503) {
          console.warn('Backend not available, simulating successful registration for demo');
          
          const mockUser: User = {
            id: Date.now(),
            username: userData.username,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            createdAt: new Date()
          };

          const mockResponse: AuthResponse = {
            user: mockUser,
            message: 'Registration successful (demo mode - backend not available)'
          };

          // Simulate server delay
          return of(mockResponse).pipe(
            delay(1000),
            tap(response => {
              localStorage.setItem('currentUser', JSON.stringify(response.user));
              this.currentUserSubject.next(response.user);
            })
          );
        }
        
        // For other errors, use the normal error handling
        return this.handleError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Helper method to map backend UserDTO to frontend AuthResponse
  private mapUserDTOToAuthResponse(userDTO: any): AuthResponse {
    // Split fullName back into firstName and lastName
    const nameParts = userDTO.fullName ? userDTO.fullName.split(' ') : ['', ''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const user: User = {
      id: userDTO.id,
      username: userDTO.username,
      email: userDTO.email || `${userDTO.username}@example.com`, // Backend doesn't have email
      firstName: firstName,
      lastName: lastName,
      createdAt: new Date()
    };

    return {
      user: user,
      message: 'Authentication successful'
    };
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'Unable to connect to the server. Please check your internet connection.';
          break;
        case 400:
          errorMessage = 'Invalid request data. Please check your information.';
          break;
        case 401:
          errorMessage = 'Authentication failed. Please check your credentials.';
          break;
        case 403:
          errorMessage = 'Access denied. You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 409:
          errorMessage = 'Username or email already exists. Please choose different credentials.';
          break;
        case 422:
          errorMessage = 'Validation failed. Please check your input data.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        case 503:
          errorMessage = 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          errorMessage = `Server Error: ${error.status} - ${error.message}`;
      }
    }
    
    console.error('HTTP Error:', error);
    return throwError(() => new Error(errorMessage));
  }
} 