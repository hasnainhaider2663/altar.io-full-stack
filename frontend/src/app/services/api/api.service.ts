import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import ApiResponse from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private socket: Socket;
  private gridSubject = new BehaviorSubject<ApiResponse | null>(null);
  private grid$ = this.gridSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.socket = io('http://localhost:3000', { autoConnect: true });

    this.socket.on('grid-updated', (result) => {
      console.log('grid-updated', result);
      this.gridSubject.next(result);
    });
  }
  getGrid() {
    return this.grid$;
  }
  generateGrid(biasCharacter?: string, biasWeight?: number) {
    interval(2000).subscribe((x) => {
      this.socket.emit('generate-grid', {
        biasCharacter,
        biasWeight,
      });
    });
  }
}
