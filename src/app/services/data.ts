import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private contactsKey = 'crm_contacts';
  private categoriesKey = 'crm_categories';

  constructor() {
    this.initStorage();
  }

  // -------------------------
  // INIT STORAGE
  // -------------------------
  private initStorage() {
    if (!localStorage.getItem(this.contactsKey)) {
      localStorage.setItem(this.contactsKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.categoriesKey)) {
      localStorage.setItem(this.categoriesKey, JSON.stringify([]));
    }
  }

  // -------------------------
  // GENERIC GETTERS
  // -------------------------
  getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(this.contactsKey) || '[]');
  }

  getCategories(): Category[] {
    return JSON.parse(localStorage.getItem(this.categoriesKey) || '[]');
  }

  // -------------------------
  // SAVE METHODS
  // -------------------------
  private saveContacts(contacts: Contact[]) {
    localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
  }

  private saveCategories(categories: Category[]) {
    localStorage.setItem(this.categoriesKey, JSON.stringify(categories));
  }

  // -------------------------
  // CONTACTS CRUD
  // -------------------------
  addContact(contact: Contact) {
    const contacts = this.getContacts();
    contacts.push(contact);
    this.saveContacts(contacts);
  }

  updateContact(contact: Contact) {
    const contacts = this.getContacts().map((c) =>
      c.id === contact.id ? contact : c
    );
    this.saveContacts(contacts);
  }

  deleteContact(id: string) {
    const contacts = this.getContacts().filter((c) => c.id !== id);
    this.saveContacts(contacts);
  }

  getContactById(id: string): Contact | undefined {
    return this.getContacts().find((c) => c.id === id);
  }

  // -------------------------
  // CATEGORIES CRUD
  // -------------------------
  addCategory(category: Category) {
    const categories = this.getCategories();
    categories.push(category);
    this.saveCategories(categories);
  }

  updateCategory(category: Category) {
    const categories = this.getCategories().map((c) =>
      c.id === category.id ? category : c
    );
    this.saveCategories(categories);
  }

  deleteCategory(id: string) {
    const categories = this.getCategories().filter((c) => c.id !== id);
    this.saveCategories(categories);
  }

  getCategoryById(id: string): Category | undefined {
    return this.getCategories().find((c) => c.id === id);
  }

  // -------------------------
  // ID GENERATOR
  // -------------------------
  newId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
