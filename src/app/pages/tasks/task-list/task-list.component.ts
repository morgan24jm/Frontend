import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TaskService } from '../tasks.service';  
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  // Inyectamos el servicio y el router
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        console.log('📋 Tareas recibidas:', res);
      },
      error: (err) => {
        console.error('❌ Error al obtener tareas:', err);
        alert(err.error?.message || 'No se pudieron cargar las tareas');
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  editTask(id: number): void {
    this.router.navigate(['/task-edit', id]);
  }

  deleteTask(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          alert('Tarea eliminada');
          this.loadTasks(); // Recarga la lista después de eliminar
        },
        error: (err) => {
          alert(err.error?.message || 'Error al eliminar tarea');
          console.error(err);
        }
      });
    }
  }

  addTask(): void {
    this.router.navigate(['/task/task-create']);
  }
}
