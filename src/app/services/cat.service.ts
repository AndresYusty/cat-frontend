import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatBreed, CatImage, CatSearchParams } from '../models/cat.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private readonly API_KEY = environment.catApiKey;
  private readonly BASE_URL = environment.catApiUrl;

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<CatBreed[]> {
    return this.http.get<CatBreed[]>(`${this.BASE_URL}/breeds`, {
      headers: { 'x-api-key': this.API_KEY }
    });
  }

  getBreedById(breedId: string): Observable<CatBreed> {
    return this.http.get<CatBreed>(`${this.BASE_URL}/breeds/${breedId}`, {
      headers: { 'x-api-key': this.API_KEY }
    });
  }

  searchBreeds(params: CatSearchParams): Observable<CatBreed[]> {
    let httpParams = new HttpParams();
    
    if (params.q) httpParams = httpParams.set('q', params.q);
    if (params.attach_breed) httpParams = httpParams.set('attach_breed', params.attach_breed.toString());
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());

    return this.http.get<CatBreed[]>(`${this.BASE_URL}/breeds/search`, {
      headers: { 'x-api-key': this.API_KEY },
      params: httpParams
    });
  }

  getImagesByBreedId(breedId: string, limit: number = 10): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(`${this.BASE_URL}/images/search`, {
      headers: { 'x-api-key': this.API_KEY },
      params: {
        breed_ids: breedId,
        limit: limit.toString()
      }
    });
  }
} 