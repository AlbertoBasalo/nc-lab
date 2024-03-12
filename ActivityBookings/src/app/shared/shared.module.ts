import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParticipantPipe } from './pipes/participant.pipe';

/** A module that holds shared ui items(components, pipes...) */
@NgModule({
  declarations: [ParticipantPipe],
  imports: [CommonModule],
  exports: [ParticipantPipe],
})
export class SharedModule {}
