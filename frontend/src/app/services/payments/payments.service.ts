import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import ApiResponse from 'src/app/models/api-response.model';
import { Payment } from 'src/app/models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private socket: Socket;

  private gridSubject = new BehaviorSubject<ApiResponse | null>(null);
  private grid$ = this.gridSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:3000', { autoConnect: true });

    this.socket.on('grid-updated', (result) => {
      this.gridSubject.next(result);
    });

    this.socket.on('stop-emitting', (id: string) => {});
  }
  getGrid() {
    return this.grid$;
  }

  sendNewPayment(payment: Payment) {
    this.socket.emit('new-payment', payment);
  }
}
