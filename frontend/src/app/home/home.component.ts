import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
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
export class HomeComponent implements OnInit {
  grid$: Observable<ApiResponse> | null = null;
  inputDisabled = false;

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    interval(4000).subscribe(() => {
      this.inputDisabled = !this.inputDisabled;
    });
  }

  generate2dGridClicked() {
    this.grid$ = this.apiService.generateGrid();
  }
  onCharactedChanged(event: KeyboardEvent) {
    const regex = /^[a-z]+$/;
    const { key } = event;

    // Allow special keys
    if (
      key === 'Backspace' ||
      key === 'Tab' ||
      key === 'Enter' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
      key === 'Delete'
    ) {
      return;
    }
    if (!regex.test(key)) {
      event.preventDefault();
      return;
    }

    this.grid$ = this.apiService.generateGrid(key, 0.9);
  }
}
