import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movieResponse.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  // buscar va a hacer siempre lo que sea mi input form
  buscar: string= "";
  peliculas: Movie[];
  loading: boolean = false;

  // Se fija si los parametros de la ruta tienen un texto, entonces realiza la búsqueda
  constructor(private _ps: PeliculasService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if(params['texto']) {
        this.buscar = params['texto'];
        this.buscarPelicula(params['texto']);
      }
    });
  }

  ngOnInit(): void {
  }

  // Usar películas o loading?
  buscarPelicula(termino: string) {
    if (termino != '') {
      this._ps.buscarPelicula(termino).subscribe( resp => {
        this.loading = true;
        this.peliculas = resp
        console.log(resp);
      })
    }
  }

}
