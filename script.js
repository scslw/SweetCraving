/* 🌙 MODO OSCURO */
document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark");
};

/* 🛒 CARRITO */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

/* 💾 GUARDAR */
function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* 🧮 TOTAL + CONTADOR */
function calcularTotal() {
  total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const totalEl = document.getElementById("total");
  totalEl.textContent = total;

  // animación total
  totalEl.classList.remove("actualizado");
  void totalEl.offsetWidth; // 🔥 fuerza animación
  totalEl.classList.add("actualizado");

  document.getElementById("contadorCarrito").textContent = carrito.length;
}

/* ➕ AGREGAR */
function agregarCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  guardar();
  renderCarrito();
}

/* ❌ ELIMINAR */
function eliminarItem(index) {
  carrito.splice(index, 1);
  guardar();
  renderCarrito();
}

/* 🧾 RENDER TICKET (CRECE ITEM POR ITEM) */
function renderCarrito() {
  const lista = document.getElementById("listaCarrito");
  lista.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("item-ticket");

    li.innerHTML = `
      <span class="item-nombre">${item.nombre}</span>
      <span class="item-precio">$${item.precio}</span>
      <button class="eliminar" onclick="eliminarItem(${index})">✕</button>
    `;

    lista.appendChild(li);
  });

  calcularTotal();
}

/* 🪟 ABRIR / CERRAR CARRITO (CLASE CORRECTA) */
function toggleCarrito() {
  document.querySelector(".carrito").classList.toggle("activo");
}

/* 📲 WHATSAPP */
function enviarWhatsApp() {
  if (!carrito.length) {
    alert("El carrito está vacío 🛒");
    return;
  }

  let msg = "🧾 Pedido Sweet Craving:%0A";
  carrito.forEach(p => {
    msg += `• ${p.nombre} - $${p.precio}%0A`;
  });
  msg += `%0ATotal: $${total}`;

  window.open(`https://wa.me/528442640499?text=${msg}`, "_blank");
}

/* 🚀 INIT */
renderCarrito();
