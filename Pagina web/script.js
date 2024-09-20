// Simulación de productos
const productos = [
    { id: 1, nombre: "Producto 1", precio: 100, descripcion: "Descripción del producto 1" },
    { id: 2, nombre: "Producto 2", precio: 200, descripcion: "Descripción del producto 2" },
    { id: 3, nombre: "Producto 3", precio: 300, descripcion: "Descripción del producto 3" }
];

// Cargar los productos al iniciar la página
window.onload = function() {
    const productosDiv = document.getElementById('productos');

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
};

let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(prod => prod.id === idProducto);
    carrito.push(producto);
    actualizarCarrito();
}

// Función para actualizar el carrito en la página
function actualizarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';

    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>Tu carrito está vacío</p>';
    } else {
        carrito.forEach(prod => {
            const productoCarritoDiv = document.createElement('div');
            productoCarritoDiv.classList.add('producto');
            productoCarritoDiv.innerHTML = `
                <h4>${prod.nombre}</h4>
                <p>Precio: $${prod.precio}</p>
            `;
            carritoDiv.appendChild(productoCarritoDiv);
        });

        const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);
        const totalDiv = document.createElement('div');
        totalDiv.innerHTML = `<p>Total: $${total}</p>`;
        carritoDiv.appendChild(totalDiv);
    }
}