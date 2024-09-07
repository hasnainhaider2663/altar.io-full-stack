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
  code: string = '';
  constructor(private apiService: ApiService) {}

  subscribe() {
    this.apiService.generateGrid().subscribe((result) => {
      this.grid = result.grid;
      this.code = result.code;
    });
  }
  ngOnInit(): void {
    this.subscribe();
  }
}
