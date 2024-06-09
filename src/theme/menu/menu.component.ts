import { CommonModule } from '@angular/common';
import { LocalStorageService } from '@shared/services/local-storage.service';

import { Output, Component, EventEmitter } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, CommonModule, RouterLinkActive],
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

  constructor(
    private readonly _router: Router,
    private readonly _localStorageService: LocalStorageService
  ) {}

  public handleSignOut(): void {
    this._localStorageService.clear();

    this._router.navigateByUrl('/auth/sign-in');
  }
}
