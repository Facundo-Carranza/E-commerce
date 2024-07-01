const contenedorProductos = document.querySelector('.product-container')
const contadorProductos = document.querySelector('#contador-carrito')
const PrecioTotal = document.querySelector('#precio-total')
const contenidoCarrito = document.querySelector('#contenedor-carrito')
const VaciarCarrito = document.querySelector('#vaciar-carrito')
const btnIniciarCompra = document.querySelector('#btn-iniciarCompra')
const ModalNewsletter = document.querySelector('[body]')


const carritoVacio = () => {
  const mensaje = document.createElement('p')
  mensaje.className = 'mensaje'
  mensaje.innerText = "El carrito se encuentra vacío"
  contenidoCarrito.append(mensaje)
}

const btnDesactivados = () => {
  if(carrito_compras.length === 0){
    VaciarCarrito.classList.add('desactivated')
    btnIniciarCompra.classList.add('desactivated')
  }else{
    VaciarCarrito.classList.remove('desactivated')
    btnIniciarCompra.classList.remove('desactivated')
  }
}

const traerStorage = () => {
  
  contadorProductos.innerText = carrito_compras.length

  carrito_compras.forEach( (producto) =>{
    const elemento = document.createElement('div')
    elemento.className = "box"
    elemento.innerHTML = `
      <img src= ${producto.img} alt="Imagen">
      <div class="text">
      <h3> ${producto.nombre} </h3>
      <span>$ ${producto.precio} </span>
  `
  contenidoCarrito.append(elemento)
  })

  let suma = 0


  carrito_compras.forEach((producto) => {
  
    suma += producto.precio
  
  })
  
  PrecioTotal.innerText = suma
  

}

let carrito_compras

let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'))

  if(carritoLocalStorage){
    carrito_compras = carritoLocalStorage
    document.addEventListener('DOMContentLoaded', () => { traerStorage(); btnDesactivados() })
  }else{
    carrito_compras = []
    carritoVacio()
    btnDesactivados()
  }  

    fetch("./Js/stock.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(producto => {
      const elemento = document.createElement('div')
      elemento.className = 'box'

      elemento.innerHTML = `
      <img src= ${producto.img} alt="">
        <h2> ${producto.nombre} </h2>
        <span class = "precio-producto">$ ${producto.precio} </span>
        <span class = "cuotas"><strong>3</strong> cuotas sin interes de <strong>$  ${Math.trunc(producto.precio/3)}</strong></span>

      `
      const button = document.createElement('button')

      button.className = 'boton-agregar'
      button.innerHTML = `
      <i class='bx bx-shopping-bag'></i>
      `

      button.addEventListener('click',() => {
        agregarProductosAlCarrito(producto.id)
      })

      elemento.append(button)

      contenedorProductos.append(elemento)
    });
  })

  const toastCarrito = () => {
    Toastify({
      text: "Producto Agregado",
      className: "info",
      position: 'left',
      gravity: 'bottom',
      style: {
        background: "linear-gradient(to right, #FB6B90, #EFEBE0)",
        color: "black"
      }
    }).showToast();
    }
  const agregarProductosAlCarrito = (id) => {
    fetch("./Js/stock.json")
      .then(response => response.json())
      .then(data => {
        const prodcucto_Encontrado = data.find( (iteracion) => iteracion.id === id)

        carrito_compras.push(prodcucto_Encontrado)
        console.log(carrito_compras)

        toastCarrito()
        btnDesactivados()

        localStorage.setItem('carrito', JSON.stringify(carrito_compras))

        renderCarrito()
      })
  }


const renderCarrito = () => {
  renderCantidadProductos()
  renderTotalCarrito()
  ListarProductos()
}


const renderCantidadProductos = () => {
  contadorProductos.innerText = carrito_compras.length
}

const ListarProductos = () => {
  contenidoCarrito.innerHTML = " "

  carrito_compras.forEach( (producto) => {
    const elemento = document.createElement('div')
    elemento.className = 'box'

    elemento.innerHTML = `
    <img src= ${producto.img} alt="Imagen">
    <div class="text">
      <h3> ${producto.nombre} </h3>
      <span>$ ${producto.precio} </span>
    `
  
    contenidoCarrito.append(elemento)
  })

}


const renderTotalCarrito = () => {
  
  let suma = 0

  carrito_compras.forEach( (producto) => {

    suma = producto.precio + suma
  })

  PrecioTotal.innerText = suma

}

VaciarCarrito.addEventListener('click', () => {
  swal.fire({
    title: 'Estás Seguro?',
    text: "Esta acción es irreversible",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ffc0cb',
    cancelButtonColor: '#000000',
    confirmButtonText: 'Vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if(result.isConfirmed) {
      swal.fire({
        title: 'Carrito Vaciado',
        icon: 'success'
      })
      localStorage.removeItem('carrito')
      carrito_compras.splice(0, carrito_compras.length)
      renderCarrito()
      btnDesactivados()
      carritoVacio()
    }

  })

})

