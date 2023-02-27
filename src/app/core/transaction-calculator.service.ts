import { Injectable } from '@angular/core';
import { Transaction, TransactionResult } from '../models/transaction';

@Injectable()
export class TransactionCalculatorService {
  calculateResult(transaction: Transaction): TransactionResult[] {
    const { amount, participants } = transaction;

    const participantsToEvaluate = participants.filter(
      (participant) => participant.shouldBeEvaluated && participant.name
    );

    const sumOfFractions = participantsToEvaluate.reduce(
      (curr, next) => curr + next.amount,
      0
    );

    return participantsToEvaluate.map((participant) => {
      return {
        name: participant.name,
        price: this.floorToSecondDigit(
          amount * (participant.amount / sumOfFractions)
        ),
      };
    });
  }

  private floorToSecondDigit(input: number): number {
    return Math.floor(input * 100) / 100;
  }
}
