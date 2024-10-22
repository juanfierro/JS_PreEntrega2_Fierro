// Declaración de productos y precios
const productos = [
    { nombre: "Flor de Solapa", precio: 10 },
    { nombre: "Centros de mesa", precio: 50 },
    { nombre: "Coronas", precio: 100 },
    { nombre: "Pulseras", precio: 20 },
    { nombre: "Ramos", precio: 60 },
    { nombre: "Estructuras", precio: 200 }
];

// Constantes de descuento y envío
const DESCUENTO = 0.10;
const COSTO_ENVIO = 10;

// Array Constructor para el carrito de compras
let carrito = new Array();
let sesionIniciada = false; // Variable para mantener el estado de la sesión

// Función de inicio de sesión
function iniciarSesion() {
    const usuarioCorrecto = "usuario";
    const contraseñaCorrecta = "pass";
    let intentos = 3;
    let usuario, contraseña;

    do {
        usuario = prompt("Ingrese su usuario:(usuario)");
        contraseña = prompt("Ingrese su contraseña:(pass)");
        if (usuario === usuarioCorrecto && contraseña === contraseñaCorrecta) {
            console.log("Inicio de sesión exitoso.");
            sesionIniciada = true; // Cambiar estado de sesión
            return true;
        } else {
            intentos--;
            alert("Usuario o contraseña incorrectos. Intentos restantes: " + intentos);
        }
    } while (intentos > 0);

    console.log("Se agotaron los intentos.");
    return false;
}

// Función para seleccionar productos y cantidades
function seleccionarProductos() {
    let total = 0;
    let continuar;

    do {
        let seleccion;
        // Bucle para validar selección de producto
        do {
            seleccion = parseInt(prompt("Seleccione un producto:\n1. Flor de Solapa\n2. Centros de mesa\n3. Coronas\n4. Pulseras\n5. Ramos\n6. Estructuras")) - 1;
            if (seleccion < 0 || seleccion >= productos.length || isNaN(seleccion)) {
                alert("Selección de producto inválida. Por favor, ingrese un número entre 1 y 6.");
            }
        } while (seleccion < 0 || seleccion >= productos.length || isNaN(seleccion));

        let cantidad;
        // Bucle para validar cantidad ingresada
        do {
            cantidad = parseInt(prompt("¿Cuántas unidades desea de " + productos[seleccion].nombre + "?"));
            if (cantidad <= 0 || isNaN(cantidad)) {
                alert("Cantidad inválida. Debe ingresar un número positivo.");
            }
        } while (cantidad <= 0 || isNaN(cantidad));

        // Añadir producto al carrito usando Array Constructor
        carrito.push({ producto: productos[seleccion].nombre, cantidad: cantidad, subtotal: productos[seleccion].precio * cantidad });

        total += productos[seleccion].precio * cantidad;
        console.log("Producto: " + productos[seleccion].nombre + ", Cantidad: " + cantidad + ", Subtotal: $" + (productos[seleccion].precio * cantidad));

        // Validación para agregar otro producto
        do {
            continuar = prompt("¿Desea agregar otro producto? (si/no)").toLowerCase();
            if (continuar !== "si" && continuar !== "no") {
                alert("Respuesta inválida. Por favor, ingrese 'si' o 'no'.");
            }
        } while (continuar !== "si" && continuar !== "no");
    } while (continuar === "si");

    return total;
}

// Función para calcular el total con opciones de envío y pago
function calcularTotal() {
    let total = 0;

    // Utilizo forEach para calcular el total del carrito (HOF)
    carrito.forEach(item => {
        total += item.subtotal;
    });

    let envio;
    // Validación de la respuesta correcta de envío
    do {
        envio = prompt("¿Desea envío a domicilio con costo adicional de $10? (si/no)").toLowerCase();
        if (envio !== "si" && envio !== "no") {
            alert("Respuesta inválida. Por favor, ingrese 'si' o 'no'.");
        }
    } while (envio !== "si" && envio !== "no");

    if (envio === "si") {
        total += COSTO_ENVIO;
    }

    let pago;
    // Validación de respuesta correcta de tipo de pago
    do {
        pago = prompt("¿Cómo desea pagar? (1. Tarjeta - Sin descuento, 2. Efectivo - 10% de descuento)").toLowerCase();
        if (pago !== "1" && pago !== "2" && pago !== "tarjeta" && pago !== "efectivo") {
            alert("Respuesta inválida. Por favor, ingrese '1' para Tarjeta o '2' para Efectivo.");
        }
    } while (pago !== "1" && pago !== "2" && pago !== "tarjeta" && pago !== "efectivo");

    if (pago === "2" || pago === "efectivo") {
        let descuento = total * DESCUENTO;
        total -= descuento;
        alert("Pago en efectivo seleccionado. Descuento del 10%. Descuento aplicado: $" + descuento.toFixed(2));
    }

    return total;
}

