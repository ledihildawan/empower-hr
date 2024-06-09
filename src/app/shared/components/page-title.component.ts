import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Input, Component } from '@angular/core';

@Component({
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 2rem;

        @media (width >= 600px) {
          flex-direction: row;
          justify-content: space-between;
        }

        .title {
          font-size: 1.25rem;
          font-weight: 700;

          @media (width >= 600px) {
            font-size: 1.5rem;
          }

          @media (width >= 768px) {
            font-size: 2rem;
          }
        }
      }
    `,
  ],
  imports: [CommonModule],
  selector: 'page-title',
  template: `
    <div style="display: flex; align-items: center; gap: 0.5rem">
      @if (useBack) {
      <svg
        fill="none"
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        (click)="handleBack(backToPath)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.97353 14.7682C8.54926 15.1218 7.91869 15.0645 7.56513 14.6402L4.23179 10.6402C3.87823 10.2159 3.93555 9.58537 4.35983 9.2318C4.78411 8.87824 5.41467 8.93556 5.76824 9.35984L9.10157 13.3598C9.45513 13.7841 9.39781 14.4147 8.97353 14.7682Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.97353 5.2318C9.39781 5.58537 9.45513 6.21593 9.10157 6.64021L5.76824 10.6402C5.41467 11.0645 4.78411 11.1218 4.35983 10.7682C3.93555 10.4147 3.87823 9.78412 4.23179 9.35984L7.56513 5.35984C7.91869 4.93556 8.54926 4.87824 8.97353 5.2318Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.99997 10C5.99997 9.44772 6.44768 9 6.99997 9L15 9C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11L6.99997 11C6.44768 11 5.99997 10.5523 5.99997 10Z"
          fill="currentColor"
        />
      </svg>
      }
      <span class="title">{{ title }}</span>
    </div>

    <ng-content></ng-content>
  `,
  standalone: true,
})
export class PageTitleComponent {
  @Input()
  public title!: string | undefined;

  @Input()
  public useBack!: boolean | undefined;

  @Input()
  public backToPath!: string;

  constructor(private readonly _router: Router) {}

  public handleBack(path: string): void {
    this._router.navigateByUrl(path);
  }
}
