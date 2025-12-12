import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    fullName: '',
    email: '',
    mobile: '',
    department: '',
    designation: '',
    dateOfJoining: '',
    status: 'Active'
  };

  isEdit = false;
  editingId?: number;
  isLoading = false;

showToast(message: string, type: string) {
  const toast = document.getElementById("toast")!;
  toast.innerText = message;
  toast.className = "toast show " + type;

  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      if (!isNaN(id)) {
        this.isEdit = true;
        this.editingId = id;
        this.employeeService.getEmployeeById(id).subscribe({
          next: (emp) => {
            this.employee = {
              ...emp,
              dateOfJoining: emp.dateOfJoining ?? ''
            };
          },
          error: (err) => console.error('Error loading employee for edit:', err)
        });
      }
    }
  }

  onSubmit() {
  this.isLoading = true;

  this.employeeService.createEmployee(this.employee).subscribe({
    next: () => {
      this.isLoading = false;
      this.showToast("Employee added successfully!", "success");
      this.router.navigate(['/']);
    },
    error: (err) => {
      this.isLoading = false;
      this.showToast("Error saving employee", "error");
      console.error(err);
    }
  });
}
}