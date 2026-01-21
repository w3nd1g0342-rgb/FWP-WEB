function filtrar(categoria) {
  const productos = document.querySelectorAll('.producto-card');

  productos.forEach(producto => {
    if (categoria === 'todos' || producto.classList.contains(categoria)) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
}
