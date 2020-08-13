import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {
  
  urlImg: string = 'https://image.tmdb.org/t/p/w500/';

  transform(peli: any, poster: boolean = false): string {

    if(poster) {
      if(peli.poster_path) {
        return this.urlImg+peli.poster_path;
      }
    }

    if (peli.backdrop_path) {
      return this.urlImg+peli.backdrop_path;
    } else if(peli.poster_path) {
      return this.urlImg+peli.poster_path;
    } else return '/assets/img/NoImage.png';
    
    // return (peli.backdrop_path) ? this.urlImg+peli.backdrop_path : '/assets/img/NoImage.png';
  }

}
