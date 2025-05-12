import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private structureData: any;

  constructor(private http: HttpClient) {}

  // Fetch the entire structure once and cache it
  getStructure(): Observable<any> {
    if (this.structureData) return of(this.structureData);

    return this.http.get<any>('assets/structure.json').pipe(
      tap(data => {
        this.structureData = data;
      })
    );
  }

  // Get a specific subcategory
  getSubCategoriesByCategory(categoryTitle: string): Observable<any> {
    return this.getStructure().pipe(
      map((data) => {
        // Find the category by title
        const category = data.categories.find(
          (cat: any) => cat.title.toLowerCase() === categoryTitle.toLowerCase()
        );

        if (category) {
          // Return the subcategories for the found category
          return category.subCategories;
        }

        // If category is not found, return an empty array
        return [];
      })
    );
  }

  getImageDataByCategoryAndId(categoryTitle: string, imageId: string): Observable<any> {
    return this.getStructure().pipe(
      map(data => {
        const category = data.categories.find(
          (cat: any) => cat.title.toLowerCase() === categoryTitle.toLowerCase()
        );

        if (!category) return null;

        // Flatten all images from all subcategories
        for (const subCategory of category.subCategories) {
          const image = subCategory.images.find((img: any) => img.id === imageId);
          if (image) return image;
        }

        return null;
      })
    );
  }

}
