import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/shared/domain/activity.type';

@Component({
  selector: 'lab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private url: string = 'http://localhost:3000/activities';

  /** The observable of array of activities from the API*/
  public activities$: Observable<Activity[]> = this.http.get<Activity[]>(this.url);

  /**
   * HomeComponent constructor
   * @param http HttpClient service injected by Angular, usable inside the component
   */
  constructor(private http: HttpClient) {}
}
