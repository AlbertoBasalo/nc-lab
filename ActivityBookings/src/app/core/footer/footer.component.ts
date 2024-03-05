import { Component } from '@angular/core';

@Component({
  selector: 'lab-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // Properties division

  author = {
    name: 'Alberto Basalo',
    homepage: 'https://albertobasalo.dev',
  };

  cookiesAccepted = false;

  // Public methods division

  getYear(): number {
    // ! Do not abuse (they are called on every change detection cycle)
    return new Date().getFullYear();
  }

  // Event handlers division

  onAcceptClick(): void {
    console.log('Cookies accepted!');
    this.cookiesAccepted = true;
  }
}
