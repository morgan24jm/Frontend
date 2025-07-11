import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';  // ajusta la ruta según estructura

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        alert('✅ Usuario registrado correctamente');
        this.router.navigate(['/auth/login']);
        this.isLoading = false;
      },
      error: (err) => {
        alert(err.error?.error || '❌ Error al registrar');
        this.isLoading = false;
      }
    });
  }
}
