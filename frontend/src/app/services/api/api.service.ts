import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject, Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import ApiResponse from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private socket: Socket;
  private gridSubject = new BehaviorSubject<ApiResponse | null>(null);
  private grid$ = this.gridSubject.asObservable();
  private stopInterval$ = new Subject<void>(); // Subject to control the interval emission
  private intervalSubscription: Subscription | null = null;
  constructor(private httpClient: HttpClient) {
    this.socket = io('http://localhost:3000', { autoConnect: true });

    this.socket.on('grid-updated', (result) => {
      console.log('grid-updated', result);
      this.gridSubject.next(result);
      this.stopInterval();
    });
  }
  getGrid() {
    return this.grid$;
  }
  generateGrid(biasCharacter?: string, biasWeight?: number) {
    this.stopInterval$.next(); // Emit to stop any existing interval
    this.intervalSubscription = interval(2000).subscribe((x) => {
      this.socket.emit('generate-grid', {
        biasCharacter,
        biasWeight,
      });
    });
  }

  stopInterval() {
    console.log('stopping?');
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }
}
