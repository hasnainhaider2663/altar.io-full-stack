import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createId } from '@paralleldrive/cuid2';
import { BehaviorSubject, debounceTime, interval, Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import ApiResponse from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private socket: Socket;
  private gridSubject = new BehaviorSubject<ApiResponse | null>(null);
  private grid$ = this.gridSubject.asObservable();
  private intervalSubscription: Subscription | null = null;
  private id?: string = createId();
  constructor(private httpClient: HttpClient) {
    this.socket = io('http://localhost:3000', { autoConnect: true });

    this.socket.on('grid-updated', (result) => {
      this.gridSubject.next(result);
    });

    this.socket.on('stop-emitting', (id: string) => {
      console.log('id to keep emitting', id);
      if (this.id !== id) {
        this.stopInterval();
      }
    });
  }
  getGrid() {
    return this.grid$;
  }
  generateGrid(biasCharacter?: string, biasWeight?: number) {
    this.socket.emit('stop-emitting-all-except', this.id);
    this.stopInterval();
    this.intervalSubscription = interval(2000)
      .pipe(debounceTime(100))
      .subscribe((x) => {
        this.socket.emit('generate-grid', {
          biasCharacter,
          biasWeight,
          id: this.id,
        });
      });
  }

  stopInterval() {
    console.log('stopping ' + this.id);
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }
}
