document.addEventListener('DOMContentLoaded', () => {
    const inventarioList = document.getElementById('inventarioList');
    const agregarForm = document.getElementById('agregarForm');

    const cargarInventario = async () => {
        inventarioList.innerHTML = '';
        const response = await fetch('/api/inventario');
        const data = await response.json();
        data.forEach((producto, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${producto.nombre}:</strong> ${producto.cantidad}
                <input type="number" id="cantidad-${index}" value="${producto.cantidad}">
                <button onclick="editarCantidad(${index})">Editar</button>
            `;
            inventarioList.appendChild(li);
        });
    };

    // Función para agregar un nuevo producto al inventario
    agregarForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const response = await fetch('/api/inventario/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, cantidad })
        });
        cargarInventario();
        agregarForm.reset();
    });

    // Función para editar la cantidad de un producto en el inventario
    window.editarCantidad = async (index) => {
        const cantidad = parseInt(document.getElementById(`cantidad-${index}`).value);
        const response = await fetch(`/api/inventario/editar/${index}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cantidad })
        });
        cargarInventario();
    };

    // Cargar inventario al cargar la página
    cargarInventario();
});