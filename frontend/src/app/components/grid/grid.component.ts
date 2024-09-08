import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import ApiResponse from 'src/app/models/api-response.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class GridComponent {
  @Input() grid$!: Observable<ApiResponse | null>;
  @Input() key?: string;

  constructor() {}
}
