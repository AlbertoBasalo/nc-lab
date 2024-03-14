import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ACTIVITIES } from 'src/app/shared/domain/activities.data';
import { Activity } from 'src/app/shared/domain/activity.type';

@Component({
  selector: 'lab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  /** The array of activities */
  public activities: Activity[] = ACTIVITIES;

  /**
   * HomeComponent constructor
   * @param http HttpClient service injected by Angular
   */
  constructor(http: HttpClient) {
    const url = 'http://localhost:3000/activities';
    http.get<Activity[]>(url).subscribe((activities) => {
      this.activities = activities;
    });
  }
}
