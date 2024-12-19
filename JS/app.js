//Lista de Productos
let productos = [];

// Función para cargar el archivo JSON
async function cargarProductosDesdeJSON() { 
    try {
        const response = await fetch("../JS/productos.json");
        if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
        productos = await response.json();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Función para cargar productos por categoría
function cargarProductosPorCategoria(categoriaId, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ""; // Limpiamos el contenedor

    const productosFiltrados = productos.filter(
        (producto) => producto.categoria.id === categoriaId && producto.disponible
    );

    productosFiltrados.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("producto_card");
        const url = `/productos/${producto.id}`;
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}" loading="lazy">
            <div class="container_description">
                <h3>${producto.titulo}</h3>
                <span class="precio">$${producto.precio}</span>
                <div class="contenedorBotones">
                    <button class="btnDescripcion" id="btn_${producto.id}" onclick="mostrarDescripcion('${producto.id}')">Abrir descripción</button>
                    <button onclick="openProductDetails(${producto.id})">COMPRAR</button>
                </div>
                <p class="descripcion" id="descripcion_${producto.id}" style="display:none;">${producto.descripcion}</p>
            </div>    
         
        `;
        contenedor.appendChild(card);
    });
}

// Función para cargar productos destacados
function cargarProductosDestacados(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ""; // Limpiamos el contenedor

    const productosDestacados = productos.filter(
        (producto) => producto.destacado && producto.disponible
    );

    productosDestacados.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("producto_card");
        const url = `/productos/${producto.id}`;
        card.innerHTML = `
            <img src="${producto.img_destacado}" alt="${producto.titulo}" loading="lazy">
            <div class="container_description">
                <h3>${producto.titulo}</h3>
                <span class="precio">$${producto.precio}</span>
                <div class="contenedorBotones">
                    <button class="btnDescripcion" id="btn_${producto.id}" onclick="mostrarDescripcion('${producto.id}')">Abrir descripción</button>
                    <button onclick="openProductDetails(${producto.id})">COMPRAR</button></a>
                </div>
                <p class="descripcion" id="descripcion_${producto.id}" style="display:none;">${producto.descripcion}</p>
            </div>    
        
        `
        ;
        contenedor.appendChild(card);
    });
}

// Función para mostrar la descripción del producto
function mostrarDescripcion(productoId) {
    const descripcion = document.getElementById(`descripcion_${productoId}`);
    const boton = document.getElementById(`btn_${productoId}`);

    if (descripcion.style.display === "none") {
        descripcion.style.display = "block";
        boton.textContent = "Cerrar descripción"; // Cambiar texto del botón
    } else {
        descripcion.style.display = "none";
        boton.textContent = "Abrir descripción"; // Restaurar texto del botón
    }
}

//Funcion mostrar en consola productos disponibles
function mostrarDisponibles() {
    const productosDisponibles = [];
    
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].disponible === true) {
            productosDisponibles.push(productos[i].titulo); // Agregar solo el título al array
        }
    }

    console.log("Los productos disponibles son:");
    productosDisponibles.forEach(productoDisponible => {
        console.log(productoDisponible);
    });
}

// Función para validar un formulario de contacto
function validarFormularioContacto(formularioId) {
    const nombre = document.getElementById("name").value.trim(); // Añadir .value para obtener el valor del input
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const contenedorErrores = document.getElementById("errores");

    //Expreciones regulares
    const regexNombre = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    let esValido = true;
    
    // Limpiar errores previos
    contenedorErrores.innerHTML = "";

    // Validación de nombre
    if (!regexNombre.test(nombre)) {
        console.log("El campo de nombre es invalido");
        let error = document.createElement("li");
        error.className = "Mensaje_de_error";
        error.textContent = "El campo de nombre es inválido: solo se permiten letras, espacios, apostrofes y guiones";
        error.style.fontSize = "10px"
        contenedorErrores.appendChild(error);
        esValido = false;
    }

    // Validación de email
    if (!regexEmail.test(email)) {
        console.log("El campo de email es invalido");
        let error = document.createElement("li");
        error.className = "Mensaje_de_error";
        error.textContent = "El campo de email es inválido";
        error.style.fontSize = "10px"
        contenedorErrores.appendChild(error);
        esValido = false;
    }

    // Validación de mensaje
    if (mensaje.length < 10) {
        console.log("El campo de mensaje es invalido");
        let error = document.createElement("li");
        error.className = "Mensaje_de_error";
        error.textContent = "El campo de mensaje es invalido por ser demasiado corto, mínimo 10 caracteres";
        error.style.fontSize = "10px"
        contenedorErrores.appendChild(error);
        esValido = false;
    }


    if (esValido) {
        console.log("Formulario verificado");
    }

    return esValido;
}

// Función para abrir una nueva pestaña y pasar el ID del producto
function openProductDetails(productId) {
    // Abre una nueva pestaña con la URL de los detalles del producto, pasando el ID en la URL
    window.open(`detalles-producto.html?id=${productId}`, '_blank');
}


// Inicializar la carga de productos al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    await cargarProductosDesdeJSON();

    mostrarDisponibles();

    if (document.getElementById("contenedor-destacados")) {
        cargarProductosDestacados("contenedor-destacados");
        
    }
    if (document.getElementById("contenedorRemeras")) {
        cargarProductosPorCategoria("remeras", "contenedorRemeras");
    }
    if (document.getElementById("contenedorPantalones")) {
        cargarProductosPorCategoria("pantalones", "contenedorPantalones");
    }
    if (document.getElementById("contenedorBermudas")) {
        cargarProductosPorCategoria("bermudas", "contenedorBermudas");
    }
    if (document.getElementById("contenedorCamisas")) {
        cargarProductosPorCategoria("camisas", "contenedorCamisas");
    }
    if (document.getElementById("contenedorMusculosas")) {
        cargarProductosPorCategoria("musculosas", "contenedorMusculosas");
    }

    if(document.getElementById("contenedorDetallesProducto")){
        verDetallesProducto()
    }

    // Obtener el formulario de contacto por su ID
    const formularioContacto = document.getElementById("formularioContacto");
    if (formularioContacto) {
        formularioContacto.addEventListener("submit", (event) => {
            event.preventDefault(); // Detiene el envío predeterminado del formulario

            // Validar el formulario
            if (validarFormularioContacto()) {
                console.log("Formulario válido, enviando...");
                formularioContacto.submit(); // Envía el formulario si todo está correcto
            } else {
                console.log("Formulario inválido, no se envía.");
            }
        });
    }



    
});




