const url = "https://api.themoviedb.org/3/movie/";
const key = "7213f5c4de4ace8678af7d15f16a07b8";
const image = "http://image.tmdb.org/t/p/w500/";
const contenedor = document.querySelector("#peliculas_cartelera");
const contenedor2 = document.querySelector("#peliculas_proximos");

if(contenedor){
    let peliculas = [];
    $.ajax({
      url: `${url}popular?api_key=${key}`,
      method: "GET",
      crossDomain: true,
      success: function(response) {
        peliculas = response.results;
        peliculas.forEach(pelicula => {
            contenedor.innerHTML = contenedor.innerHTML + mostrarPelicula(pelicula)
        })
      }
    });
}
if(contenedor2){
    $.ajax({
        url: `${url}upcoming?api_key=${key}`,
        method: 'GET',
        crossDomain: true,
        success: function(response) {
            peliculas = response.results;
            peliculas.forEach(pelicula => {
                contenedor2.innerHTML = contenedor2.innerHTML + mostrarPelicula(pelicula);
            })
        }
    })
}



function mostrarPelicula(pelicula) {
  return `
    <div class="col-sm-6 col-md-3 pelicula">
        <img class="img-fluid" src="${image}${pelicula.poster_path}" alt="imagen de pelicula en cartelera">
        <a class="horarios" href="#">Ver Horarios</a>
    </div>
    `;
}
