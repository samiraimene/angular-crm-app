import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private storageKey = 'contacts';

  getContacts(): Contact[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? (JSON.parse(data) as Contact[]) : [];
  }

  private saveContacts(list: Contact[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  create(contact: Contact): void {
    const contacts = this.getContacts();
    const now = new Date().toISOString();

    const newContact: Contact = {
      ...contact,
      id: this.newId(),
      favorite: false,
      createdAt: now,
      updatedAt: now,
    };

    contacts.push(newContact);
    this.saveContacts(contacts);
  }

  update(contact: Contact): void {
    const now = new Date().toISOString();
    const contacts = this.getContacts().map((c) =>
      c.id === contact.id ? { ...contact, updatedAt: now } : c
    );
    this.saveContacts(contacts);
  }

  delete(id: string): void {
    const contacts = this.getContacts().filter((c) => c.id !== id);
    this.saveContacts(contacts);
  }

  toggleFavorite(id: string): void {
    const contacts = this.getContacts().map((c) =>
      c.id === id ? { ...c, favorite: !c.favorite } : c
    );
    this.saveContacts(contacts);
  }

  private newId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
