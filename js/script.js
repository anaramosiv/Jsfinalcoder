// window.onload = function() {

//Array para carrito
let miCarrito = [];

//Array de servicios para "comprar"
const servicios = [{
        id: 1,
        servicio: "Extensiones de pestañas clasicas",
        precio: 1250,
        duracionHoras: 2,
        pxP: 1,
        efecto: "Natural, alarga tus pestañas naturales",
        url: 'img/1d.jpg'

    },
    {
        id: 2,
        servicio: "Extensiones de pestañas volumen",
        precio: 1850,
        duracionHoras: 2.5,
        pxP: 3,
        efecto: "Acentuado, realza tus pestañas y le da intensidad a la mirada",
        url: 'img/volumen.jpg'
    },
    {
        id: 3,
        servicio: "Extensiones de pestañas volumen ruso",
        precio: 2200,
        duracionHoras: 3,
        pxP: 6,
        efecto: "Súper dramático",
        url: 'img/ruso.jpg'
    },
    {
        id: 4,
        servicio: "Lifting de pestañas",
        precio: 1000,
        duracionHoras: 1.5,
        pxP: 0,
        efecto: "Natural, realza la curvatura de tu pestaña natural",
        url: 'img/lifting.jpg'
    },
    {
        id: 5,
        servicio: "Microblading",
        precio: 6000,
        duracionHoras: 3,
        pxP: 0,
        efecto: "Cejas bien definidas, con relleno en zonas poco pobladas, aspecto natural",
        url: 'img/microblading.jpg'
    },
    {
        id: 6,
        servicio: "Perfilado de cejas + Henna",
        precio: 1000,
        duracionHoras: 0.5,
        pxP: 0,
        efecto: "Cejas con su forma natural acentuada",
        url: 'img/henna.jpg'
    },
];

// Ciclo para que agregue cards de servicios, tantas como arrays de servicios tenga//
for (let i = 0; i < servicios.length; i++) {

    const parrafo1 = document.createElement('p');
    parrafo1.textContent = `Duración horas: ${servicios[i].duracionHoras}`
    parrafo1.classList.add('card-text', 'tiempo')
    parrafo1.id = 'p1';

    const parrafo2 = document.createElement('p');
    parrafo2.textContent = `Efecto:${servicios[i].efecto}`;
    parrafo2.classList.add('card-text', 'efecto');
    parrafo2.id = 'p2';

    const parrafo3 = document.createElement('p');
    parrafo3.textContent = `Precio: $ ${servicios[i].precio}`;
    parrafo3.classList.add('card-text', 'precio');
    parrafo3.id = 'p3';

    const tittleCard = document.createElement('h5');
    tittleCard.textContent = `${servicios[i].servicio}`;
    tittleCard.classList.add('card-title', 'nombreServicio');
    tittleCard.id = 'tittleC';

    const addCarr = document.createElement('a');
    addCarr.classList.add('btn', 'btn-primary', `añadirCarrito${i}`)
    addCarr.textContent = `Añadir al carrito`;
    addCarr.id = 'addCarr';

    //Crear el div que contiene esos textos
    const divText = document.createElement('div');
    divText.classList.add('card-body', 'textosCards')

    //agregar los parrafos anteriormente creados:
    divText.appendChild(tittleCard);
    divText.appendChild(parrafo1);
    divText.appendChild(parrafo2);
    divText.appendChild(parrafo3);
    divText.appendChild(addCarr);

    //ahora se agrega una imagen, que no estaba creada
    const imagenCard = document.createElement('img');
    imagenCard.src = `${servicios[i].url}`;
    imagenCard.classList.add('img-fluid');


    //Ahora creamos la card, contenedora de todo
    const cardCompleta = document.createElement('div');
    cardCompleta.classList.add('card', 'cardService');
    cardCompleta.id = 'cardService';

    //Asignar la imagen y el div  que ya estan creados
    cardCompleta.appendChild(imagenCard);
    cardCompleta.appendChild(divText);

    const contenedor = document.querySelector('.contenedorCards');
    contenedor.appendChild(cardCompleta);

    //Evento del carrito, igualmente dentro del for para que tome todos
    const btnCarrito = document.querySelector(`.añadirCarrito${i}`);
    const carrito = () => {
        const serviciosCarrito = {
            id: `${servicios[i].id}`,
            servicio: `${servicios[i].servicio}`,
            precio: `${servicios[i].precio}`,
            duracionHoras: `${servicios[i].precio}`,
            pxP: `${servicios[i].pxP}`,
            efecto: `${servicios[i].efecto}`,
            url: `${servicios[i].url}`,
            cantidad: 1

        }
        const existe = miCarrito.some(servicio => servicio.id === serviciosCarrito.id);
       if(existe){
           const miServicio = miCarrito.map(servicio =>{
                if(servicio.id === serviciosCarrito.id){
                servicio.cantidad++;
                return servicio;
            }else{
                return servicio;
            }
        });

       }else{
           miCarrito.push(serviciosCarrito);

       }

        console.log(serviciosCarrito);
     
        // console.log(`Añadiste ${servicios[i].servicio}`)
        console.log(miCarrito);
        carritoHTML();
 
    }
    //Evento para que agregue al carrito//
    btnCarrito.addEventListener('click', carrito);
}

