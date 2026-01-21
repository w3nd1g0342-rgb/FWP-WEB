const productos = {
  liv: {
    titulo: "LIV",
    precio: "$39.990 CLP",
    img: "assets/placeholder.png",
    desc: "Suplemento diario que apoya energía, inmunidad y bienestar general.",
    specs: [
      "Vitaminas y minerales",
      "Uso diario",
      "Apoyo integral"
    ],
    wpp: "Hola quiero información sobre LIV"
  },
  renova: {
    titulo: "RENÖVA+",
    precio: "$42.990 CLP",
    img: "assets/placeholder.png",
    desc: "Nutrición avanzada para piel, cabello y uñas.",
    specs: [
      "Colágeno",
      "Antioxidantes",
      "Uso diario"
    ],
    wpp: "Hola quiero información sobre RENÖVA+"
  },
  eboost: {
    titulo: "E-BOOST",
    precio: "$36.990 CLP",
    img: "assets/placeholder.png",
    desc: "Aumenta energía, enfoque y rendimiento físico.",
    specs: [
      "Energía sostenida",
      "Mejor enfoque",
      "Ideal para entrenar"
    ],
    wpp: "Hola quiero información sobre E-BOOST"
  },
  burn: {
    titulo: "24BURN",
    precio: "$41.990 CLP",
    img: "assets/placeholder.png",
    desc: "Apoyo metabólico y control de peso durante el día.",
    specs: [
      "Quema de grasa",
      "Apoyo al metabolismo",
      "Uso diario"
    ],
    wpp: "Hola quiero información sobre 24BURN"
  }
};

function abrirProducto(id) {
  const p = productos[id];

  document.getElementById("modal-img").src = p.img;
  document.getElementById("modal-titulo").textContent = p.titulo;
  document.getElementById("modal-precio").textContent = p.precio;
  document.getElementById("modal-desc").textContent = p.desc;

  const ul = document.getElementById("modal-specs");
  ul.innerHTML = "";
  p.specs.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    ul.appendChild(li);
  });

  document.getElementById("modal-wpp").href =
    "https://wa.me/569XXXXXXXX?text=" + encodeURIComponent(p.wpp);

  document.getElementById("modal").style.display = "block";
}

function cerrarProducto() {
  document.getElementById("modal").style.display = "none";
}

function filtrar(categoria) {
  document.querySelectorAll('.producto-card').forEach(p => {
    p.style.display =
      categoria === 'todos' || p.classList.contains(categoria)
        ? 'block'
        : 'none';
  });
}
