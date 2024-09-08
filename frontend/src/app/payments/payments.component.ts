import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import ApiResponse from '../models/api-response.model';
import { Payment } from '../models/payment';
import { GridService } from '../services/grid/grid.service';
import { PaymentsService } from '../services/payments/payments.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent {
  grid$: Observable<ApiResponse | null>;
  payments$: Observable<Payment[] | null>;
  form: FormGroup;
  isGridInitialized = false;
  constructor(
    private gridService: GridService,
    private paymentsService: PaymentsService
  ) {
    this.grid$ = this.gridService.getGrid();

    this.payments$ = this.paymentsService.getPayments();

    this.form = new FormGroup({
      payment: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
      code: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });

    this.grid$.subscribe((gridVal) => {
      this.isGridInitialized = !!gridVal?.code;
      this.form.patchValue({ code: gridVal?.code });
    });

    setTimeout(() => {
      if (!this.isGridInitialized) {
        this.gridService.generateGrid();
      }
    }, 2000);
  }

  onSubmit() {
    console.log(this.form.value);
    if (!this.form.value.code) {
      return alert('Wait for Grid Generation');
    }
    this.paymentsService.sendNewPayment(this.form.value);
    this.form.reset();
  }
}
