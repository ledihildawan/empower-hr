import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { InputSearchComponent } from '@shared/components/input-search/input-search.component';
import { TableHeadingComponent } from '@shared/components/table-heading/table-heading.component';

import { OnInit, Component } from '@angular/core';

import data from './data';

@Component({
  imports: [
    CommonModule,
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
  private readonly _initialEmployees: Employee[] = data.map(
    (el: Employee): any => ({
      ...el,
      name: el.firstName + ' ' + el.lastName,
    })
  );

  public activeSort!: any;

  public columns: any[] = [
    { key: 'name', label: 'Name', order: 0, isSort: true },
    { key: 'group', label: 'Group', order: 0, isSort: true },
    { key: 'email', label: 'Email', order: 0, isSort: true },
    { key: 'birthDate', label: 'Birth Date', order: 0, isSort: true },
    { key: 'status', label: 'Status', order: 0, isSort: true },
  ];
  public isSearched: boolean = false;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;

  public endIndex: number = this.itemsPerPage;
  public startIndex: number = 0;
  public totalItems: number = this._initialEmployees.length;

  public filteredEmployees: Employee[] = [];

  public get employees(): Employee[] {
    if (this.isSearched && this.filteredEmployees.length) {
      return this.filteredEmployees.slice(this.startIndex, this.endIndex);
    }

    if (this.isSearched && !this.filteredEmployees.length) {
      return [];
    }

    return this._initialEmployees.slice(this.startIndex, this.endIndex);
  }

  constructor(private readonly _router: Router) {}

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

  public handlePageChange(data: any): void {
    this.currentPage = data;

    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;

    this.endIndex = this.startIndex + this.itemsPerPage;
  }

  public handleClearInputSearch(): void {
    this.isSearched = false;
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

    if (this.filteredEmployees.length) {
      this.filteredEmployees.sort((a: Employee, b: Employee): number =>
        this._sort(a, b, index)
      );
    } else {
      this._initialEmployees.sort((a: Employee, b: Employee): number =>
        this._sort(a, b, index)
      );
    }
  }

  public handleChangeInputSearch(q: string): void {
    if (!q && this.isSearched) {
      this.isSearched = false;
    }

    if (!q) {
      this.filteredEmployees = [];

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

    this.isSearched = true;
  }

  public handleItemsPerPageChange(data: any): void {
    this.itemsPerPage = data;

    console.log(Math.ceil(this.totalItems / this.itemsPerPage));
  }

  public ngOnInit(): void {}
}

interface Employee {
  email: string;
  group: string;
  status: string;
  username: string;
  lastName: string;
  birthDate: string;
  firstName: string;
  basicSalary: number;
  description: string;
}
