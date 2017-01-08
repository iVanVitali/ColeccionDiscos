/**
 * Created by ivan on 5/1/17.
 */
$(document).ready(function () {
    'use strict';

    function inicializarFirebase() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyD56F21ChhbdbN5xq_n7_XSy78JsiYSmYY",
            authDomain: "coleccion-discos.firebaseapp.com",
            databaseURL: "https://coleccion-discos.firebaseio.com",
            storageBucket: "coleccion-discos.appspot.com",
            messagingSenderId: "368513265481"
        };
        firebase.initializeApp(config);
    }

    inicializarFirebase();

    var ColeccionDiscos = {

        DatabaseService : firebase.database(),
        ruta : "miColeccion",
    };

    const DatabaseService = firebase.database();


    function obtenerDiscoDesdeFormulario($formulario) {
        var disco = {};

        $.each($formulario.serializeArray(), function(indice, elemento) {
            disco[elemento.name] = elemento.value;
        });

        disco.creado = new Date().getTime(); // agregar fecha de ingreso

        return disco;
    }

    function agregarDisco(ruta, disco) {
        var referencia = DatabaseService.ref(ruta);
        referencia.push(disco);
    }

    function resetearFormulario() {
        $("input[type=text]").val("");
        $("input[type=number]").val("");
        $("input[type=radio]").prop("checked", false);
        $('textarea').val("");
    }

    $('form#guardar-disco').submit(function(evento) {
        evento.preventDefault();

        var disco = obtenerDiscoDesdeFormulario($(this));
        agregarDisco('discos', disco);
        resetearFormulario();
    });




    var taza = {
        color:	"blanco",
        altura:	"10cm",
        diametro:	"5cm",
        estampado: "mapa mundo"
    };


    function ObtenerDiscos() {
        var discos = DatabaseService.ref("discos").orderByChild("autor");
        var listaCompletaDiscos = $("#listaDiscos");
        var datosDisco = "";

        console.log("hola");

        discos.on('value', function(snapshot) {
            listaCompletaDiscos.html("");   // poner en blanco al contenedor
            snapshot.forEach(function(disco) {
                // key will be "ada" the first time and "alan" the second time
                var key = disco.key;
                var nombreDisco = disco.child("nombre").val();
                var autorDisco = disco.child("autor").val();
                var anioPublicacion = disco.child("año").val();
                var genero = disco.child("genero").val();

                datosDisco = "";
                datosDisco += "<tr>";
                datosDisco += "<td>"+ nombreDisco + "</td>";
                datosDisco += "<td>"+ autorDisco + "</td>";
                datosDisco += "<td>"+ anioPublicacion + "</td>";
                datosDisco += "<td>"+ genero + "</td>";
                datosDisco += "</tr>";

                listaCompletaDiscos.append(datosDisco);

                console.log("snapshot key: " + key);
                console.log("Nombre del Disco: " + nombreDisco + " Autor: " + autorDisco + " Año: " + anioPublicacion + " Genero: " + genero);

                // childData will be the actual contents of the child
                //childSnapshot.forEach(function(disco) {
                    //var nombreDisco = disco.child("autor").val();
                    //console.log("Autor: " + nombreDisco);
                //});
            });
        });
    }

    ObtenerDiscos();

    var hoy = new Date().getTime();
    // request a weekday along with a long date
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    var fecha = new Date(hoy);

    console.log(taza, fecha.toLocaleDateString('es-AR', options), "hola");
});