import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, switchMap } from 'rxjs';
import ApiResponse from 'src/app/models/api-response.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  generateGrid(biasCharacter?: string, biasWeight?: number) {
    return interval(2000).pipe(
      // transform the emit from interval to an API Call and Cancel the previous one if it's pending
      switchMap(() =>
        this.httpClient.post<ApiResponse>(
          environment.apiUrl + environment.generateGridUrl,
          { biasCharacter, biasWeight }
        )
      )
    );
  }
}
