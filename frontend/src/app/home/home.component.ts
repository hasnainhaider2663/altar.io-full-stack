import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GridComponent } from '../components/grid/grid.component';
import ApiResponse from '../models/api-response.model';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [GridComponent, AsyncPipe],
})
export class HomeComponent {
  grid$: Observable<ApiResponse> | null = null;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.grid$ = this.apiService.generateGrid();
  }
}
