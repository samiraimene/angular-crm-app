import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.scss',
})
export class ContactDetail {
  contact: Contact | null = null;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const list = this.contactService.getContacts();
      this.contact = list.find((c) => c.id === id) ?? null;
    }
  }

  delete(): void {
    if (!this.contact) return;
    this.contactService.delete(this.contact.id);
    this.router.navigate(['/contacts']);
  }
}
