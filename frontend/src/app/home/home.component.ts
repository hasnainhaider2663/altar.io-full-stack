import { Component } from '@angular/core';
import { GridComponent } from '../components/grid/grid.component';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [GridComponent],
})
export class HomeComponent {
  grid: string[][] = [];
  constructor(private apiService: ApiService) {}

  subscribe() {
    this.apiService.generateGrid().subscribe((result) => {
      this.grid = result.grid;
    });
  }
  ngOnInit(): void {
    this.subscribe();
  }
}
