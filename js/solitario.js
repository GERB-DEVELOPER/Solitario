// Array de palos
let palos = ["viu", "cua", "hex", "cir"];
// Array de números
let numeros = [1,2,3,4,5,6,7,8,9,10,11,12];
// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 3;
// Tapetes              
let tapeteInicial = document.getElementById("inicial");
let tapeteSobrantes = document.getElementById("sobrantes");
let tapeteReceptor1 = document.getElementById("receptor1");
let tapeteReceptor2 = document.getElementById("receptor2");
let tapeteReceptor3 = document.getElementById("receptor3");
let tapeteReceptor4 = document.getElementById("receptor4");
// Mazos
let mazoInicial = [];
let mazoSobrantes = [];
let mazoReceptor1 = [];
let mazoReceptor2 = [];
let mazoReceptor3 = [];
let mazoReceptor4 = [];
// Contadores
let contInicial = document.getElementById("contador_inicial");
let contSobrantes = document.getElementById("contador_sobrantes");
let contReceptor1 = document.getElementById("contador_receptor1");
let contReceptor2 = document.getElementById("contador_receptor2");
let contReceptor3 = document.getElementById("contador_receptor3");
let contReceptor4 = document.getElementById("contador_receptor4");
let contMovimientos = document.getElementById("contador_movimientos");
let contTiempo = document.getElementById("contador_tiempo");
// Tiempo
let segundos = 0;
let temporizador = null;
// Función para comenzar el juego
function comenzarJuego() {
    limpiarTapetes();
    crearBaraja();
    barajar(mazoInicial);
    cargarTapeteInicial(mazoInicial);
    reiniciarContadores();
    actualizarContadorCartas();
    arrancarTiempo();
}
// Limpiar todos los tapetes
function limpiarTapetes() {
    // Guardamos los contadores antes de limpiar
    const contadorInicial = tapeteInicial.querySelector('.contador');
    const contadorSobrantes = tapeteSobrantes.querySelector('.contador');
    const contadorReceptor1 = tapeteReceptor1.querySelector('.contador');
    const contadorReceptor2 = tapeteReceptor2.querySelector('.contador');
    const contadorReceptor3 = tapeteReceptor3.querySelector('.contador');
    const contadorReceptor4 = tapeteReceptor4.querySelector('.contador');
    // Limpiamos los tapetes
    tapeteInicial.innerHTML = '';
    tapeteSobrantes.innerHTML = '';
    tapeteReceptor1.innerHTML = '';
    tapeteReceptor2.innerHTML = '';
    tapeteReceptor3.innerHTML = '';
    tapeteReceptor4.innerHTML = '';
    // Restauramos los contadores
    if (contadorInicial) tapeteInicial.appendChild(contadorInicial);
    if (contadorSobrantes) tapeteSobrantes.appendChild(contadorSobrantes);
    if (contadorReceptor1) tapeteReceptor1.appendChild(contadorReceptor1);
    if (contadorReceptor2) tapeteReceptor2.appendChild(contadorReceptor2);
    if (contadorReceptor3) tapeteReceptor3.appendChild(contadorReceptor3);
    if (contadorReceptor4) tapeteReceptor4.appendChild(contadorReceptor4);
    // Reiniciamos los arrays de mazos
    mazoInicial = [];
    mazoSobrantes = [];
    mazoReceptor1 = [];
    mazoReceptor2 = [];
    mazoReceptor3 = [];
    mazoReceptor4 = [];
}
// Reiniciar contadores
function reiniciarContadores() {
    contMovimientos.innerText = "0";
    actualizarContadorCartas();
}
// Crear la baraja
function crearBaraja() {
    for (let p = 0; p < palos.length; p++) {
        for (let n = 0; n < numeros.length; n++) {
            let carta = document.createElement("img");
            carta.src = `imagenes/baraja/${numeros[n]}-${palos[p]}.png`;
            carta.draggable = true;
            carta.setAttribute("data-palo", palos[p]);
            carta.setAttribute("data-numero", numeros[n]);
            carta.setAttribute("data-color", esColorNaranja(palos[p]) ? "naranja" : "gris");
            // Aquí agregamos la inicialización de eventos para cada carta
            inicializarEventosCarta(carta);

            mazoInicial.push(carta);
        }
    }
}
// Esta es la función que inicializa los eventos de cada carta
function inicializarEventosCarta(carta) {
    carta.ondragstart = function (e) {
        if (!this.draggable) {
            e.preventDefault();
            return false;
        }
        e.dataTransfer.setData("text/plain/numero", this.dataset.numero);
        e.dataTransfer.setData("text/plain/palo", this.dataset.palo);
        e.dataTransfer.setData("text/plain/color", this.dataset.color);
        e.dataTransfer.setData("text/plain/origen", this.parentNode.id);
        this.classList.add('dragging');
    };

    carta.ondragend = function (e) {
        this.classList.remove('dragging');
        actualizarCartasArrastrables();

        // Verificar si necesitamos regresar cartas al mazo inicial
        if (mazoInicial.length === 0 && mazoSobrantes.length > 0) {
            setTimeout(regresarCartasAInicial, 100);
        }
    };
}
// Determinar si un palo es de color naranja
function esColorNaranja(palo) {
    return palo === "viu" || palo === "cua";
}
// Barajar el mazo
function barajar(mazo) {
    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
}
// Cargar tapete inicial
function cargarTapeteInicial(mazo) {
    mazo.forEach((carta, index) => {
        carta.style.position = 'absolute';
        carta.style.top = (index * paso) + 'px';
        carta.style.left = (index * paso) + 'px';
        carta.style.zIndex = index + 1;
        tapeteInicial.appendChild(carta);
    });

    actualizarCartasArrastrables();
    actualizarContadorCartas();
}
// Actualizar qué cartas son arrastrables
function actualizarCartasArrastrables() {
    // Primero desactivar todas las cartas
    document.querySelectorAll('img[data-palo]').forEach(carta => {
        carta.draggable = false;
    });
    // Activar solo las cartas superiores
    if (mazoInicial.length > 0) {
        const cartaInicial = mazoInicial[mazoInicial.length - 1];
        if (cartaInicial) cartaInicial.draggable = true;
    }
    if (mazoSobrantes.length > 0) {
        const cartaSobrante = mazoSobrantes[mazoSobrantes.length - 1];
        if (cartaSobrante) cartaSobrante.draggable = true;
    }
}
// Actualizar contadores de cartas
function actualizarContadorCartas() {
    function asegurarContador(tapete, id) {
        let contador = document.getElementById(id);
        if (!contador) {
            contador = document.createElement('span');
            contador.id = id;
            contador.className = 'contador';
            tapete.appendChild(contador);
        }
        return contador;
    }
    // Asegurar que existan todos los contadores
    const contInicial = asegurarContador(tapeteInicial, 'contador_inicial');
    const contSobrantes = asegurarContador(tapeteSobrantes, 'contador_sobrantes');
    const contReceptor1 = asegurarContador(tapeteReceptor1, 'contador_receptor1');
    const contReceptor2 = asegurarContador(tapeteReceptor2, 'contador_receptor2');
    const contReceptor3 = asegurarContador(tapeteReceptor3, 'contador_receptor3');
    const contReceptor4 = asegurarContador(tapeteReceptor4, 'contador_receptor4');
    // Actualizar los valores
    contInicial.textContent = mazoInicial.length;
    contSobrantes.textContent = mazoSobrantes.length;
    contReceptor1.textContent = mazoReceptor1.length;
    contReceptor2.textContent = mazoReceptor2.length;
    contReceptor3.textContent = mazoReceptor3.length;
    contReceptor4.textContent = mazoReceptor4.length;
}
// Verificar si el movimiento es válido
function esMovimientoValido(carta, tapeteDestino) {
    let numero = parseInt(carta.dataset.numero);
    let palo = carta.dataset.palo;
    let color = carta.dataset.color;
    let origenId = carta.parentNode.id;
    // Prevenir CUALQUIER movimiento de sobrantes a inicial si hay cartas en inicial
    if (tapeteDestino.id === 'inicial' && origenId === 'sobrantes' && mazoInicial.length > 0) {
        console.log("Movimiento bloqueado: el tapete inicial aún tiene cartas");
        return false;
    }
    // Para tapetes receptores
    if (tapeteDestino.classList.contains('receptor')) {
        let cartasEnTapete = Array.from(tapeteDestino.getElementsByTagName('img'));
        if (cartasEnTapete.length === 0) {
            return numero === 12;
        }
        let ultimaCarta = cartasEnTapete[cartasEnTapete.length - 1];
        let ultimoNumero = parseInt(ultimaCarta.dataset.numero);
        let ultimoColor = ultimaCarta.dataset.color;
        return (numero === ultimoNumero - 1) && (color !== ultimoColor);
    }
    // Para el tapete inicial, solo permitir movimientos desde sobrantes cuando está vacío
    if (tapeteDestino.id === 'inicial') {
        if (origenId === 'sobrantes' && mazoInicial.length > 0) {
            console.log("Movimiento bloqueado: el tapete inicial aún tiene cartas");
            return false;
        }
        return origenId === 'sobrantes' && mazoInicial.length === 0;
    }
    return true;
}
// Segunda función: manejar el drop
function manejarDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    const numero = e.dataTransfer.getData("text/plain/numero");
    const palo = e.dataTransfer.getData("text/plain/palo");
    const origen = e.dataTransfer.getData("text/plain/origen");

    console.log("Intento de drop:", {
        numero: numero,
        palo: palo,
        origen: origen,
        destino: e.currentTarget.id
    });

    let carta = document.querySelector(`[data-palo="${palo}"][data-numero="${numero}"]`);

    if (carta && esMovimientoValido(carta, e.currentTarget)) {
        console.log("Movimiento válido - realizando movimiento");
        realizarMovimiento(carta, origen, e.currentTarget.id);
        contMovimientos.innerText = parseInt(contMovimientos.innerText) + 1;
        verificarFinJuego();
    } else {
        console.log("Movimiento inválido");
    }
}
// Actualizar los event listeners de los tapetes
[tapeteInicial, tapeteSobrantes, tapeteReceptor1, tapeteReceptor2, tapeteReceptor3, tapeteReceptor4].forEach(tapete => {
    tapete.ondragover = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    tapete.ondrop = manejarDrop;
});
// Arrancar el tiempo
function arrancarTiempo() {
    if (temporizador) clearInterval(temporizador);
    segundos = 0;

    function actualizarTiempo() {
        let horas = Math.floor(segundos / 3600);
        let minutos = Math.floor((segundos % 3600) / 60);
        let segs = segundos % 60;

        contTiempo.innerText =
            `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
        segundos++;
    }

    actualizarTiempo();
    temporizador = setInterval(actualizarTiempo, 1000);
}
// Realizar el movimiento
function realizarMovimiento(carta, origen, destinoId) {
    const tapeteDestino = document.getElementById(destinoId);
    if (!tapeteDestino) return;

    // Determinar mazos origen y destino
    let mazoOrigen, mazoDestino;

    // Asignar mazo origen
    switch (origen) {
        case 'inicial': mazoOrigen = mazoInicial; break;
        case 'sobrantes': mazoOrigen = mazoSobrantes; break;
        case 'receptor1': mazoOrigen = mazoReceptor1; break;
        case 'receptor2': mazoOrigen = mazoReceptor2; break;
        case 'receptor3': mazoOrigen = mazoReceptor3; break;
        case 'receptor4': mazoOrigen = mazoReceptor4; break;
    }

    // Asignar mazo destino
    switch (destinoId) {
        case 'inicial': mazoDestino = mazoInicial; break;
        case 'sobrantes': mazoDestino = mazoSobrantes; break;
        case 'receptor1': mazoDestino = mazoReceptor1; break;
        case 'receptor2': mazoDestino = mazoReceptor2; break;
        case 'receptor3': mazoDestino = mazoReceptor3; break;
        case 'receptor4': mazoDestino = mazoReceptor4; break;
    }

    // Remover la carta del mazo origen
    const index = mazoOrigen.indexOf(carta);
    if (index !== -1) {
        mazoOrigen.splice(index, 1);
    }

    // Manejar el posicionamiento especial para el tapete de sobrantes
    if (destinoId === 'sobrantes') {
        carta.style.position = 'absolute';
        carta.style.top = '0px';
        carta.style.left = '0px';
        carta.style.zIndex = mazoSobrantes.length + 1;
    }
    // Manejar el posicionamiento para el tapete inicial
    else if (destinoId === 'inicial') {
        carta.style.position = 'absolute';
        carta.style.top = (mazoDestino.length * paso) + 'px';
        carta.style.left = (mazoDestino.length * paso) + 'px';
        carta.style.zIndex = mazoDestino.length + 1;
    }
    // Manejar el posicionamiento para receptores
    else if (tapeteDestino.classList.contains('receptor')) {
        carta.style.position = 'absolute';
        carta.style.top = '0';
        carta.style.left = '0';
        carta.style.zIndex = mazoDestino.length + 1;
    }

    // Añadir la carta al mazo destino
    mazoDestino.push(carta);
    tapeteDestino.appendChild(carta);

    // Verificar si necesitamos regresar cartas al mazo inicial
    if (origen === 'inicial' && mazoInicial.length === 0 && mazoSobrantes.length > 0) {
        setTimeout(regresarCartasAInicial, 100);
    }

    actualizarContadorCartas();
    actualizarCartasArrastrables();
}
// Configurar eventos de drag & drop para todos los tapetes
[tapeteInicial, tapeteSobrantes, tapeteReceptor1, tapeteReceptor2, tapeteReceptor3, tapeteReceptor4].forEach(tapete => {
    tapete.ondragenter = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    tapete.ondragover = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    tapete.ondragleave = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    tapete.ondrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const palo = e.dataTransfer.getData("text/plain/palo");
        const numero = e.dataTransfer.getData("text/plain/numero");
        const origen = e.dataTransfer.getData("text/plain/origen");

        let carta = document.querySelector(`[data-palo="${palo}"][data-numero="${numero}"]`);

        if (carta && esMovimientoValido(carta, e.currentTarget)) {
            realizarMovimiento(carta, origen, e.currentTarget.id);
            contMovimientos.innerText = parseInt(contMovimientos.innerText) + 1;
            verificarFinJuego();
        }
    };
});



// Verificar fin del juego
function verificarFinJuego() {
    if (mazoInicial.length === 0 && mazoSobrantes.length === 0) {
        clearInterval(temporizador);
        esparcirCartas();
        // Mostrar el pop-up con el mensaje
        document.getElementById("popupFinJuego").style.display = "block";


        const horas = Math.floor(segundos / 3600); 
        const minutos = Math.floor((segundos % 3600) / 60); 
        const segs = segundos % 60;
        document.getElementById('tiempoDuracion').innerText =
            `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;

        
    }

    // Función para cerrar el pop-up
document.getElementById("cerrarPopup").addEventListener("click", function () {
    document.getElementById("popupFinJuego").style.display = "none";
});

// Función para reiniciar el juego
document.getElementById("reiniciarJuego").addEventListener("click", function () {
    document.getElementById("popupFinJuego").style.display = "none";

    comenzarJuego();
    
});
}


