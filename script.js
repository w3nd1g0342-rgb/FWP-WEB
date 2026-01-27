function filtrar(cat){
  document.querySelectorAll('.producto-card').forEach(p=>{
    p.style.display =
      (cat === 'todos' || p.classList.contains(cat)) ? 'flex' : 'none';
  });
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/* ===== CARRITO ===== */

function agregarAlCarrito(nombre, precio){
  const item = carrito.find(p => p.nombre === nombre);
  if(item){
    item.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  guardar();
  render();
}

function quitar(nombre){
  carrito = carrito.filter(p => p.nombre !== nombre);
  guardar();
  render();
}

function vaciarCarrito(){
  carrito = [];
  guardar();
  render();
}

function guardar(){
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

/* ===== RENDER ===== */

function render(){
  const cont = document.getElementById('carrito-items');
  const totalTxt = document.getElementById('total');
  const contador = document.getElementById('contador');

  cont.innerHTML = '';
  let total = 0;
  let cantidad = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;
    cantidad += p.cantidad;

    cont.innerHTML += `
      <div class="carrito-item">
        <span>${p.nombre} x${p.cantidad}</span>
        <span>$${(p.precio * p.cantidad).toLocaleString('es-CL')}</span>
        <button onclick="quitar('${p.nombre}')">❌</button>
      </div>
    `;
  });

  contador.textContent = cantidad;
  totalTxt.textContent = `Total: $${total.toLocaleString('es-CL')}`;
}

/* ===== MODAL ===== */

function abrirCarrito(){
  document.getElementById('modal').style.display = 'block';
}

function cerrarCarrito(){
  document.getElementById('modal').style.display = 'none';
}

/* ===== PAGO / WHATSAPP ===== */

function obtenerFormaPago(){
  const pago = document.querySelector('input[name="pago"]:checked');
  return pago ? pago.value : 'No especificado';
}

function enviarWhatsApp(){
  if(carrito.length === 0){
    alert('Carrito vacío');
    return;
  }

  const tipo = document.getElementById('tipoEntrega').value;
  const formaPago = obtenerFormaPago();

  let msg = 'Hola 👋 quiero comprar:%0A%0A';
  let total = 0;

  carrito.forEach(p => {
    msg += `- ${p.nombre} x${p.cantidad}%0A`;
    total += p.precio * p.cantidad;
  });

  msg += `%0A🚚 Modalidad: ${tipo}`;
  msg += `%0A💳 Forma de pago: ${formaPago}`;

  if(formaPago === 'Transferencia bancaria'){
    msg += `%0A%0A🏦 Datos para transferencia:%0A`;
    msg += `Nombre: Claudia Poblete Cartes%0A`;
    msg += `RUT: 12.270.803-9%0A`;
    msg += `Banco: Banco Falabella%0A`;
    msg += `Tipo de cuenta: Cuenta Corriente%0A`;
    msg += `N° Cuenta: 19810665710%0A`;
    msg += `Email: cpobletecartes545@gmail.com`;
  }

  msg += `%0A%0A💰 Total final: $${total.toLocaleString('es-CL')}`;
  msg += `%0A%0AGracias 🙂`;

  window.open(
    `https://wa.me/56956156721?text=${msg}`,
    '_blank'
  );

  vaciarCarrito();
}

/* INIT */
render();





