import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { HeroComponent } from './components/hero/hero.component';
import { TransactionComponent } from './components/transaction/transaction.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoModule, HeroComponent, TransactionComponent],
})
export class AppComponent {}
