const btnSubmit = document.querySelector(".submit-btn");
const vaciarcontenedor = document.querySelector(".formulario");
const limiteTiempo = document.querySelector("#limite");

let contador = 120;

const timing = setInterval(() => {
  limiteTiempo.innerText = contador;
  contador--;

  if (contador <= 0) {
    clearInterval(timing);
    vaciarcontenedor.innerHTML = " ";

    vaciarcontenedor.innerHTML = `
      <h2 class="title-volver">Se acabó el tiempo</h2>
      <button class="btn-volver"><a href="./index.html">Volver</a></button>
    `;
    localStorage.removeItem("carrito");
  }
}, 1000);

btnSubmit.addEventListener("click", () => {
  vaciarcontenedor.innerHTML = " ";

  vaciarcontenedor.innerHTML = `
    <h2 class="title-volver">¡Gracias por tu compra, volvé pronto!</h2>
    <button class="btn-volver"><a href="./index.html">Volver</a></button>
  `;
  localStorage.removeItem("carrito");
});
