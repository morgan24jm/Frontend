import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,  // 👈 esto lo activa como componente independiente
  imports: [CommonModule], // 👈 importa lo necesario para *ngFor y *ngIf
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'] // si tienes estilos
})

export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  apiUrl = 'http://localhost:5003/tasks';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('⚠️ No estás autenticado');
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
}
