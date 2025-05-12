import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/categoryService';
import {NgIf, TitleCasePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgIf,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  imageData: any;
  firstEnded: boolean = false;
  hasSecondAudio: boolean = false;
  hasSecondTip: boolean = false;
  showSecond: boolean = false;
  firstClicked: boolean = false;
  secondClicked: boolean = false;
  newClicked: boolean = false;
  category: string = "";


  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category')!;
    const imageId = this.route.snapshot.paramMap.get('id')!;

    this.categoryService.getImageDataByCategoryAndId(this.category, imageId).subscribe((img) => {
      this.imageData = img;
      this.hasSecondAudio = img.audio2 != null
      this.hasSecondTip = img.tip2 != null
    });
  }

  onShowSecond(): void {
    this.showSecond = true;
    this.newClicked = true
  }

  onFirstAudioPlayed() {
    this.firstEnded = true;
  }

  onFirstAudioClicked() {
    this.firstClicked = true;
  }

  onSecondAudioClicked() {
    this.secondClicked = true;
  }

  onBack() {
    this.router.navigate([`/${(this.category)}`]);
  }
}
