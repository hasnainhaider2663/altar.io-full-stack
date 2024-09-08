import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { Payment } from 'src/app/models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private socket: Socket;

  private paymentsSubject = new BehaviorSubject<Payment[] | null>(null);
  private payments$ = this.paymentsSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:3000', { autoConnect: true });

    this.socket.on('payments-updated', (result) => {
      this.paymentsSubject.next(result);
      console.log(result);
    });
  }
  getPayments() {
    return this.payments$;
  }

  sendNewPayment(payment: Payment) {
    this.socket.emit('new-payment', payment);
  }
}
