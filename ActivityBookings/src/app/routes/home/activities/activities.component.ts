import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/shared/domain/activity.type';

@Component({
  selector: 'lab-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent {
  @Input() public activities: Activity[] = [];
}
