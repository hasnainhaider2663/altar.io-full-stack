import { Injectable } from '@angular/core';
import { createId } from '@paralleldrive/cuid2';
import { BehaviorSubject, debounceTime, interval, Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import ApiResponse from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  private socket: Socket;

  private gridSubject = new BehaviorSubject<ApiResponse | null>(null);
  private grid$ = this.gridSubject.asObservable();
  private intervalSubscription: Subscription | null = null;

  //create ids to define which was the last client to emit an event
  // used to hanle conflict resolution.
  private id?: string = createId();

  constructor() {
    this.socket = io('http://localhost:3000', { autoConnect: true });

    //subscribes to grid updates
    this.socket.on('grid-updated', (result) => {
      this.gridSubject.next(result);
    });

    this.socket.on('stop-emitting', (id: string) => {
      console.log('client id which is allowed to keep emitting', id);
      this.stopInterval();
    });
  }
  getGrid() {
    // return observable so pages can subscribe to it.
    return this.grid$;
  }
  generateGrid(biasCharacter?: string, biasWeight?: number) {
    //stops all other clients from emitting generate-grid-events except itself
    this.socket.emit('stop-emitting-all-except', this.id);
    this.stopInterval();

    //interval emits a number every 2 seconds,
    // the event is debounced by 100 ms to handle rapid key inputs
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
