import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss',
})
export class CategoriesList {
  // Une catégorie = juste un texte trouvé dans "categoryId" des contacts
  categories: string[] = [];

  constructor(private contactService: ContactService) {
    const contacts = this.contactService.getContacts();
    this.categories = [...new Set(contacts.map(c => c.categoryId).filter(c => c))];
  }
}
