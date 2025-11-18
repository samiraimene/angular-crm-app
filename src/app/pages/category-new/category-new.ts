import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-new.html',
  styleUrl: './category-new.scss',
})
export class CategoryNew {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const name = this.form.value.name.trim();
    if (!name) return;

    // On redirige simplement – la catégorie se crée en créant un contact
    this.router.navigate(['/contacts/new'], {
      queryParams: { category: name },
    });
  }
}
