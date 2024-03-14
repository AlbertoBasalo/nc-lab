import { Component } from '@angular/core';
import { ACTIVITIES } from 'src/app/shared/domain/activities.data';
import { Activity } from 'src/app/shared/domain/activity.type';

@Component({
  selector: 'lab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public activities: Activity[] = ACTIVITIES;
}
