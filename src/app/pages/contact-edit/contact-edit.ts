import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.scss',
})
export class ContactEdit {
  form!: FormGroup;
  contact!: Contact;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    const list = this.contactService.getContacts();
    const found = list.find(c => c.id === id);

    if (!found) return;

    this.contact = found;

    this.form = this.fb.group({
      firstName: [found.firstName, Validators.required],
      lastName: [found.lastName, Validators.required],
      email: [found.email, [Validators.required, Validators.email]],
      phone: [found.phone],
      company: [found.company],
      jobTitle: [found.jobTitle],
      categoryId: [found.categoryId],
      notes: [found.notes],
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const updated: Contact = {
      ...this.contact,
      ...this.form.value,
    };

    this.contactService.update(updated);
    this.router.navigate(['/contacts']);
  }
}
