import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Booking } from 'src/app/shared/domain/booking.type';
import { Activity, NULL_ACTIVITY } from '../../shared/domain/activity.type';
import { Participant } from '../../shared/domain/participant.type';

@Component({
  selector: 'lab-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent {
  private url: string = 'http://localhost:3000/activities';
  /** Activity object used at the controller*/
  private activity: Activity = NULL_ACTIVITY;
  /** Activity observable used at the template */
  public activity$: Observable<Activity>;

  /**  Supposed already booked places */
  public currentParticipants: number = 2;

  /** The participants booked on this session*/
  public newParticipants: number = 0;

  /** Array with the new participants data */
  public newParticipantsData: Participant[] = [];

  /** Current plus new participants*/
  public totalParticipants: number = this.currentParticipants + this.newParticipants;

  /** The maximum available places */
  public maxNewParticipants: number = 0;

  /** Flag indicating if the booking was saved*/
  public booked: boolean = false;

  /** Message indicating the range of places available*/
  public activityRangeMessage: string = ``;

  /** Feedback message whe the booking is saved */
  public bookedMessage: string = '';

  /** Activity slug got from the router */
  public activitySlug: string = '';

  /**
   * Component constructor
   * @param route The router service injected by Angular
   * @param http The HttpClient service injected by Angular
   */
  constructor(
    route: ActivatedRoute,
    private http: HttpClient,
  ) {
    // Get the activity slug from the router
    const activitySlug = route.snapshot.params['slug'];
    const slugUrl = `${this.url}?slug=${activitySlug}`;
    this.activity$ = this.http.get<Activity[]>(slugUrl).pipe(
      map((activities: Activity[]) => activities[0]),
      tap((activity: Activity) => {
        this.activity = activity;
        this.maxNewParticipants = activity.maxParticipants - this.currentParticipants;
        this.activityRangeMessage = `The activity is available for ${activity.minParticipants} to ${activity.maxParticipants} participants`;
      }),
    );
  }

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
    // create a fake array of participants
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
    console.log('Booking activity', this.totalParticipants);
    const newBooking: Booking = {
      id: 0,
      userId: 0,
      activityId: this.activity.id,
      date: new Date(),
      participants: this.newParticipants,
      payment: {
        method: 'creditCard',
        amount: this.activity.price * this.newParticipants,
        status: 'pending',
      },
    };
    this.http.post<Booking>('http://localhost:3000/bookings', newBooking).subscribe((booking: Booking) => {
      this.booked = true;
      this.bookedMessage = `Booked ${this.newParticipants} participants for ${booking.payment?.amount} dollars`;
      this.updateActivityStatus();
    });
  }

  private updateActivityStatus() {
    let newStatus = this.activity.status;
    if (this.totalParticipants >= this.activity.minParticipants) {
      newStatus = 'confirmed';
    }
    if (this.totalParticipants >= this.activity.maxParticipants) {
      newStatus = 'sold-out';
    }
    if (newStatus !== this.activity.status) {
      this.activity.status = newStatus;
      const url = `http://localhost:3000/activities/${this.activity.id}`;
      this.http.put<Activity>(url, this.activity).subscribe((activity: Activity) => {
        console.log('Activity updated', activity);
      });
    }
  }
}
