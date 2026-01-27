ffunction filtrar(cat){
  document.querySelectorAll('.producto-card').forEach(p=>{
    p.style.display = cat==='todos'||p.classList.contains(cat)?'block':'none';
  });
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(nombre, precio){
  let p = carrito.find(x=>x.nombre===nombre);
  p ? p.cantidad++ : carrito.push({nombre,precio,cantidad:1});
  guardar(); render();
}

function quitar(nombre){
  carrito = carrito.filter(p=>p.nombre!==nombre);
  guardar(); render();
}

function guardar(){
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function render(){
  let cont = document.getElementById('carrito-items');
  let totalTxt = document.getElementById('total');
  let contador = document.getElementById('contador');
  cont.innerHTML = '';
  let total = 0, cant = 0;

  carrito.forEach(p=>{
    total += p.precio*p.cantidad;
    cant += p.cantidad;
    cont.innerHTML += `
      <div class="carrito-item">
        <span>${p.nombre} x${p.cantidad}</span>
        <span>$${(p.precio*p.cantidad).toLocaleString('es-CL')}</span>
        <button onclick="quitar('${p.nombre}')">❌</button>
      </div>`;
  });

  contador.textContent = cant;
  totalTxt.textContent = `Total: $${total.toLocaleString('es-CL')}`;
}

function abrirCarrito(){
  document.getElementById('modal').style.display='block';
}

function cerrarCarrito(){
  document.getElementById('modal').style.display='none';
}

function obtenerFormaPago(){
  const p = document.querySelector('input[name="pago"]:checked');
  return p ? p.value : 'No especificado';
}

function enviarWhatsApp(){
  if(carrito.length===0){
    alert('Carrito vacío');
    return;
  }

  let tipo = document.getElementById('tipoEntrega').value;
  let formaPago = obtenerFormaPago();
  let msg = 'Hola 👋 quiero comprar:%0A%0A';
  let total = 0;

  carrito.forEach(p=>{
    msg += `- ${p.nombre} x${p.cantidad}%0A`;
    total += p.precio*p.cantidad;
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

  msg += `%0A%0A💰 Total final: $${total.toLocaleString('es-CL')}%0A%0AGracias 🙂`;

  window.open(`https://wa.me/56956156721?text=${msg}`, '_blank');

  carrito = [];
  guardar();
  render();
}

render();



