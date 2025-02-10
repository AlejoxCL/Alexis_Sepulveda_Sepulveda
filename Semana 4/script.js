
// Representación de productos
class Producto {
    constructor(id, nombre, precio, categoria, descuento = 0) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.categoria = categoria;
      this.descuento = descuento;
    }
  
    precioFinal() {
      return this.precio - (this.precio * this.descuento / 100);
    }
  }
  
  // Lista de productos
  const productos = [
    new Producto(1, "Laptop", 1500, "Electrónica"),
    new Producto(2, "Smartphone", 800, "Electrónica", 10),
    new Producto(3, "Audífonos", 200, "Accesorios", 15),
    new Producto(4, "Cámara", 1200, "Fotografía"),
  ];
  
// Filtrar y mostrar productos
function searchProducts() {
    const query = document.getElementById("product-search").value.toLowerCase();
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = ""; // Limpiar resultados
  
    const resultados = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(query)
    );
  
    if (resultados.length === 0) {
      resultsContainer.innerHTML = "<p>No se encontraron productos.</p>";
    } else {
      resultados.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
          <h4>${producto.nombre}</h4>
          <p>Precio: $${producto.precioFinal()} (${producto.descuento}% descuento)</p>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        resultsContainer.appendChild(productoDiv);
      });
    }
  }
  

// Notificaciones
function mostrarNotificacion(mensaje, tipo = "info") {
    const notificationsContainer = document.getElementById("notifications-container");
    const notificacion = document.createElement("div");
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
  
    notificationsContainer.appendChild(notificacion);
  
    setTimeout(() => {
      notificationsContainer.removeChild(notificacion);
    }, 3000);
  }
  
  // Carrito de compras
  const carrito = [];
  
  function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);
    actualizarCarrito();
    mostrarNotificacion(`Agregaste "${producto.nombre}" al carrito.`, "success");
  }
  
  function actualizarCarrito() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
  
    carrito.forEach((producto, index) => {
      const item = document.createElement("li");
      item.textContent = `${producto.nombre} - $${producto.precioFinal()}`;
      cartItems.appendChild(item);
    });
  
    mostrarNotificacion("Carrito actualizado.", "info");
  }
  
