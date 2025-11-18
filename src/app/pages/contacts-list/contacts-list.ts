import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contacts-list.html',
  styleUrl: './contacts-list.scss',
})
export class ContactsList {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }
}
