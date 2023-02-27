import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TransactionResult } from 'src/app/models/transaction';

@Component({
  selector: 'app-transaction-result',
  templateUrl: 'transaction-result.component.html',
  styleUrls: ['transaction-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslocoModule],
})
export class TransactionResultComponent {
  @Input()
  result!: TransactionResult[];
}
