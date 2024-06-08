import { Component, Output } from '@angular/core';

@Component({
  styleUrl: 'entries-per-page.component.scss',
  selector: 'entries-per-page',
  template: `
    <span>Entries per page</span>
    <div class="select-wrapper">
      <select>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  `,
  standalone: true,
})
export class EntriesPerPageComponent {}
