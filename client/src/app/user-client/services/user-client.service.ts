import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Property } from 'src/app/properties';
import { TokenStorageService } from 'src/app/services/keycloak/token-storage.service';
import { RDV } from '../model/RDV';
import { FilterDTO } from '../model/FilterDTO';

@Injectable({
  providedIn: 'root'
})
export class UserClientService {
  private baseURL = "http://localhost:8080/api/v1/";
  constructor(private httpClient: HttpClient,private tokenStorageService: TokenStorageService) { }
  
  private getHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      console.error(`Code d'erreur ${error.status}, ` + `message : ${error.message}`);
    }
    return throwError('Erreur lors de la récupération des données. Veuillez réessayer plus tard.');
  }

  // AllPropertyDisponible 
  AllPropertyDisponible(): Observable<Property[]>{
    
    return this.httpClient.get<Property[]>(`${this.baseURL}available`).pipe(
      catchError(this.handleError)
    );
  }
//  All RDV 
AllRDV(): Observable<RDV[]>{
  const headers = this.getHeaders();
  return this.httpClient.get<RDV[]>(`${this.baseURL}rdv/client`,{ headers}).pipe(
    catchError(this.handleError)
  );
}

 AllDateNonDisponible(propertyId: number ): Observable<string[]>{
  return this.httpClient.get<string[]>(`${this.baseURL}rdv/date/${propertyId}`).pipe(
    catchError(this.handleError)
  );
 }

 AddRDV(rdv: RDV,propertyId :number): Observable<RDV>{
  const headers = this.getHeaders();
  return this.httpClient.post<RDV>(`${this.baseURL}rdv/${propertyId}`,rdv,{ headers}).pipe(
    catchError(this.handleError)
  );
 }
 deleteRDV(id: number): Observable<void> {
  const headers = this.getHeaders();
  return this.httpClient.delete<void>(`${this.baseURL}rdv/${id}`,{ headers , responseType: 'text' as 'json' });
}
updateRdv(rdv:RDV,rdvId : number):Observable<RDV>{
  const headers = this.getHeaders();
  return this.httpClient.put<RDV>(`${this.baseURL}rdv/${rdvId}`,{headers});
}
changeStatus(rdvId: number,status: string): Observable<any>{
  const headers = this.getHeaders();
  const params = new HttpParams().set('status', status);

  return this.httpClient.put<any>(`${this.baseURL}rdv/change/${rdvId}`,null,{headers, params});
}

// /////////
canceledRdv(rdvId : number):Observable<RDV>{
  const headers = this.getHeaders();
  return this.httpClient.post<RDV>(`${this.baseURL}rdv/canceld/${rdvId}`,{headers});
}

fliterRDVForHost(filterDto :FilterDTO):Observable<RDV[]>{
  const headers = this.getHeaders();
  return this.httpClient.post<RDV[]>(`${this.baseURL}rdv/host-filter`,filterDto,{headers});
}

fliterRDVForClient(filterDto :FilterDTO):Observable<RDV[]>{
  const headers = this.getHeaders();
  return this.httpClient.post<RDV[]>(`${this.baseURL}rdv/client-filter`,filterDto,{headers});
}


getRDVCount(): Observable<number> {
  const headers = this.getHeaders();
  return this.httpClient.get<number>(`${this.baseURL}rdv/count`,{ headers});
}
getRDVDateNow(): Observable<RDV[]>{
  const headers = this.getHeaders();
  return this.httpClient.get<RDV[]>(`${this.baseURL}/rdv/HOST`,{ headers})
}
}
