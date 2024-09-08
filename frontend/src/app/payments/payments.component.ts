import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import ApiResponse from '../models/api-response.model';
import { GridService } from '../services/grid/grid.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent {
  grid$: Observable<ApiResponse | null>;
  form: FormGroup;
  constructor(private gridService: GridService) {
    this.grid$ = this.gridService.getGrid();

    this.form = new FormGroup({
      payment: new FormControl(''),
      amount: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.form.value);

    this.form.reset();
  }
}
