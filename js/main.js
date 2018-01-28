var json;
var json2;
var datosPelicula = [];

window.onload = function () {
    LecturaJson();
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

    crearElementos(json2);
    cargarImagenes(json2);
    CargarLocalStorage(json2);
}


function crearElementos(peliculas) {
    var contadorPeliculas = 0;
    var contenedor = document.getElementById('contenedor');

    for (var i in peliculas) {
        contadorPeliculas++;
        var div = document.createElement('div');
        if (contadorPeliculas < 10) {
            div.setAttribute('id', i);
            div.setAttribute('class', 'contenedores-peliculas');
            contenedor.appendChild(div);
        } else {
            div.setAttribute('id', i);
            div.setAttribute('class', 'contenedores-peliculas');
            contenedor.appendChild(div);
        }
    }
}

function CargarLocalStorage(peliculas) {
    idPelicula = localStorage.getItem('idPelicula');

    for (var i in peliculas) {
        if (i == idPelicula) {
            datosPelicula.push(peliculas[i]);
        }

        if (localStorage.getItem(i) == null) {
            for (var i in peliculas) {
                var pelicula = [peliculas[i].titulo, 0];
                localStorage.setItem(i, JSON.stringify(pelicula));
            }
        }
    }
}

function cargarImagenes(peliculas) {
    var contadorPeliculas = 0;
    var contadorTabIndex = 0;
    var $item;

    for (var i in peliculas) {
        contadorPeliculas++;
        contadorTabIndex++;
        if (contadorPeliculas < 10) {
            var contenedor = document.getElementById('pelicula_0' + contadorPeliculas);
            $('#pelicula_0' + contadorPeliculas).on("click", function (event) {
                $item = event.currentTarget;
                localStorage.setItem('idPelicula', $item.id);
                location.href = 'portfolio/pelicula.html';
            });
            $('#pelicula_0' + contadorPeliculas).on("keydown", function (event) {
                if (event.keyCode === 13) {
                    $item = event.currentTarget;
                    localStorage.setItem('idPelicula', $item.id);
                    location.href = 'portfolio/pelicula.html';
                }
            });
        } else {
            var contenedor = document.getElementById('pelicula_' + contadorPeliculas);
            $('#pelicula_' + contadorPeliculas).on("click", function (event) {
                $item = event.currentTarget;
                localStorage.setItem('idPelicula', $item.id);
                location.href = 'portfolio/pelicula.html';
            });
            $('#pelicula_' + contadorPeliculas).on("keydown", function (event) {
                if (event.keyCode === 13) {
                    $item = event.currentTarget;
                    localStorage.setItem('idPelicula', $item.id);
                    location.href = 'portfolio/pelicula.html';
                }
            });
        }
        var imagenes = document.createElement('img');
        imagenes.setAttribute('src', peliculas[i].imagen);
        imagenes.setAttribute('alt', peliculas[i].titulo);
        imagenes.setAttribute('title', peliculas[i].titulo);
        imagenes.setAttribute('aria-label', peliculas[i].titulo);
        contenedor.setAttribute('tabindex', 0);
        contenedor.setAttribute('aria-label', 'Haz click o pulsa enter para acceder a la información de la película' + peliculas[i].titulo);
        contenedor.appendChild(imagenes);

        var titulo = document.createElement('span');
        titulo.textContent = peliculas[i].titulo;
        contenedor.appendChild(titulo);
    }
}