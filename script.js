/* ===== CONFIGURACIÓN ===== */

const WHATSAPP_NUMERO = '56956156721';

const DATOS_TRANSFERENCIA = {
  nombre: 'Claudia Poblete Cartes',
  rut: '12.270.803-9',
  banco: 'Banco Falabella',
  tipo: 'Cuenta Corriente',
  cuenta: '19810665710',
  email: 'cpobletecartes545@gmail.com'
};

/* ===== FILTRO ===== */

function filtrar(cat){
  document.querySelectorAll('.producto-card').forEach(p => {
    p.style.display =
      (cat === 'todos' || p.classList.contains(cat)) ? 'flex' : 'none';
  });
}

/* ===== CARRITO (PROTEGIDO) ===== */

let carrito = [];

try {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
} catch {
  carrito = [];
}

/* ===== FUNCIONES CARRITO ===== */

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

/* ===== RENDER SEGURO ===== */

function render(){
  const cont = document.getElementById('carrito-items');
  const totalTxt = document.getElementById('total');
  const contador = document.getElementById('contador');

  if(!cont || !totalTxt || !contador) return;

  cont.innerHTML = '';

  let total = 0;
  let cantidad = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;
    cantidad += p.cantidad;

    const item = document.createElement('div');
    item.className = 'carrito-item';

    const nombre = document.createElement('span');
    nombre.textContent = `${p.nombre} x${p.cantidad}`;

    const precio = document.createElement('span');
    precio.textContent = `$${(p.precio * p.cantidad).toLocaleString('es-CL')}`;

    const btn = document.createElement('button');
    btn.textContent = '❌';
    btn.onclick = () => quitar(p.nombre);

    item.appendChild(nombre);
    item.appendChild(precio);
    item.appendChild(btn);

    cont.appendChild(item);
  });

  contador.textContent = cantidad;
  totalTxt.textContent = `Total: $${total.toLocaleString('es-CL')}`;
}

/* ===== MODAL ===== */

function abrirCarrito(){
  const modal = document.getElementById('modal');
  if(modal) modal.style.display = 'block';
}

function cerrarCarrito(){
  const modal = document.getElementById('modal');
  if(modal) modal.style.display = 'none';
}

/* ===== WHATSAPP SEGURO ===== */

function obtenerFormaPago(){
  const pago = document.querySelector('input[name="pago"]:checked');
  return pago ? pago.value : 'No especificado';
}

function enviarWhatsApp(){
  if(carrito.length === 0){
    alert('Carrito vacío');
    return;
  }

  const tipoEntrega = document.getElementById('tipoEntrega')?.value || 'No especificado';
  const formaPago = obtenerFormaPago();

  let texto = `Hola 👋 quiero comprar:\n\n`;
  let total = 0;

  carrito.forEach(p => {
    texto += `- ${p.nombre} x${p.cantidad}\n`;
    total += p.precio * p.cantidad;
  });

  texto += `\n🚚 Modalidad: ${tipoEntrega}`;
  texto += `\n💳 Forma de pago: ${formaPago}`;

  if(formaPago === 'Transferencia bancaria'){
    texto += `\n\n🏦 Datos para transferencia:\n`;
    texto += `Nombre: ${DATOS_TRANSFERENCIA.nombre}\n`;
    texto += `RUT: ${DATOS_TRANSFERENCIA.rut}\n`;
    texto += `Banco: ${DATOS_TRANSFERENCIA.banco}\n`;
    texto += `Tipo de cuenta: ${DATOS_TRANSFERENCIA.tipo}\n`;
    texto += `N° Cuenta: ${DATOS_TRANSFERENCIA.cuenta}\n`;
    texto += `Email: ${DATOS_TRANSFERENCIA.email}`;
  }

  texto += `\n\n💰 Total final: $${total.toLocaleString('es-CL')}`;
  texto += `\n\nGracias 🙂`;

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');

  vaciarCarrito();
}

/* ===== INIT ===== */
render();
