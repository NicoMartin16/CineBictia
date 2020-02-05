const url = "https://api.themoviedb.org/3/movie/";
const key = "7213f5c4de4ace8678af7d15f16a07b8";
const image = "http://image.tmdb.org/t/p/w500/";
const contenedor = document.querySelector("#peliculas_cartelera");
const contenedor2 = document.querySelector("#peliculas_proximos");
const btnLogin = document.querySelector('#boton-ingresar');
const menu = document.querySelector('.menu');
const login = document.querySelector('#login');
localStorage.setItem('user', 'nicolasfelipemartin@hotmail.com');
localStorage.setItem('password', 'nicolas123');


if(btnLogin){
    btnLogin.addEventListener('click', function(){
        let usuario = document.querySelector('#username').value;
        let pass = document.querySelector('#password').value;   
        if(usuario == localStorage.getItem('user') && pass == localStorage.getItem('password') ){
            alert('Ingreso exitoso');
            login.remove();
            localStorage.setItem('username', usuario);
            location.reload();
        } else {
            alert('Datos incorrectos');
        }
    })
}

if(localStorage.getItem('username')){
    login.remove();
    menu.innerHTML += `<a id='cerrar-sesion'>Cerrar sesión</a>`
    menu.innerHTML = menu.innerHTML + `<p>Bienvenido usuario: ${localStorage.getItem('username')}</p>`
    let cerrar = document.querySelector('#cerrar-sesion');
    cerrar.addEventListener('click', function(){
        localStorage.removeItem('username');
        location.reload();
    })
}

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


