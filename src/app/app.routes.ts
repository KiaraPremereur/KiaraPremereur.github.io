import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CategoryComponent} from './pages/category/category.component';
import {ProductComponent} from './pages/product/product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':title', component: CategoryComponent },
  { path: ':category/:id', component: ProductComponent }
];
