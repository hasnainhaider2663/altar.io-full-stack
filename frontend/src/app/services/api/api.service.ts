import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from 'src/app/models/api-response.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  generateGrid(biasCharacter?: string, biasWeight?: number) {
    return this.httpClient.post<ApiResponse>(
      environment.apiUrl + environment.generateGridUrl,
      { biasCharacter, biasWeight }
    );
  }
}
