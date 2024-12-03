const API_URL = 'https://appflaskpython.onrender.com/productos';

document.addEventListener('DOMContentLoaded', () => {
  const productosList = document.getElementById('productosList');
  const productoForm = document.getElementById('productoForm');

  // Obtener productos y mostrarlos
  const fetchProductos = async () => {
    try {
      const response = await fetch(API_URL);
      const productos = await response.json();

      productosList.innerHTML = ''; // Limpiar la lista
      productos.forEach((producto) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: ${producto.precio}`;
        productosList.appendChild(li);
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  // Agregar un nuevo producto
  productoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          cantidad: Number(cantidad),
          precio: Number(precio),
        }),
      });

      if (response.ok) {
        alert('Producto agregado con éxito');
        productoForm.reset(); // Limpiar el formulario
        fetchProductos(); // Actualizar la lista de productos
      } else {
        console.error('Error al agregar producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar producto:', error);
    }
  });

  // Cargar productos al cargar la página
  fetchProductos();
});
