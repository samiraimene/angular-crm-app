import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { ContactsList } from './pages/contacts-list/contacts-list';
import { ContactNew } from './pages/contact-new/contact-new';
import { ContactDetail } from './pages/contact-detail/contact-detail';
import { ContactEdit } from './pages/contact-edit/contact-edit';

import { CategoriesList } from './pages/categories-list/categories-list';
import { CategoryNew } from './pages/category-new/category-new';
import { CategoryDetail } from './pages/category-detail/category-detail';

import { Favorites } from './pages/favorites/favorites';

export const routes: Routes = [
  { path: '', component: Dashboard },

  { path: 'contacts', component: ContactsList },
  { path: 'contacts/new', component: ContactNew },
  { path: 'contacts/:id', component: ContactDetail },
  { path: 'contacts/:id/edit', component: ContactEdit },

  { path: 'categories', component: CategoriesList },
  { path: 'categories/new', component: CategoryNew },
  { path: 'categories/:id', component: CategoryDetail },

  { path: 'favorites', component: Favorites },

  { path: '**', redirectTo: '' },
];
