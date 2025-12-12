
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchTerm = '';
  page = 1;
  pageSize = 10;

  totalEmployees = 0;
activeEmployees = 0;
inactiveEmployees = 0;
departmentCount = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }
loadEmployees() {
  this.employeeService.getEmployees().subscribe({
    next: (data: Employee[]) => {
      this.employees = data;

      // Dashboard calculations
      this.totalEmployees = data.length;
      this.activeEmployees = data.filter(e => e.status === 'Active').length;
      this.inactiveEmployees = data.filter(e => e.status !== 'Active').length;

      const departments = new Set(data.map(e => e.department));
      this.departmentCount = departments.size;

      // Pagination
      this.page = 1;
    },
    error: (err) => console.error('Error loading employees:', err)
  });
}


  // Filtering + pagination helpers
  get filteredEmployees(): Employee[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.employees;
    return this.employees.filter(e =>
      (e.fullName || '').toLowerCase().includes(term) ||
      (e.email || '').toLowerCase().includes(term) ||
      (e.department || '').toLowerCase().includes(term) ||
      (e.designation || '').toLowerCase().includes(term)
    );
  }

  get pagedEmployees(): Employee[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredEmployees.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredEmployees.length / this.pageSize));
  }

  goToPage(n: number) {
    const tp = this.totalPages();
    if (n < 1) n = 1;
    if (n > tp) n = tp;
    this.page = n;
  }

  prevPage() {
    this.goToPage(this.page - 1);
  }

  nextPage() {
    this.goToPage(this.page + 1);
  }

  // Delete with confirmation
  deleteEmployee(id?: number) {
    if (id === undefined || id === null) return;
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        console.log('Deleted', id);
        this.loadEmployees(); 
      },
      error: (err: any) => console.error('Error deleting employee:', err)
    });
  }
}
