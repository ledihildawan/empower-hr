import { Component } from '@angular/core';
import { MenuComponent } from 'theme/menu/menu.component';

import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterOutlet, MenuComponent],
  selector: 'app-admin-layout',
  styleUrl: 'admin-layout.component.scss',
  standalone: true,
  templateUrl: 'admin-layout.component.html',
})
export class AdminLayoutComponent {
  isMenuVisible: boolean = false;
}
