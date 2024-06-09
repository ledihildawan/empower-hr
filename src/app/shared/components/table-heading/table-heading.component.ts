import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'table-heading',
  styleUrl: 'table-heading.component.html',
  standalone: true,
  templateUrl: 'table-heading.component.html',
})
export class TableHeadingComponent {
  @Input()
  public data!: any;

  @Input()
  public active!: any;

  @Output('onClick')
  private _onClick = new EventEmitter();

  public handleClick(): void {
    if (!this.data?.isSort) {
      return;
    }

    this._onClick.emit(this.data);
  }
}
