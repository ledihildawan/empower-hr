import { RouterLink } from '@angular/router';

import { Input, Component } from '@angular/core';

@Component({
  imports: [RouterLink],
  selector: 'error-code',
  standalone: true,
  template: `
    <div class="error">
      <div class="error__code">{{ code }}</div>

      @if (title) {
      <div class="error__title">{{ title }}</div>
      } @if (message) {
      <div class="error__message">{{ message }}</div>
      }

      <div>
        <a routerLink="/">Back to Home</a>
      </div>
    </div>
  `,
})
export class ErrorCodeComponent {
  @Input()
  public code!: string;

  @Input()
  public title!: string;

  @Input()
  public message!: string;
}
