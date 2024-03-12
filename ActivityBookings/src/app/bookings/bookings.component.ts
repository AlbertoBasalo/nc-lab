import { Component } from '@angular/core';
import { ACTIVITIES } from '../shared/domain/activities.data';
import { Activity } from '../shared/domain/activity.type';
import { Participant } from '../shared/domain/participant.type';

@Component({
  selector: 'lab-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent {
  /** Activity object selecto from the array */
  public activity: Activity = ACTIVITIES[3];

  /**  Supposed already booked places */
  public currentParticipants: number = 2;

  /** The participants booked on this session*/
  public newParticipants: number = 0;

  /** Array with the new participants data */
  public newParticipantsData: Participant[] = [];

  /** Current plus new participants*/
  public totalParticipants: number = this.currentParticipants + this.newParticipants;

  /** The maximum available places */
  public maxNewParticipants: number = this.activity.maxParticipants - this.currentParticipants;

  /** Flag indicating if the booking was saved*/
  public booked: boolean = false;

  /** Message indicating the range of places available*/
  public activityRangeMessage: string = `The activity is available for ${this.activity.minParticipants} to ${this.activity.maxParticipants} participants`;

  /** Feedback message whe the booking is saved */
  public bookedMessage: string = '';

  /** Function to enable or disable the booking button */
  public getDisableBookingButton(): boolean {
    // Fast and cheap to run, even if called multiple times.
    return this.newParticipants === 0;
  }

  /** Function to return a message for each participant */
  public getParticipantsMessage(participant: any): string {
    // ToDo: Should be substituted with th participant pipe
    return `Participant ${participant.id}: ${participant.name} (${participant.age} years old)`;
  }

  /** Event handler fired when the inout elements has user changes */
  public onNewParticipantsChange(event: any) {
    const input: HTMLInputElement = event.target;
    const value = input.value;
    console.log('el input ha cambiado', value);
    this.newParticipants = parseInt(value, 10);
    this.totalParticipants = this.currentParticipants + this.newParticipants;
    //this.disableBookingButton = this.newParticipants === 0;
    this.newParticipantsData = [];
    for (let i = 0; i < this.newParticipants; i++) {
      this.newParticipantsData.push({
        id: i + 1,
        bookingId: 0,
        name: 'Name_' + (i + 1),
        age: 3 * i + 7,
      });
    }
  }

  /** Event handler fired whe user clicks the booking button */
  public onBookClick() {
    console.log('Reservar actividad', this.totalParticipants);
    this.booked = true;
    this.bookedMessage = `Booked ${this.newParticipants} participants for ${
      this.activity.price * this.newParticipants
    } dollars`;
    if (this.totalParticipants === this.activity.maxParticipants) {
      this.activity.status = 'sold-out';
      return;
    }
    if (this.totalParticipants >= this.activity.minParticipants) {
      this.activity.status = 'confirmed';
      return;
    }
  }
}
