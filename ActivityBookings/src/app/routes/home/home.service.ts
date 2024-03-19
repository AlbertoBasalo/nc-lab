import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/shared/domain/activity.type';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private url: string = 'http://localhost:3000/activities';

  /**
   * Service with data and logic for the HomeComponent
   * @param http HttpClient service to make requests to the API
   */
  constructor(private http: HttpClient) {}

  /**
   * Get activities from the API
   * @returns Observable of array of activities
   */
  public getActivities$(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.url);
  }
}
