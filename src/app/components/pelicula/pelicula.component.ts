import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { MovieByIDResponse } from 'src/app/models/movieByIdResponse.model';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  peli: MovieByIDResponse;
  private paramsPag: string;
  private paramsBusqueda: string = '';
// Cuando se cree el constructor, busca la info de la peli por el id que estará en el parámetro de la ruta
  constructor(private route: ActivatedRoute,
              private _ps: PeliculasService,
              private router: Router) {
  
    this.route.params.subscribe( params => {
      console.log(params)
      if(params['busqueda']) {
        this.paramsBusqueda = params['busqueda'];
      }
      this.paramsPag = params['pag']
      this.buscarPeli(params['id']);
    });
  
  }

  ngOnInit(): void {
  }

  buscarPeli(idPeli: string) {
    this._ps.getPelicula(idPeli).subscribe( resp => {
      console.log(resp);
      this.peli = resp;
    })
  }

  volver() {
    // Puedo hacer un if, home o buscar/termino
    if (this.paramsPag === 'home') {
      this.router.navigate([this.paramsPag]);
    } else this.router.navigate([this.paramsPag, this.paramsBusqueda]);
  }

}
