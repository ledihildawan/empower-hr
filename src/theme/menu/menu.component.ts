import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-menu',
  styleUrl: 'menu.component.scss',
  standalone: true,
  templateUrl: 'menu.component.html',
})
export class MenuComponent {
  @Output()
  public onClose = new EventEmitter();

  @Output()
  public onClick = new EventEmitter();
}
