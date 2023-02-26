import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: ['transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslocoModule, ReactiveFormsModule],
})
export class TransactionComponent {
  form = this.fb.group({
    amount: this.fb.control(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  constructor(private fb: NonNullableFormBuilder) {}
}
