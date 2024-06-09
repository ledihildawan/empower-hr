import { CommonModule } from '@angular/common';
import { EntriesPerPageComponent } from '../entries-per-page.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  imports: [CommonModule, EntriesPerPageComponent],
  selector: 'app-pagination',
  styleUrl: 'pagination.component.scss',
  standalone: true,
  templateUrl: 'pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input()
  public totalItems!: number;

  @Input()
  public itemsPerPage!: number;

  @Output('onPageChange')
  private _onPageChange = new EventEmitter();

  @Output('onItemsPerPageChange')
  private _onItemsPerPageChange = new EventEmitter();

  public totalPages!: number;

  public currentPage: number = 1;
  public pageNumbers: number[] = [];

  private _updatePageNumbers(): void {
    const maxButtons = 3;
    const half = Math.floor(maxButtons / 2);

    let startPage = Math.max(1, this.currentPage - half);
    let endPage = Math.min(this.totalPages, this.currentPage + half);

    if (endPage - startPage + 1 < maxButtons) {
      if (this.currentPage <= half) {
        endPage = Math.min(
          this.totalPages,
          endPage + (maxButtons - (endPage - startPage + 1))
        );
      } else {
        startPage = Math.max(
          1,
          startPage - (maxButtons - (endPage - startPage + 1))
        );
      }
    }

    this.pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  public goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;

    this._updatePageNumbers();

    this._onPageChange.emit(this.currentPage);
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  public handleItemsPerPageChange(e: Event): void {
    const value = +(e.target as HTMLSelectElement).value;

    this._onItemsPerPageChange.emit(value);
  }

  public ngOnInit(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    this._updatePageNumbers();
  }
}
