import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MovieByIDResponse } from '../models/movieByIdResponse.model';
import { MovieResponse } from '../models/movieResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  
  private moviedbUrl: string = 'https://api.themoviedb.org/3';
  private apikey: string = 'tuapikey';

  constructor(private http: HttpClient) { }

  getPeliculas(genero) {

    const url = `${this.moviedbUrl}/discover/movie`;

    const params = this.getParams(genero)
            .set('language', 'es')
            .set('api_key', `${this.apikey}`);

    // El get con el pipe y map para recibir solo el arreglo de pelis y no la data entera
    return this.http.get<MovieResponse>(url, {params})
            .pipe(
              map( (data) => data.results )
            );
  }

  getPelicula(idPeli:string) {

    const url = `${this.moviedbUrl}/movie/${idPeli}`;

    const params = new HttpParams()
            .set('language', 'es')
            .set('api_key', this.apikey);

    return this.http.get<MovieByIDResponse>(url, {params});
  }
  
  buscarPelicula(peli: string) {
    const url = `${this.moviedbUrl}/search/movie`;

    const params = new HttpParams()
            .set('query', peli)
            .set('language', 'es')
            .set('api_key', this.apikey);

    return this.http.get<MovieResponse>(url, {params})
            .pipe(
              map( (data) => data.results )
            );
  }


  

  // Método de ayuda

  // Mando el género y me devuelve los querys que necesito para getPeliculas
  private getParams(genero:string) {
    if( genero === 'populares') {
      return new HttpParams()
              .set('sort_by', 'popularity.desc');
      // return 'sort_by=popularity.desc';
    }

    if (genero === 'cartelera') {
      // Cartelera siempre actualizada
      let desde = new Date();
      let hasta = new Date();
      desde.setDate( desde.getDate() - 7 );
      hasta.setDate( hasta.getDate() + 7 );
      // toISOSString() me devuelve el formato yyyy-mm-dd necesario, Date() solo me devuelve 1 solo dígito en casos del 1 al 9
      let desdeString = desde.toISOString().substring(0,10);
      let hastaString = hasta.toISOString().substring(0,10);
      return new HttpParams()
              .set('primary_release_date.gte', desdeString)
              .set('primary_release_date.lte', hastaString);
      // return `primary_release_date.gte=${desdeString}&primary_release_date.lte=${hastaString}`;
    }

    if (genero === 'infantiles') {
      return new HttpParams()
              .set('certification_country', 'US')
              .set('certification', 'G');
      // return 'certification_country=US&certification=G';
    }
  }


}
