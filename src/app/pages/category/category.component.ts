import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/categoryService';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgIf
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  subCategories: any;
  private categoryTitle: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryTitle = this.route.snapshot.paramMap.get('title')!;

    // Fetch the category using the service
    this.categoryService.getSubCategoriesByCategory(this.categoryTitle).subscribe(cats => {
      this.subCategories = cats;
    });
  }

  goToProductPage(imageId: string) {
    this.router.navigate([`/${(this.categoryTitle)}/${imageId}`]);
  }
}
