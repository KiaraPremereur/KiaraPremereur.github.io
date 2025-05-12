import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {Structure} from '../../models/models';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';
import {CategoryService} from '../../service/categoryService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  structureData: any;

  constructor(private http: HttpClient, private router: Router, private categoryService: CategoryService) {}


  // ngOnInit(): void {
  //   this.http.get<Structure>('assets/structure.json')
  //     .subscribe(data => {
  //       this.structureData = data;
  //     });
  // }
  ngOnInit(): void {
    this.categoryService.getStructure().subscribe(data => {
      this.structureData = data;
    });
  }

  openCategory(category: string): void {
    this.router.navigate([category]);
  }
}
