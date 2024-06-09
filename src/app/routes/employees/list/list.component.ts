import { Router } from '@angular/router';
import { Employee } from '@shared/interfaces/employee.interface';
import { CommonModule } from '@angular/common';
import { StatusComponent } from '@shared/components/status.component';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { InputSearchComponent } from '@shared/components/input-search/input-search.component';
import { TableHeadingComponent } from '@shared/components/table-heading/table-heading.component';

import { OnInit, Component } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import employees from '@data/employees';

@Component({
  imports: [
    CommonModule,
    ToastrModule,
    StatusComponent,
    PaginationComponent,
    InputSearchComponent,
    TableHeadingComponent,
  ],
  selector: 'app-employees',
  styleUrl: 'list.component.scss',
  standalone: true,
  templateUrl: 'list.component.html',
})
export class EmployeesComponent implements OnInit {
  private readonly _initialEmployees: Employee[] =
    this._localStorageService.get('employees') || employees;

  public activeSort!: any;

  public columns: any[] = [
    { key: 'firstName', label: 'Name', order: 0, isSort: true },
    { key: 'group', label: 'Group', order: 0, isSort: true },
    { key: 'email', label: 'Email', order: 0, isSort: true },
    { key: 'birthDate', label: 'Birth Date', order: 0, isSort: true },
    { key: 'status', label: 'Status', order: 0, isSort: true },
  ];
  public isSorted: boolean = false;
  public isSearched: boolean = false;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;

  public endIdx: number = this.itemsPerPage;
  public startIdx: number = 0;
  public totalItems: number = this._initialEmployees.length;

  public filteredEmployees: Employee[] = [...this._initialEmployees];
  public sliceFilteredEmployees: Employee[] = [];

  public get employees(): Employee[] {
    return this.filteredEmployees.slice(this.startIdx, this.endIdx);
  }

  constructor(
    private readonly _router: Router,
    private readonly _toastrService: ToastrService,
    private readonly _localStorageService: LocalStorageService
  ) {}

  private _sort(a: any, b: any, idx: number): number {
    let comparison = 0;

    if (a[this.activeSort.key] < b[this.activeSort.key]) {
      comparison = -1;
    }
    if (a[this.activeSort.key] > b[this.activeSort.key]) {
      comparison = 1;
    }

    return this.columns[idx].order === -1 ? comparison * -1 : comparison;
  }

  public navigateTo(path: string): void {
    this._router.navigateByUrl(path);
  }

  public handleDelete(id: string): void {
    this.filteredEmployees = this.filteredEmployees.filter(
      (el: Employee): boolean => el.id !== id
    );

    this.totalItems = this.filteredEmployees.length;

    this._toastrService.success(
      'The employee has been successfully deleted from the system.',
      'Employee Deleted'
    );
  }

  public handlePageChange(data: any): void {
    this.currentPage = data;

    this.startIdx = (this.currentPage - 1) * this.itemsPerPage;

    this.endIdx = this.startIdx + this.itemsPerPage;
  }

  public handleClearInputSearch(): void {
    this.isSearched = false;
    this.endIdx = this.itemsPerPage;
    this.startIdx = 0;
    this.currentPage = 1;
    this.filteredEmployees = [...this._initialEmployees];
    this.totalItems = this.filteredEmployees.length;

    if (this.activeSort) {
      this.filteredEmployees = this.filteredEmployees.sort(
        (a: Employee, b: Employee): number => {
          const idx: number = this.columns.findIndex(
            (el: any): boolean => el.key === this.activeSort.key
          );

          return this._sort(a, b, idx);
        }
      );
    }
  }

  public handleClickTableHeading(data: any, index: number): void {
    if (data.key !== this.activeSort?.key) {
      const idx: number = this.columns.findIndex(
        (el: any): boolean => el.key === this.activeSort?.key
      );

      if (idx !== -1) {
        this.columns[idx] = { ...this.columns[idx], order: 0 };
      }
    }

    if (!this.activeSort) {
      this.columns[index] = { ...data, order: 1 };
    }

    if (data.order === -1) {
      this.columns[index] = { ...data, order: 0 };
    }

    if (data.order === 0) {
      this.columns[index] = { ...data, order: 1 };
    }

    if (data.order === 1) {
      this.columns[index] = { ...data, order: -1 };
    }

    this.activeSort = this.columns[index];

    if (this.currentPage !== 1) {
      if (!this.sliceFilteredEmployees.length) {
        this.sliceFilteredEmployees = this.filteredEmployees.slice(
          this.startIdx,
          this.endIdx + 1
        );
      }

      const numberOfItemsToRemove: number = this.endIdx - this.startIdx + 1;
      const dataOnCurrentPage: Employee[] = this.filteredEmployees.slice(
        this.startIdx,
        this.endIdx
      );

      dataOnCurrentPage.sort((a: Employee, b: Employee): number => {
        return this._sort(a, b, index);
      });

      if (this.columns[index].order === 0) {
        this.filteredEmployees.splice(
          this.startIdx,
          numberOfItemsToRemove,
          ...this.sliceFilteredEmployees
        );

        this.sliceFilteredEmployees = [];
      } else {
        this.filteredEmployees.splice(
          this.startIdx,
          numberOfItemsToRemove,
          ...dataOnCurrentPage
        );
      }

      return;
    }

    if (this.columns[index].order === 0) {
      this.filteredEmployees = this.isSearched
        ? this.filteredEmployees
        : [...this._initialEmployees];

      return;
    }

    this.filteredEmployees.sort((a: Employee, b: Employee): number =>
      this._sort(a, b, index)
    );
  }

  public handleChangeInputSearch(q: string): void {
    this.endIdx = this.itemsPerPage;
    this.startIdx = 0;
    this.currentPage = 1;

    if (!q && this.isSearched) {
      this.isSearched = false;
      this.filteredEmployees = [...this._initialEmployees];
      this.totalItems = this.filteredEmployees.length;

      return;
    }

    if (!q) {
      this.filteredEmployees = [];
      this.totalItems = this.filteredEmployees.length;

      return;
    }

    this.filteredEmployees = this._initialEmployees.filter(
      (employee: Employee): boolean => {
        return (
          employee.firstName.toLowerCase().includes(q.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(q.toLowerCase())
        );
      }
    );

    this.totalItems = this.filteredEmployees.length;

    this.isSearched = true;
  }

  public handleItemsPerPageChange(data: any): void {
    this.currentPage = 1;
    this.itemsPerPage = data;

    this.startIdx = (1 - 1) * this.itemsPerPage;

    this.endIdx = this.startIdx + this.itemsPerPage;
  }

  public ngOnInit(): void {
    if (!this._localStorageService.has('employees')) {
      this._localStorageService.set('employees', employees);
    }
  }
}
