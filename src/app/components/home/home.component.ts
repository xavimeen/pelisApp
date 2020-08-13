import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie } from 'src/app/models/movieResponse.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  populares: Movie[];
  cartelera: Movie[];
  infantiles: Movie[];

  constructor(private _ps: PeliculasService) {

    this.getPeliculas('cartelera');
    this.getPeliculas('populares');
    this.getPeliculas('infantiles');

  }
  
  ngOnInit(): void {
  }

  getPeliculas(genero) {
    this._ps.getPeliculas(genero).subscribe(data => {
      // Si es de cierto género que me guarde en el array correspondiente
      if (genero === 'cartelera') {
        this.cartelera = data;
      }
      if (genero === 'populares') {
        this.populares = data;
      }
      if (genero === 'infantiles') {
        this.infantiles = data;
      }
    })
  }

}