function esparcirCartas() {
    const mesa = document.getElementById('mesa'); 
    const rectMesa = mesa.getBoundingClientRect(); 

    const cartas = document.querySelectorAll('img[data-palo]'); 
    cartas.forEach(carta => {
        const anchoCarta = carta.offsetWidth;
        const altoCarta = carta.offsetHeight;
        const maxLeft = rectMesa.width - anchoCarta; 
        const maxTop = rectMesa.height - altoCarta; 
        if (maxLeft > 0 && maxTop > 0) {
            const leftRandom = Math.random() * maxLeft; 
            const topRandom = Math.random() * maxTop; 

            carta.style.position = 'absolute'; 
            carta.style.left = `${leftRandom}px`; 
            carta.style.top = `${topRandom}px`; 
        }
    });
}






// Función para mover cartas de sobrantes a inicial
function regresarCartasAInicial() {
    // Solo permitir el regreso si el mazo inicial está completamente vacío
    if (mazoSobrantes.length > 0 && mazoInicial.length === 0) {
        // Copiar las cartas del mazo sobrante
        const cartasAMover = [...mazoSobrantes];
        // Limpiar el mazo sobrante
        mazoSobrantes.length = 0;

        // Barajar las cartas antes de colocarlas en el mazo inicial
        barajar(cartasAMover);

        // Colocar las cartas barajadas en el mazo inicial
        cartasAMover.forEach((carta, index) => {
            carta.style.position = 'absolute';
            carta.style.top = (index * paso) + 'px';
            carta.style.left = (index * paso) + 'px';
            carta.style.zIndex = index + 1;

            mazoInicial.push(carta);
            tapeteInicial.appendChild(carta);
        });

        actualizarContadorCartas();
        actualizarCartasArrastrables();
    }
}
// Evento de clic en el tapete inicial
tapeteInicial.addEventListener('click', function () {
    if (mazoInicial.length > 0) {
        // Mover carta de inicial a sobrantes
        let carta = mazoInicial.pop();
        carta.style.position = 'absolute';
        carta.style.top = '0px';
        carta.style.left = '0px';
        carta.style.zIndex = mazoSobrantes.length + 1;

        mazoSobrantes.push(carta);
        tapeteSobrantes.appendChild(carta);

        // Si el tapete inicial se quedó sin cartas, regresar las de sobrantes
        if (mazoInicial.length === 0) {
            regresarCartasAInicial();
        } else {
            actualizarContadorCartas();
            actualizarCartasArrastrables();
        }
    }
});


// Evento de clic en el botón de reinicio
document.getElementById("reset").addEventListener("click", comenzarJuego);
// Iniciar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    comenzarJuego();
});