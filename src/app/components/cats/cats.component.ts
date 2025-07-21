import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { CatBreed, CatImage } from '../../models/cat.model';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {
  breeds: CatBreed[] = [];
  selectedBreed: CatBreed | null = null;
  breedImages: CatImage[] = [];
  currentImageIndex = 0;
  loading = false;
  error = '';

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds(): void {
    this.loading = true;
    this.catService.getBreeds().subscribe({
      next: (breeds: CatBreed[]) => {
        this.breeds = breeds;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Error loading breeds';
        this.loading = false;
        console.error('Error loading breeds:', error);
      }
    });
  }

  onBreedSelect(breedId: string): void {
    this.loading = true;
    this.currentImageIndex = 0;
    this.catService.getBreedById(breedId).subscribe({
      next: (breed: CatBreed) => {
        this.selectedBreed = breed;
        this.loadBreedImages(breedId);
      },
      error: (error: any) => {
        this.error = 'Error loading breed details';
        this.loading = false;
        console.error('Error loading breed:', error);
      }
    });
  }

  loadBreedImages(breedId: string): void {
    this.catService.getImagesByBreedId(breedId, 10).subscribe({
      next: (images: CatImage[]) => {
        this.breedImages = images;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Error loading breed images';
        this.loading = false;
        console.error('Error loading images:', error);
      }
    });
  }

  getTemperamentList(temperament: string): string[] {
    return temperament.split(',').map(t => t.trim());
  }

  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.breedImages.length - 1) {
      this.currentImageIndex++;
    }
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }
} 