# Memoria del Proyecto: Solitario VIU

## 1. Introducción

El proyecto "Solitario VIU" consiste en una implementación web del clásico juego de cartas solitario, desarrollado utilizando tecnologías web estándar (HTML5, CSS3 y JavaScript). Este proyecto demuestra la aplicación práctica de conceptos fundamentales de programación web, incluyendo manipulación del DOM, gestión de eventos y diseño responsive.

### 1.1 Objetivos del Proyecto

- Desarrollar una versión jugable del solitario en entorno web
- Implementar funcionalidad drag & drop para el movimiento de cartas
- Crear una interfaz de usuario intuitiva y responsive
- Mantener un registro del tiempo y movimientos del jugador
- Asegurar la compatibilidad con navegadores modernos

## 2. Arquitectura y Diseño

### 2.1 Estructura del Proyecto

```
proyecto-solitario/
├── index.html
├── css/
│   └── solitario.css
├── js/
│   └── solitario.js
└── imagenes/
    ├── baraja/
    │   └── [cartas.png]
    └── logoVIU.png
```

### 2.2 Tecnologías Utilizadas

- **HTML5**: Estructura base y elementos semánticos
- **CSS3**: Estilos y diseño responsive
- **JavaScript**: Lógica del juego y manipulación del DOM
- **Bootstrap 3.4.0**: Framework CSS para componentes básicos

## 3. Implementación

### 3.1 Componentes Principales

#### 3.1.1 Estructura del Juego
- Tapete inicial (mazo principal)
- Tapete de sobrantes
- 4 tapetes receptores para construcción de secuencias
- Contadores de tiempo y movimientos
- Botón de reinicio

#### 3.1.2 Gestión de Estado
```javascript
// Estado del juego
let mazoInicial = [];
let mazoSobrantes = [];
let mazoReceptor1 = [];
let mazoReceptor2 = [];
let mazoReceptor3 = [];
let mazoReceptor4 = [];
```

### 3.2 Funcionalidades Clave

#### 3.2.1 Sistema de Drag & Drop
El juego implementa un sistema completo de drag & drop para el movimiento de cartas:
- Eventos drag & drop HTML5
- Validación de movimientos
- Actualización automática de estados

#### 3.2.2 Lógica de Juego
```javascript
function esMovimientoValido(carta, tapeteDestino) {
    if (tapeteDestino.classList.contains('receptor')) {
        let cartasEnTapete = Array.from(tapeteDestino.getElementsByTagName('img'));
        if (cartasEnTapete.length === 0) {
            return numero === 12;
        }
        let ultimaCarta = cartasEnTapete[cartasEnTapete.length - 1];
        return (palo === ultimoPalo) && (numero === ultimoNumero - 1);
    }
    return true;
}
```

## 4. Características Técnicas

### 4.1 Diseño Responsive
El juego se adapta a diferentes tamaños de pantalla mediante:
- Uso de unidades relativas
- Media queries
- Diseño flexible de los tapetes

### 4.2 Gestión de Eventos
- Manejo centralizado de eventos DOM
- Sistema de propagación de eventos controlado
- Prevención de comportamientos no deseados

### 4.3 Optimización
- Minimización de manipulaciones DOM
- Reutilización de elementos
- Gestión eficiente de memoria

## 5. Pruebas y Validación

### 5.1 Casos de Prueba
- Movimientos válidos e inválidos de cartas
- Funcionamiento del contador de tiempo
- Reinicio del juego
- Comportamiento responsive
- Compatibilidad cross-browser

### 5.2 Resultados
- Funcionamiento correcto en navegadores modernos
- Interfaz responsive funcional
- Sistema de drag & drop robusto
- Contadores precisos

## 6. Conclusiones y Mejoras Futuras

### 6.1 Objetivos Alcanzados
- Implementación completa del juego base
- Interfaz de usuario intuitiva
- Sistema de movimientos robusto
- Gestión efectiva del estado del juego

### 6.2 Mejoras Propuestas
1. Implementación de sistema de puntuación
2. Persistencia de estado del juego
3. Animaciones de transición
4. Modo oscuro
5. Tutorial interactivo

## 7. Screenshots y Diagramas

### 7.1 Estructura de Componentes
```
[Mesa de Juego]
├─ [Tapetes Superiores]
│  ├─ Tapete Inicial
│  └─ Tapete Sobrantes
└─ [Tapetes Receptores]
   ├─ Receptor 1
   ├─ Receptor 2
   ├─ Receptor 3
   └─ Receptor 4
```

### 7.2 Flujo de Juego
1. Inicialización del juego
2. Distribución de cartas
3. Movimientos del jugador
4. Validación de movimientos
5. Actualización de estado
6. Verificación de victoria

## 8. Apéndice

### 8.1 Requisitos del Sistema
- Navegador web moderno con soporte HTML5
- JavaScript habilitado
- Resolución mínima recomendada: 768x1024
