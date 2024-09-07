import { Component, OnInit } from '@angular/core';
import { GridComponent } from '../components/grid/grid.component';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [GridComponent],
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.generateGrid().subscribe((x) => {
      console.log(x);
    });
  }
}
