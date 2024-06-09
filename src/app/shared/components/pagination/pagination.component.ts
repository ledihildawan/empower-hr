import { CommonModule } from '@angular/common';

import {
  Input,
  OnInit,
  Output,
  Component,
  OnChanges,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-pagination',
  styleUrl: 'pagination.component.scss',
  standalone: true,
  templateUrl: 'pagination.component.html',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  public currentPage!: number;

  @Input()
  public totalItems!: number;

  @Input()
  public itemsPerPage!: number;

  @Output('onPageChange')
  private _onPageChange = new EventEmitter();

  @Output('onItemsPerPageChange')
  private _onItemsPerPageChange = new EventEmitter();

  public totalPages!: number;
  public adjustedEndIdx!: number;
  public adjustedStartIdx!: number;

  public pageNumbers: number[] = [];

  private _updatePageNumbers(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.adjustedEndIdx = Math.min(
      this.currentPage * this.itemsPerPage,
      this.totalItems
    );
    this.adjustedStartIdx =
      this.currentPage > 1
        ? this.currentPage * this.itemsPerPage - this.itemsPerPage + 1
        : Math.min(this.currentPage, this.totalItems);

    const maxButtons = 3;
    const half = Math.floor(maxButtons / 2);

    let startPage = Math.max(1, this.currentPage - half);
    let endPage = startPage + maxButtons - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - maxButtons + 1, 1);
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
    this._updatePageNumbers();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._updatePageNumbers();
  }
}
