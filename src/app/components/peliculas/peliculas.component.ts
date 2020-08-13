import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movieResponse.model';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styles: [
  ]
})
export class PeliculasComponent implements OnInit {

  @Input('peliculas') peliculas: Movie[];
  @Input('titulo') titulo: String;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verInfoPeli(idPeli: number) {
    this.router.navigate(['/pelicula',idPeli,'home']);
  }

}
