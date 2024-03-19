import { Component, Input } from '@angular/core';

@Component({
  selector: 'lab-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @Input() public activitiesCount: number = 0;
  @Input() public favoritesCount: number = 0;
}
