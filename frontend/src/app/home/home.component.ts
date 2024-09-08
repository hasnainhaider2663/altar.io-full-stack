import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { GridComponent } from '../components/grid/grid.component';
import ApiResponse from '../models/api-response.model';
import { GridService } from '../services/grid/grid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [GridComponent, AsyncPipe],
})
export class HomeComponent implements OnInit {
  grid$: Observable<ApiResponse | null>;
  inputDisabled = false;
  key?: string = '';
  bias?: number;
  constructor(private gridService: GridService) {
    this.grid$ = this.gridService.getGrid();
    this.grid$.subscribe((result) => {
      this.key = result?.biasCharacter;
    });
  }

  ngOnInit(): void {
    interval(4000).subscribe(() => {
      this.inputDisabled = !this.inputDisabled;
    });
  }

  generate2dGridClicked() {
    this.gridService.generateGrid(this.key, this.bias);
  }
  onCharactedChanged(event: KeyboardEvent) {
    const regex = /^[a-z]+$/;
    const { key } = event;
    const input = event.target as HTMLInputElement;
    if (key === 'Backspace' || key === 'Delete') {
      input.value = '';
      this.key = undefined;
      this.gridService.generateGrid();
      return;
    }
    // Allow special keys
    if (
      key === 'Tab' ||
      key === 'Enter' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight'
    ) {
      return;
    }
    if (!regex.test(key) || this.inputDisabled) {
      event.preventDefault();
      return;
    }
    input.value = key;

    this.key = key;
    this.bias = 0.2;

    this.gridService.generateGrid(this.key, this.bias);
  }
}
