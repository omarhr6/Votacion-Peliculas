var json;
var json2;
var datosPelicula = [];

window.onload = function () {
    LecturaJson();
    asignarEventos();
    $('body').fadeIn(500);
}

function LecturaJson() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        json = xhttp.responseText;
        json2 = JSON.parse(json);
    };
    xhttp.open("GET", "js/peliculas.json", false);
    xhttp.send();

    infoPelicula(json2);
}

function infoPelicula(peliculas) {
    var idPelicula = localStorage.getItem('idPelicula');

    for (var i in peliculas) {
        if (i == idPelicula) {
            datosPelicula.push(peliculas[i]);
        }
    }
    infoPagina();
}

function infoPagina() {
    var imagen;

    var header = document.getElementById('header');
    imagen = document.createElement('img');
    imagen.setAttribute('src', datosPelicula[0].portada);
    imagen.setAttribute('alt', datosPelicula[0].titulo);
    header.appendChild(imagen);

    var cartelera = document.getElementById('cartelera');
    imagen = document.createElement('img');
    imagen.setAttribute('src', datosPelicula[0].imagen2);
    imagen.setAttribute('alt', datosPelicula[0].titulo);
    imagen.setAttribute('id', 'carteleraPelicula');
    cartelera.appendChild(imagen);

    var spanAño = document.getElementById('span-año');
    spanAño.textContent = datosPelicula[0].año;

    var spanDuracion = document.getElementById('span-duracion');
    spanDuracion.textContent = datosPelicula[0].duracion;

    var spanGeneros = document.getElementById('span-generos');
    spanGeneros.textContent = datosPelicula[0].generos;

    var navder = document.getElementById('nav-der');
    var titulo = document.createElement('h2');
    titulo.textContent = datosPelicula[0].titulo;
    titulo.setAttribute('id', 'tituloPelicula');
    navder.appendChild(titulo);

    var sinopsis = document.createElement('h3');
    sinopsis.textContent = "Sinopsis";
    navder.appendChild(sinopsis);

    var spansinopsis = document.createElement('span');
    spansinopsis.textContent = datosPelicula[0].sinopsis;
    navder.appendChild(spansinopsis);

    var contenedorTrailer = document.getElementById('trailer');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('width', '650');
    iframe.setAttribute('height', '405');
    iframe.setAttribute('src', datosPelicula[0].trailer);
    iframe.setAttribute('title', 'Trailer de la película ' + datosPelicula[0].titulo);
    // iframe.setAttribute('allowfullscreen', 'allowfullscreen');
    contenedorTrailer.appendChild(iframe);
}

function asignarEventos() {
    var $botones = $('button');

    $($botones[0]).on('click', function () {
        location.href = ('../index.html');
    })

    $($botones[1]).on('click', function () {
        votoAnonimo();
    })

    $($botones[2]).on('click', function () {
        location.href = ('form.html');
    })
}

function votoAnonimo() {
    var idPelicula = localStorage.getItem('idPelicula');

    var pelicula = localStorage.getItem(idPelicula);
    pelicula = JSON.parse(pelicula);

    pelicula[1] = pelicula[1] + 1;

    var pelicula2 = [datosPelicula[0].titulo, pelicula[1]];
    localStorage.setItem(idPelicula, JSON.stringify(pelicula2));

    location.href = ('puntuaciones.html');
}