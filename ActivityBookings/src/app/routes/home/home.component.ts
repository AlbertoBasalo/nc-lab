import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/shared/domain/activity.type';
import { HomeService } from './home.service';

@Component({
  selector: 'lab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  /** The observable of array of activities from the API*/
  public activities$: Observable<Activity[]> = this.service.getActivities$();

  public favorites: string[] = [];
  /**
   * HomeComponent constructor
   * @param service HomeService service with data and logic for the HomeComponent
   */
  constructor(private service: HomeService) {}

  public onToggleFavorite(slug: string): void {
    const index = this.favorites.indexOf(slug);
    if (index === -1) {
      this.favorites.push(slug);
    } else {
      this.favorites.splice(index, 1);
    }
  }
}
