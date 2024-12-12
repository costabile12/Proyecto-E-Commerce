//Lista de Productos
const productos = [
    //Remeras
    {
        id:"remera-01",
        titulo:"Remera oversize",
        imagen:"../assets/img/remera_over_destacada.jpeg",
        categoria:{
            nombre:"Remeras",
            id:"remeras",
        },
        precio:27999,
        destacado: true,

    },
    {
        id:"remera-02",
        titulo:"Remera básica",
        imagen:"../assets/img/remera-basica-cuello-u-blanca-gola-marco-polo-1.jpg",
        categoria:{
            nombre:"Remeras",
            id:"remeras",
        },
        precio:24999,
        destacado: true,
    },
    {
        id:"remera-03",
        titulo:"Remera west side",
        imagen:"../assets/img/remera_blanca_estampado.jpg",
        categoria:{
            nombre:"Remeras",
            id:"remeras",
        },
        precio:24999,
        destacado: true,
    },
    {
        id:"remera-04",
        titulo:"Remera chicago bulls",
        imagen:"../assets/img/bulls.png",
        categoria:{
            nombre:"Remeras",
            id:"remeras",
        },
        precio:24999,
        destacado: false,
    },
    {
        id:"remera-05",
        titulo:"Remera Piache Piu",
        imagen:"../assets/img/oversize_negro_piache_piu.jpg",
        categoria:{
            nombre:"Remeras",
            id:"remeras",
        },
        precio:24999,
        destacado: false,

    },

    //Pantalones
    {
        id:"pantalon-01",
        titulo:"Pantalon jean",
        imagen:"../assets/img/pantalon_jean_desgastado.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones",
        },
        precio:24999,
        destacado:false,
    },
    {
        id:"pantalon-02",
        titulo:"Remera Piache Piu",
        imagen:"../assets/img/Pantalon-hombre-jean-ares-azul-hielo.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones",
        },
        precio:24999,
        destacado:true,
    },
    {
        id:"pantalon-03",
        titulo:"Cargo",
        imagen:"../assets/img/cargo_negro.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones",
        },
        precio:24999,
        destacado:false,

    },
    //Bermudas
    {
        id:"bermuda-01",
        titulo:"Bermuda de jogging",
        imagen:"../assets/img/bermuda-rash.jpg",
        categoria:{
            nombre:"Bermudas",
            id:"bermudas",
        },
        precio:17999,
        destacado:false,

    },
    //Camisas
    {
        id:"camisa-01",
        titulo:"Camisa lobisón",
        imagen:"../assets/img/camisa_blanca.jpg",
        categoria:{
            nombre:"Camisas",
            id:"camisas",
        },
        precio:29999,
        destacado: false,
    },
    {
        id:"camisa-02",
        titulo:"Camisa Hawaiana",
        imagen:"../assets/img/camisa_hawaiana.jpg",
        categoria:{
            nombre:"Camisas",
            id:"camisas",
        },
        precio:29999,
        destacado: true,
    },
    //Musculosas
    {
        id:"musculosa-01",
        titulo:"Musculosa Lobisón",
        imagen:"../assets/img/musculosa.jpg",
        categoria:{
            nombre:"Musculosas",
            id:"musculosa",
        },
        precio:19999,
        destacado: false,
    },
    
]



// Función para cargar productos por categoría
function cargarProductosPorCategoria(categoriaId, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ""; // Limpiamos el contenedor

    // Filtrar productos por la categoría
    const productosFiltrados = productos.filter(
        producto => producto.categoria.id === categoriaId
    );

    // Crear las cartas
    productosFiltrados.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}" />
            <h3>${producto.titulo}</h3>
            <p>Precio: $${producto.precio}</p>
        `;
        contenedor.appendChild(card);
    });
}

// Función para cargar productos destacados
function cargarProductosDestacados(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ""; // Limpiamos el contenedor

    // Filtrar productos destacados
    const productosDestacados = productos.filter(producto => producto.destacado);

    // Crear las cartas
    productosDestacados.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("producto_card");
        card.innerHTML = `<a href="${producto.url}"><img src="${producto.imagen}" alt="${producto.titulo}" loading="lazy"></a>
                    <div class="container_description">
                        <h3>${producto.titulo}</h3>
                        <span class="precio">$${producto.precio}</span>
                        <a href="${producto.url}"><button>COMPRAR</button></a>
                    </div>    
                </div>
        `;
        contenedor.appendChild(card);
    });
}

// Cargar productos dinámicamente según la página
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("contenedor-destacados")) {
        cargarProductosDestacados("contenedor-destacados");
    }
    if (document.getElementById("contenedor-productos-remeras")) {
        cargarProductosPorCategoria("remeras", "contenedor-productos-remeras");
    }
    if (document.getElementById("pantalonesContainer")) {
        cargarProductosPorCategoria("pantalones", "pantalonesContainer");
    }
    if (document.getElementById("bermudasContainer")) {
        cargarProductosPorCategoria("bermudas", "bermudasContainer");
    }
    if (document.getElementById("camisasContainer")) {
        cargarProductosPorCategoria("camisas", "camisasContainer");
    }
    if (document.getElementById("musculosaContainer")) {
        cargarProductosPorCategoria("musculosa", "musculosaContainer");
    }
});






