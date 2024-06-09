import { CommonModule } from '@angular/common';

import { Input, Component } from '@angular/core';

@Component({
  styles: [
    `
      span {
        display: inline-block;
        border-radius: 1rem;
        padding: 0.125rem 0.725rem;
        color: #fff;
        text-wrap: nowrap;

        &.active {
          background-color: #28a745;
        }

        &.inactive {
          background-color: #6c757d;
        }

        &.on-leave {
          background-color: #fd7e14;
        }
      }
    `,
  ],
  imports: [CommonModule],
  selector: 'app-status',
  template: `<span
    [ngClass]="{
    'active': value === 'Active',
    'inactive': value === 'Inactive',
    'on-leave': value === 'On Leave',
  }"
    >{{ value }}</span
  >`,
  standalone: true,
})
export class StatusComponent {
  @Input()
  public value!: string | undefined;
}