// Función para mostrar productos en el carrito con filtro (HOF)
function mostrarCarrito() {
    console.log("Productos en el carrito:");

    carrito.forEach(item => {
        console.log("Producto: " + item.producto + ", Cantidad: " + item.cantidad + ", Subtotal: $" + item.subtotal);
    });

    // Filter para productos con subtotal mayor a $500 (HOF)
    let productosCaros = carrito.filter(item => item.subtotal > 500);
    console.log("Productos cuyo subtotal es mayor a $500:");
    productosCaros.forEach(item => {
        console.log(item.producto + " - Subtotal: $" + item.subtotal);
    });
}

// Función para buscar un producto en el carrito
function buscarProducto(nombreProducto) {
    let productoEncontrado = carrito.find(item => item.producto.toLowerCase() === nombreProducto.toLowerCase());

    if (productoEncontrado) {
        let mensaje = "Producto encontrado: " + productoEncontrado.producto + ", Cantidad: " + productoEncontrado.cantidad + ", Subtotal: $" + productoEncontrado.subtotal;
        console.log(mensaje);
        alert(mensaje);  // Mostrar en un alert también
    } else {
        let mensaje = "Producto no encontrado en el carrito.";
        console.log(mensaje);
        alert(mensaje);  // Mostrar en un alert también
    }
}

// Función para gestionar la revisión del carrito
function revisarCarrito() {
    let revisar;
    do {
        revisar = prompt("¿Desea revisar el carrito buscando un producto? (si/no)").toLowerCase();
        if (revisar !== "si" && revisar !== "no") {
            alert("Respuesta inválida. Por favor, ingrese 'si' o 'no'.");
        }
    } while (revisar !== "si" && revisar !== "no");

    while (revisar === "si") {
        let nombreProducto = prompt("Ingrese el nombre del producto que desea buscar en el carrito:");
        buscarProducto(nombreProducto);

        // Preguntar de nuevo si desea revisar el carrito
        do {
            revisar = prompt("¿Desea revisar el carrito buscando otro producto? (si/no)").toLowerCase();
            if (revisar !== "si" && revisar !== "no") {
                alert("Respuesta inválida. Por favor, ingrese 'si' o 'no'.");
            }
        } while (revisar !== "si" && revisar !== "no");
    }
}

// Función para gestionar la continuación de compras
function continuarComprando() {
    let seguirComprando;
    do {
        seguirComprando = prompt("¿Desea volver al catálogo para seguir comprando? (si/no)").toLowerCase();
        if (seguirComprando !== "si" && seguirComprando !== "no") {
            alert("Respuesta inválida. Por favor, ingrese 'si' o 'no'.");
        }
    } while (seguirComprando !== "si" && seguirComprando !== "no");

    return seguirComprando === "si";
}

// Llamada a las funciones principales
function iniciarCompra() {
    if (!sesionIniciada) {
        iniciarSesion();
    }

    let totalCompras = seleccionarProductos();
    mostrarCarrito(); // Mostrar contenido del carrito
    revisarCarrito(); // Función para revisar el carrito

    // Consultar si desea continuar comprando
    if (continuarComprando()) {
        iniciarCompra(); // Volver a iniciar la compra
    } else {
        let totalFinal = calcularTotal();
        alert("Total a pagar: $" + totalFinal.toFixed(2));
        console.log("Total final: $" + totalFinal.toFixed(2));
    }
}

// Iniciar la compra
iniciarCompra();
