import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TaskService } from '../tasks.service';  
@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, CalendarModule, DropdownModule],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  description: string = '';
  deadline?: Date;
  status: string = 'pending';

  statusOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'En Progreso', value: 'in_progress' },
    { label: 'Realizada', value: 'done' }
  ];

  constructor(private taskService: TaskService, private router: Router) {}

  createTask(): void {
    if (!this.description.trim()) {
      alert('La descripción es obligatoria');
      return;
    }

    const taskPayload = {
      description: this.description,
      deadline: this.deadline
    ? `${this.deadline.getFullYear()}-${String(this.deadline.getMonth() + 1).padStart(2, '0')}-${String(this.deadline.getDate()).padStart(2, '0')}`
    : null,
      status: this.status,
      isalive: true
    };

    this.taskService.createTask(taskPayload).subscribe({
      next: () => {
        alert('Tarea creada con éxito');
        this.router.navigate(['/task/task-list']);
      },
      error: (err) => {
        console.error('Error al crear tarea', err);
        alert(err.error?.message || 'Error al crear tarea');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/task/task-list']);
  }
}
