import { CommonModule } from '@angular/common';

import { Input, Output, Component, EventEmitter } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'input-search',
  styleUrl: 'input-search.component.scss',
  standalone: true,
  templateUrl: 'input-search.component.html',
})
export class InputSearchComponent {
  @Input()
  public value: string = '';

  @Output('onClear')
  private _onClear = new EventEmitter();

  @Output('onChange')
  private _onChange = new EventEmitter();

  public handleClear(): void {
    this.value = '';

    this._onClear.emit(this.value);
  }

  public handleChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).value.trim();

    this._onChange.emit(this.value);
  }
}
