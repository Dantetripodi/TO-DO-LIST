let empty = document.querySelector('.empty');
let form = document.querySelector('.form');
let lista = document.querySelector('.lista');
let detalle = document.querySelector('.detalle');
// formulario
let formulario = document.querySelector('#formulario')

let prod = false;

let listadoProductos = []

// fab y evento de fab
let fab = document.querySelector('.fab');
fab.addEventListener('click', () => {
  form.classList.remove('d-none');
  empty.classList.add('d-none');
  lista.classList.add('d-none');
  detalle.classList.add('d-none');
})

// btnCerrar y evento de btnCerrar
let btnCerrar = document.querySelector('.btn-cerrar');
btnCerrar.addEventListener('click', () => {
  if (prod) {
    form.classList.add('d-none');
    lista.classList.remove('d-none');
  } else {
    form.classList.add('d-none');
    empty.classList.remove('d-none');
  }
})

formulario.addEventListener('submit', (e) => {
  e.preventDefault()

  prod = true;
  let producto = {
    titulo: e.target.titulo.value,
    categoria: e.target.categoria.value,
    descripcion: e.target.descripcion.value
  }
  formulario.reset()
  listadoProductos.push(producto)
  // guardo en local storage
  localStorage.setItem('listadoLocal', JSON.stringify(listadoProductos));
  verLista(producto)
})

let listado = document.querySelector('.listado')
const verLista = (producto) => {
  if (producto) {
    form.classList.add('d-none');
    lista.classList.remove('d-none');

    listado.innerHTML += `<li>
  <div class="texto">${producto.categoria} ${producto.titulo}</div>
  <div><button class="btn btn-secondary" onclick="verDetalle('${producto.titulo}', '${producto.categoria}', '${producto.descripcion}')">Ver más</button></div>
  </li>`
  } else {
    detalle.classList.add('d-none');
    lista.classList.remove('d-none');
  }
}

const verListaLocal = (productos) => {

  productos.map((producto, index) => (
    listado.innerHTML += `<li>
  <div class="texto">${producto.categoria} ${producto.titulo}</div>
  <div><button class="btn btn-secondary" onclick="verDetalle('${producto.titulo}', '${producto.categoria}', '${producto.descripcion}')">Ver más</button></div>
  </li>`
  ))

}

let detalleProducto = document.querySelector('.detalleProducto')
const verDetalle = (titulo, categoria, descripcion) => {
  detalle.classList.remove('d-none');
  lista.classList.add('d-none');

  detalleProducto.innerHTML = `<li>
  <div class="texto"><h3>${categoria} ${titulo}</h3>
  <p>${descripcion}</p></div>
  <div><button class="btn btn-secondary" onclick="verLista()">Volver al listado</button></div>
  </li>`
}

const setProductosLocal = () => {
  let items = localStorage.getItem(JSON.parse(listadoLocal));
  //let items = JSON.parse(localStorage.getItem("listadoLocal"));
  if (items) {
    console.log(items)
    listadoProductos = items;
    verListaLocal(items);
    empty.classList.add('d-none');
    lista.classList.remove('d-none');
  } else {
    empty.classList.remove('d-none');
  }
}
// iniciamos la app y si hay items local los muestro...
setProductosLocal()
