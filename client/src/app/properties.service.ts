import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Property } from './properties';
import { TokenStorageService } from './services/keycloak/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseURL = "http://localhost:8080/api/v1/properties";

  constructor(private httpClient: HttpClient,private tokenStorageService: TokenStorageService) { }
  private getHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getPropertiesList(): Observable<Property[]>{
    return this.httpClient.get<Property[]>(`${this.baseURL}`).pipe(
      catchError(this.handleError)
    );;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      console.error(`Code d'erreur ${error.status}, ` + `message : ${error.message}`);
    }
    return throwError('Erreur lors de la récupération des données. Veuillez réessayer plus tard.');
  }

  addProperty(property: Property): Observable<Object>{
    const headers = this.getHeaders();
    return this.httpClient.post(`${this.baseURL}`, property,{ headers });
  }

  getPropertyById(id: number): Observable<Property>{
    return this.httpClient.get<Property>(`${this.baseURL}/${id}`);
  }

  updateProperty(id: number, property: Property): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, property);
  }

  deleteProperty(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}