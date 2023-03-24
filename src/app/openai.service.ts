import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor(private http: HttpClient) { }

  generateRecipes(ingredients: string[]){
    const params = {
      apiKey: environment.SPOONACULAR_API_KEY,
      ingredients: ingredients.join(','),
      number: 10
    }

    console.log(ingredients)

    return this.http.get('https://api.spoonacular.com/recipes/findByIngredients', { params });
  }
 }
