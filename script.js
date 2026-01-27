function filtrar(cat){
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

function abrirCarrito(){ document.getElementById('modal').style.display='block'; }
function cerrarCarrito(){ document.getElementById('modal').style.display='none'; }

function enviarWhatsApp(){
  let tipo = document.getElementById('tipoEntrega').value;
  let msg = 'Hola 👋 quiero comprar:%0A%0A';
  let total = 0;

  carrito.forEach(p=>{
    msg += `- ${p.nombre} x${p.cantidad}%0A`;
    total += p.precio*p.cantidad;
  });

  msg += `%0A🚚 Entrega: ${tipo}%0A💰 Total: $${total.toLocaleString('es-CL')}`;

  window.open(`https://wa.me/56956156721?text=${msg}`, '_blank');
}

render();

