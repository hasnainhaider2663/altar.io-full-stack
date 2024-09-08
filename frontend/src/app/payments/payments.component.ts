import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import ApiResponse from '../models/api-response.model';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent {
  grid$: Observable<ApiResponse | null>;

  constructor(private apiService: ApiService) {
    this.grid$ = this.apiService.getGrid();
  }
}
