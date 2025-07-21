import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { CatBreed, CatSearchParams } from '../../models/cat.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  breeds: CatBreed[] = [];
  filteredBreeds: CatBreed[] = [];
  searchTerm = '';
  loading = false;
  error = '';
  displayedColumns: string[] = ['name', 'origin', 'lifeSpan', 'temperament', 'intelligence', 'energyLevel'];

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.loadAllBreeds();
  }

  loadAllBreeds(): void {
    this.loading = true;
    this.catService.getBreeds().subscribe({
      next: (breeds: CatBreed[]) => {
        this.breeds = breeds;
        this.filteredBreeds = breeds;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Error loading breeds';
        this.loading = false;
        console.error('Error loading breeds:', error);
      }
    });
  }

  searchBreeds(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBreeds = this.breeds;
      return;
    }

    this.loading = true;
    const searchParams: CatSearchParams = {
      q: this.searchTerm.trim(),
      attach_breed: 1
    };

    this.catService.searchBreeds(searchParams).subscribe({
      next: (breeds: CatBreed[]) => {
        this.filteredBreeds = breeds;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Error searching breeds';
        this.loading = false;
        console.error('Error searching breeds:', error);
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredBreeds = this.breeds;
    this.error = '';
  }

  getTemperamentList(temperament: string): string[] {
    return temperament.split(',').map(t => t.trim());
  }
} 