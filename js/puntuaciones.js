var json;
var json2;
var idPeliculas = [];
var todasPeliculas = [];

var titulosPeliculas = [];
var votosPeliculas = [];

window.onload = function () {
    LecturaJson();
    asignarEventos();
    cargarGrafico();
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

    for (var i in json2) {
        idPeliculas.push(i);
    }
    
    for (var i = 0; i < idPeliculas.length; i++) {
        var pelicula = localStorage.getItem(idPeliculas[i]);
        pelicula = JSON.parse(pelicula);

        todasPeliculas.push(pelicula);

        titulosPeliculas.push(pelicula[0]);
        votosPeliculas.push(pelicula[1]);
    }
}

function cargarGrafico() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'titulo');
        data.addColumn('number', 'Votaciones');

        for( var i = 0; i < titulosPeliculas.length; i++){
            data.addRow([titulosPeliculas[i], votosPeliculas[i]]);
        }        

        var options = {
            title: 'Votaciones al Óscar'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}

function cargarGrafico2() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'titulo');
        data.addColumn('number', 'Votaciones');

        for( var i = 0; i < titulosPeliculas.length; i++){
            data.addRow([titulosPeliculas[i], votosPeliculas[i]]);
        }

        var options = {
            title: 'Votaciones al Óscar',
            chartArea: {
                width: '50%'
            },
            hAxis: {
                title: 'Total Votos',
                minValue: 0
            },
            vAxis: {
                title: 'Titulos'
            }
        };

        var chart = new google.visualization.BarChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}

function cargarGrafico3() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'titulo');
        data.addColumn('number', 'Votaciones');

        for( var i = 0; i < titulosPeliculas.length; i++){
            data.addRow([titulosPeliculas[i], votosPeliculas[i]]);
        }

        var options = {
            title: 'Votaciones al Óscar',
            vAxis: {
                title: 'Votos'
            },
            hAxis: {
                title: 'Fecha'
            },
            seriesType: 'bars',
            series: {
                5: {
                    type: 'line'
                }
            }
        };

        var chart = new google.visualization.ComboChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }
}

function asignarEventos() {
    var $botones = $('button');

    $($botones[0]).on('click', function () {
        cargarGrafico();
    })

    $($botones[1]).on('click', function () {
        cargarGrafico2();
    })

    $($botones[2]).on('click', function () {
        cargarGrafico3();
    })

    $($botones[3]).on('click', function () {
        location.href = ('../index.html');
    })
}