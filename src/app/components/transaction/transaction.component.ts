import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: ['transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslocoModule, ReactiveFormsModule],
})
export class TransactionComponent implements OnDestroy {
  form = this.fb.group({
    amount: this.fb.control(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    participants: this.fb.array([
      this.createParticipantFormGroupForUser(),
      this.createParticipantFormGroup(),
    ]),
  });

  private destroy$ = new Subject<void>();

  constructor(private fb: NonNullableFormBuilder) {
    const participantsFormArray = this.form.controls.participants;

    participantsFormArray.valueChanges
      .pipe(
        tap((participants) => {
          const lastParticipant = participants.at(-1);

          if (lastParticipant?.name) {
            participantsFormArray.push(this.createParticipantFormGroup());
          } else {
            const firstEmptyIndex = participants.findIndex(
              (participant) => !participant.name
            );

            if (firstEmptyIndex === participants.length - 1) {
              return;
            }

            const followingParticipantsAreEmpty = participants
              .slice(firstEmptyIndex)
              .every((participant) => !participant.name);

            if (followingParticipantsAreEmpty) {
              for (let i = firstEmptyIndex + 1; i < participants.length; i++) {
                participantsFormArray.removeAt(i);
              }
            }
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  // we want to keep typescripts type inference for the FormGroup definition
  // TODO: add model for Participant and use it to validate this forms type
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private createParticipantFormGroup() {
    return this.fb.group({
      shouldBeEvaluated: this.fb.control(true, {
        validators: [Validators.required],
      }),
      name: this.fb.control(''),
      amount: this.fb.control(1, {
        validators: [Validators.required, Validators.min(0)],
      }),
      unit: this.fb.control('fraction', {
        validators: Validators.required,
      }),
    }) satisfies FormGroup;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private createParticipantFormGroupForUser() {
    const formGroup = this.createParticipantFormGroup();

    formGroup.setValue({
      shouldBeEvaluated: true,
      amount: 1,
      unit: 'fraction',
      name: 'You',
    });

    return formGroup;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
