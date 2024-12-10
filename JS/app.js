// Función para validar el formulario
function validarFormulario() {
    // Obtención de los valores de los campos
    const nombre = document.getElementById("nameContacto").value.trim();
    const email = document.getElementById("emailContacto").value.trim();
    const mensaje = document.getElementById("mensajeContacto").value.trim();
    
    // Expresiones regulares para validar
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:[ '-][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Bandera de errores
    let isValid = true;
    
    // Validación del campo "Nombre"
    if (!nombreRegex.test(nombre)) {
        console.log("El campo de nombre es invalido")
        console.error("Error: Nombre inválido. Solo se permiten letras, espacios, apóstrofes y guiones.");
        isValid = false;
    }
    
    // Validación del campo "Email"
    if (!emailRegex.test(email)) {
        console.log("El campo de email es invalido ")
        console.error("Error: Email inválido. Ingrese un correo electrónico en formato correcto.");
        isValid = false;
    }
    
    // Validación del campo "Mensaje"
    if (mensaje.length < 10) {
        console.log("El campo de mensaje es invalido")
        console.error("Error: El mensaje debe tener al menos 10 caracteres.");
        isValid = false;
    }
    
    return isValid;
}
    
// Evento de envío del formulario
document.getElementById("formularioContacto").addEventListener("submit", function (e) {
// Previene el envío del formulario si hay errores
    if (!validarFormulario()) {
        e.preventDefault(); // Detiene el envío si hay errores
        console.warn("El formulario contiene errores. Revise los datos ingresados.");
    } else {
        console.log("Formulario enviado correctamente.");
    }
});