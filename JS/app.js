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
            <a href="${url}"><img src="${producto.imagen}" alt="${producto.titulo}" loading="lazy"></a>
            <div class="container_description">
                <h3>${producto.titulo}</h3>
                <span class="precio">$${producto.precio}</span>
                <a href="${url}"><button id="${producto.id}>COMPRAR</button></a>
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
            <a href="${url}"><img src="${producto.img_destacado}" alt="${producto.titulo}" loading="lazy"></a>
            <div class="container_description">
                <h3>${producto.titulo}</h3>
                <span class="precio">$${producto.precio}</span>
                <a href="${url}"><button id="${producto.id}">COMPRAR</button></a>
            </div>    
        `;
        contenedor.appendChild(card);
    });
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

//Funcio para validar un formulario
function validarFormulario(formularioID) {
    const nombre = document.getElementById("name").value; // Añadir .value para obtener el valor del input
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;
    const password1 = document.getElementById("contraseña1").value;
    const password2 = document.getElementById("contraseña2").value;
    const telefono = document.getElementById("telefono").value;

    const contenedorErrores = document.getElementById("errores");

    const regexNombre = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPhone = /^\+?(\d{1,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let esValido = true;
    
    // Limpiar errores previos
    contenedorErrores.innerHTML = "";

    // Validación de nombre
    if (!regexNombre.test(nombre)) {
        console.log("El campo de nombre es invalido");
        let error = document.createElement("li");
        error.className = "Mensaje_de_error";
        error.textContent = "El campo de nombre es inválido: solo se permiten letras, espacios, apostrofes y guiones";
        contenedorErrores.appendChild(error);
        esValido = false;
    }

    // Validación de email
    if (!regexEmail.test(email)) {
        console.log("El campo de email es invalido");
        let error = document.createElement("li");
        error.className = "Mensaje_de_error";
        error.textContent = "El campo de email es inválido";
        contenedorErrores.appendChild(error);
        esValido = false;
    }

    // Validación de mensaje
    if (mensaje.length < 10) {
        console.log("El campo de mensaje es invalido");
        let error = document.createElement("li");
        error.className = "Mensaje_de_error";
        error.textContent = "El campo de mensaje es invalido por ser demasiado corto, mínimo 10 caracteres";
        contenedorErrores.appendChild(error);
        esValido = false;
    }

    // Validación de teléfono
    if (!regexPhone.test(telefono)) {
        console.log("El campo de telefono es invalido");
        let error = document.createElement("li");
        error.className = "Mensaje_de_error";
        error.textContent = "El campo de telefono es invalido";
        contenedorErrores.appendChild(error);
        esValido = false;
    }

    // Validación de contraseña
    if (!regexPassword.test(password1)) {
        console.log("El campo de contraseña es invalido");
        let error = document.createElement("li");
        error.className = "Mensaje_de_error";
        error.textContent = "El campo de contraseña es invalido: mínimo 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial";
        contenedorErrores.appendChild(error);
        esValido = false;
    }

    // Validación de confirmación de contraseña
    if (!regexPassword.test(password2)) {
        console.log("El campo de confirmar contraseña es invalido");
        let error = document.createElement("li");
        error.className = "Mensaje_de_error";
        error.textContent = "El campo de confirmar contraseña es invalido: mínimo 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial";
        contenedorErrores.appendChild(error);
        esValido = false;
    }

    // Validación de que las contraseñas coincidan
    if (password1 !== password2) {
        console.log("Las contraseñas no son iguales");
        let error = document.createElement("li");
        error.className = "Mensaje_de_error";
        error.textContent = "Verificar que las contraseñas sean iguales";
        contenedorErrores.appendChild(error);
        esValido = false;
    }

    if (esValido) {
        console.log("Formulario verificado");
    }

    return esValido;
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


    // Llamar a la función validarFormulario
    const formulario = document.getElementById("formularioID"); // Suponiendo que tienes un formulario con este id
    if (formulario) {
        formulario.addEventListener("submit", (event) => {
            event.preventDefault();  // Evitar que el formulario se envíe si no es válido
            if (validarFormulario(formulario.id)) {
                // Si es válido, puedes proceder con el envío del formulario
                formulario.submit();  // O cualquier otra acción que desees realizar
            }
        });
    }
    


});




