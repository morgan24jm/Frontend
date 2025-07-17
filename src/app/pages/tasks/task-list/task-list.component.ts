import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';  // <-- importa ButtonModule

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ButtonModule],  // <-- añade ButtonModule aquí
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  apiUrl = 'http://localhost:5003/tasks';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('⚠️ No estás autenticado');
      this.router.navigate(['/auth/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
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
}
