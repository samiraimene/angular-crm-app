import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-detail.html',
  styleUrl: './category-detail.scss',
})
export class CategoryDetail {
  categoryId = '';
  contacts: Contact[] = [];

  constructor(private route: ActivatedRoute, private contactService: ContactService) {
    this.categoryId = this.route.snapshot.paramMap.get('id') ?? '';
    this.contacts = this.contactService.getContacts().filter(c => c.categoryId === this.categoryId);
  }
}
