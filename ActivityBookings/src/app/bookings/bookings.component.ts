import { Component } from '@angular/core';
import { Activity } from '../shared/domain/activity.type';

@Component({
  selector: 'lab-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent {
  activity: Activity = {
    name: 'Paddle surf',
    location: 'Lake Leman at Lausanne',
    price: 100,
    date: new Date(2025, 7, 15),
    minParticipants: 4,
    maxParticipants: 10,
    status: 'published',
    id: 1,
    slug: 'paddle-surf',
    duration: 2,
    userId: 1,
  };
  alreadyParticipants = 3;
  newParticipants = 0;
  totalParticipants = () => this.alreadyParticipants + this.newParticipants;
  remainingPlaces = () => this.activity.maxParticipants - this.totalParticipants();

  participants = [{ id: 1 }, { id: 2 }, { id: 3 }];

  booked = false;

  onNewParticipantsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const participants: number = parseInt(input.value);
    this.newParticipants = participants;
    this.participants = [];
    for (let i = 1; i <= this.totalParticipants(); i++) {
      this.participants.push({ id: i });
    }
    console.log('New participants:', participants);
  }
  onBookClick(): void {
    console.log('Booking for', this.newParticipants, 'participants');
    this.booked = true;
  }
}
