var json;
var json2;
var idPelicula
var contadorVotos = 0;
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
    xhttp.open("GET", "../js/peliculas.json", false);
    xhttp.send();
    infoPelicula(json2);
}

function infoPelicula(peliculas) {
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
    infoPagina();
}

function infoPagina() {
    var contenedor = document.getElementById('form-pelicula');
    var imagen = document.createElement('img');
    imagen.setAttribute('src', datosPelicula[0].imagen2);
    imagen.setAttribute('alt', datosPelicula[0].titulo);
    imagen.setAttribute('id', 'pelicula-form');
    imagen.setAttribute('aria-label', datosPelicula[0].titulo);
    contenedor.setAttribute('aria-label', 'Ha seleccionado la película: ' + datosPelicula[0].titulo);
    contenedor.appendChild(imagen);

    var span = document.createElement('span');
    span.textContent = datosPelicula[0].titulo;
    contenedor.appendChild(span);
}

function asignarEventos() {
    var $botones = $('button');

    $($botones[0]).on('click', function () {
        location.href = ('pelicula.html');
    })

    $('form').on('submit', function () {
        sumarPuntuaciones();
    })
}

function sumarPuntuaciones() {
    contadorVotos = localStorage.getItem('idVotos');

    if (contadorVotos == null) {
        contadorVotos = 1;
        localStorage.setItem('idVotos', contadorVotos);
    } else {
        contadorVotos++;
        localStorage.setItem('idVotos', contadorVotos);
    }

    var pelicula = localStorage.getItem(idPelicula);
    pelicula = JSON.parse(pelicula);

    pelicula[1] = pelicula[1] + 1;

    var pelicula2 = [datosPelicula[0].titulo, pelicula[1]];
    localStorage.setItem(idPelicula, JSON.stringify(pelicula2));

    var votante = [$('#txtNombre').val(), $('#txtApellido').val(), $('#txtTelefono').val(), $('#txtCorreo').val(), $('#txtFecha').val(), "Pelicula: " + pelicula[0]];
    localStorage.setItem('Votante-' + contadorVotos, JSON.stringify(votante));

}