////------- Añadiendo cosas al carrito-------////////

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBoton = document.querySelector('#vaciarCarrito')

//Funcion para eliminar elementos del carrito
const eliminarProducto = (id) => {
    const producto = miCarrito.find((producto) => producto.id === id);
    const index = miCarrito.indexOf(producto);
    miCarrito.splice(index, 1);
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //elimina el array anterior (limpia HTML para agregar el nuevo array de productos agregados)
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    miCarrito.forEach(servicio => {

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src = "${servicio.url}" width="100">
        </td>
        <td>${servicio.servicio}</td>
        <td>$${servicio.precio}</td>
        <td>${servicio.cantidad}</td>
        <td>
        <button class="btn btn-danger" onclick="eliminarProducto(${servicio.id})">X</button>    
     
        </td>

        `;
        contenedorCarrito.appendChild(row)

        //Almacena  el carrito en el localStorage
        miCarritoStorage ();
         
        //Muestra lo almacenado el local storage del carrito
        document.addEventListener('DOMContentLoaded', () => { 
         miCarrito = JSON.parse(localStorage.getItem('carrito') ) || [];
            carritoHTML();

        });

            

        //Vaciar el Array y el HTML del carrito
        vaciarCarritoBoton.addEventListener('click', () => {
            miCarrito = [];
            limpiarHTML();
        });
              
    });
}

function miCarritoStorage (){
    localStorage.setItem('carrito', JSON.stringify(miCarrito));
}

//Elimina los arrays anteriores del tbody para que no se repitan cuando agregamos nuevos productos
function limpiarHTML() {
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}

// ---------Seccion de nombre en home-----------

//Pedir nombre para saludar a la persona que visita la pagina (Jquuery)//
let tomarNombre = ""
$("#formulario").submit(function (e) {
    //Prevenimos el comportamiento de submit 
    e.preventDefault();

    let input = $('input');

    tomarNombre = $(input).val();

    $(".seccionPortada").prepend(`<p class"Saludo">Hola ${tomarNombre} es un gusto atenderte</p>`);

    //Almacenar el nombre en localStorage para reutilizarlo//
    localStorage.setItem("nombre", tomarNombre);

});

//   Evento para desaparecer el formulario
$('#btn-submit').click(function () {
    //Animacion FadeOut//
    $(this).parent().fadeOut(500)
})

// ----------------  Evento para seleccionar el tipo de pestaña adecuada ------------

const imagenes = document.querySelector('#eyes');
const contenedorResult = document.querySelector('#result');

const imgs = [{
   id: 'eye1',
   url: 'img/natural.jpg',
   nombre: 'Natural Eyes',

},
{
    id: 'eye2',
    url: 'img/doll.jpg',
    nombre: 'Doll Eyes',
},
{
    id: 'eye3',
    url: 'img/open.jpg',
    nombre: 'Open Eyes',
},
{
    id: 'eye4',    
    url: 'img/cat.jpg',
    nombre: 'Cat Eyes',
},
];

imgListener();
function imgListener(){

    imagenes.addEventListener('click', mostrarLash);{ 
        
    }};
    
    function mostrarLash(e){
        const img = e.target.id;
        const imgSeleccionada = imgs.find(imagen => imagen.id === img);
        contenedorResult.innerHTML = `<img src="${imgSeleccionada.url}" alt="">`;
        contenedorResult.innerHTML += `<h3>El estilo que mejor te iría es:<br> ${imgSeleccionada.nombre}</h3>`;  
    };
// };



 async function consultarAPI () {
    //consulta a la API jsonplaceholder
    let respuesta = await fetch('https://jsonplaceholder.typicode.com/comments');
    let comentarios = await respuesta.json();
    console.log( comentarios)
    console.log ('id:',comentarios[0].id)
    console.log ('nombre:',comentarios[0].name)
    console.log ('comentario:', comentarios[0].body)

}

consultarAPI();