
function mostrarSeccion(id) {
    const secciones = document.querySelectorAll("main section");

    secciones.forEach(function(seccion) {
        seccion.hidden = true;
    });

    const seleccionada = document.getElementById(id);

    if (seleccionada) {
        seleccionada.hidden = false;
    }
}

const botones = document.querySelectorAll("nav a");

botones.forEach(function(boton) {
    boton.addEventListener("click", function(event) {
        event.preventDefault();

        const destino = boton.getAttribute("href").substring(1);

        mostrarSeccion(destino);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

const botonesInicio = document.querySelectorAll("#inicio button");

botonesInicio[0].addEventListener("click", function() {
    mostrarSeccion("patines");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

botonesInicio[1].addEventListener("click", function() {
    window.open(
        "https://www.youtube.com/results?search_query=patinaje+roller+retro",
        "_blank"
    );
});

const productosPatines = document.querySelectorAll("#patines article");

let carritoPatines = [];

function crearElementoPattini(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta);
    elemento.className = clase;

    if (texto) {
        elemento.textContent = texto;
    }

    return elemento;
}

const botonVerCarrito = crearElementoPattini(
    "button",
    "boton-carrito",
    "🛒 Mi carrito (0)"
);

botonVerCarrito.style.cssText =
    "position:fixed;bottom:20px;right:20px;padding:15px 25px;background:#222;color:white;border:0;border-radius:25px;cursor:pointer;z-index:1000;";

document.body.appendChild(botonVerCarrito);

const ventanaCarrito = document.createElement("dialog");

ventanaCarrito.style.cssText =
    "width:90%;max-width:400px;border:2px solid #222;border-radius:15px;padding:25px;";

const tituloCarritoPatines = crearElementoPattini(
    "h2",
    "",
    "MI CARRITO"
);

const listaPatines = crearElementoPattini("div", "", "");

const totalPatines = crearElementoPattini(
    "h3",
    "",
    "Total: $0.00 USD"
);

const cerrarCarritoPatines = crearElementoPattini(
    "button",
    "",
    "Cerrar"
);

cerrarCarritoPatines.addEventListener("click", function() {
    ventanaCarrito.close();
});

const vaciarCarritoPatines = crearElementoPattini(
    "button",
    "",
    "Vaciar carrito"
);

vaciarCarritoPatines.addEventListener("click", function() {
    carritoPatines = [];
    actualizarCarritoPatines();
});

ventanaCarrito.append(
    tituloCarritoPatines,
    listaPatines,
    totalPatines,
    vaciarCarritoPatines,
    cerrarCarritoPatines
);

document.body.appendChild(ventanaCarrito);

botonVerCarrito.addEventListener("click", function() {
    ventanaCarrito.showModal();
});

function actualizarCarritoPatines() {
    listaPatines.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    carritoPatines.forEach(function(producto, indice) {
        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;

        const elemento = crearElementoPattini(
            "div",
            "",
            producto.nombre +
            " | Talla: " + producto.talla +
            " | Cantidad: " + producto.cantidad +
            " | $" + (producto.precio * producto.cantidad).toFixed(2) + " USD"
        );

        const eliminar = crearElementoPattini(
            "button",
            "",
            "Eliminar"
        );

        eliminar.addEventListener("click", function() {
            carritoPatines.splice(indice, 1);
            actualizarCarritoPatines();
        });

        elemento.appendChild(eliminar);
        listaPatines.appendChild(elemento);
    });

    totalPatines.textContent =
        "Total: $" + total.toFixed(2) + " USD";

    botonVerCarrito.textContent =
        "🛒 Mi carrito (" + cantidadTotal + ")";
}

productosPatines.forEach(function(producto) {
    const botonElegir = producto.querySelector("button");

    botonElegir.addEventListener("click", function() {
        const nombre = producto.querySelector("h2").textContent.trim();

        const precioTexto = producto.querySelector("p").textContent;

        const precio = Number(
            precioTexto.replace(/[^0-9.]/g, "")
        );

        const talla = prompt("Ingresa tu talla de patines:");

        if (talla === null || talla.trim() === "") {
            alert("Debes ingresar una talla.");
            return;
        }

        const cantidad = Number(
            prompt("¿Cuántos pares deseas comprar?")
        );

        if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 20) {
            alert("Ingresa una cantidad entre 1 y 20.");
            return;
        }

        const existente = carritoPatines.find(function(item) {
            return item.nombre === nombre &&
                item.talla === talla.trim();
        });

        if (existente) {
            existente.cantidad += cantidad;
        } else {
            carritoPatines.push({
                nombre: nombre,
                precio: precio,
                talla: talla.trim(),
                cantidad: cantidad
            });
        }

        actualizarCarritoPatines();

        alert("¡" + nombre + " agregado al carrito!");
    });
});

const tarjetasEventos = document.querySelectorAll("#eventos article");

tarjetasEventos.forEach(function(evento) {
    const botonesEvento = evento.querySelectorAll("button");

    const nombreEvento = evento.querySelector("h2").textContent.trim();

    const fechaEvento = evento.querySelectorAll("p")[1].textContent;

    botonesEvento[0].addEventListener("click", function() {
        const nombre = prompt("Ingresa tu nombre para reservar:");

        if (nombre === null || nombre.trim() === "") {
            alert("Debes ingresar tu nombre.");
            return;
        }

        const telefono = prompt("Ingresa tu número de contacto:");

        if (telefono === null || telefono.trim() === "") {
            alert("Debes ingresar un número de contacto.");
            return;
        }

        alert(
            "¡Solicitud de reserva registrada!\n\n" +
            nombreEvento +
            "\n" + fechaEvento +
            "\nNombre: " + nombre +
            "\nTeléfono: " + telefono +
            "\n\nEsta es una demostración de reserva."
        );
    });

    botonesEvento[1].addEventListener("click", function() {
        const cantidad = Number(
            prompt("¿Cuántas entradas deseas solicitar?")
        );

        if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 20) {
            alert("Ingresa una cantidad entre 1 y 20.");
            return;
        }

        const confirmar = confirm(
            "Evento: " + nombreEvento +
            "\nEntradas: " + cantidad +
            "\n\n¿Deseas continuar con la solicitud?"
        );

        if (confirmar) {
            alert(
                "¡Solicitud registrada!\n" +
                "Entradas solicitadas: " + cantidad +
                "\nEsta es una demostración, no un pago real."
            );
        }
    });
});

const formularioContacto = document.querySelector("#contactos form");

formularioContacto.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();

    const correo = document.querySelector("#correo").value.trim();

    const mensaje = document.querySelector("#mensaje").value.trim();

    if (nombre === "" || correo === "" || mensaje === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const campoCorreo = document.querySelector("#correo");

    if (!campoCorreo.checkValidity()) {
        alert("Ingresa un correo electrónico válido.");
        return;
    }

    alert(
        "¡Gracias por contactarnos, " + nombre + "!\n\n" +
        "Tu mensaje ha sido registrado en esta demostración."
    );

    formularioContacto.reset();
});

const redesSociales = document.querySelectorAll(
    "#contactos > div > div:nth-child(2) > div"
);

const enlacesRedes = [
    "https://www.instagram.com/equipaggiopattini_oficial/",
    "https://www.facebook.com/search/top?q=Equipaggio%20Pattini%20Retro%20Club",
    "https://www.tiktok.com/@equipaggio.pattini"
];

redesSociales.forEach(function(red, indice) {
    red.style.cursor = "pointer";

    red.addEventListener("click", function() {
        window.open(enlacesRedes[indice], "_blank");
    });
});
