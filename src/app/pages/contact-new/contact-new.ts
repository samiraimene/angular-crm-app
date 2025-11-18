import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact';
import { Contact } from '../../models/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-new.html',
  styleUrl: './contact-new.scss',
})
export class ContactNew {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      jobTitle: [''],
      categoryId: [''],
      notes: [''],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const contact: Contact = {
      id: '',
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email,
      phone: v.phone ?? '',
      company: v.company ?? '',
      jobTitle: v.jobTitle ?? '',
      categoryId: v.categoryId ?? '',
      favorite: false,
      notes: v.notes ?? '',
      createdAt: '',
      updatedAt: '',
    };

    this.contactService.create(contact);
    this.router.navigate(['/contacts']);
  }
}
