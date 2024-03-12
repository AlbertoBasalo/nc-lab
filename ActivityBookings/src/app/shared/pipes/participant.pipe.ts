import { Pipe, PipeTransform } from '@angular/core';
import { Participant } from '../domain/participant.type';

@Pipe({
  name: 'participant',
})
export class ParticipantPipe implements PipeTransform {
  /** Takes a participant and return a paragraph with its data */
  transform(value: Participant, ...args: unknown[]): string {
    return `Participant ${value.id} - ${value.name} - ${value.age} years old.`;
  }
}
