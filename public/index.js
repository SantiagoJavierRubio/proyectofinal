window.onload = startShop

function startShop(){
    loadProducts()
    createCart()
}
// A reemplazar cuando se utilicen sesiones u otro método
function createCart(){
    if(!window.localStorage.getItem('cartID')){
        fetch('/api/carrito', {method: "POST"})
            .then(res => res.json())
            .then(data => {
                window.localStorage.setItem('cartID', data.id)
            })
    }
}
function loadProducts(){
    fetch('/api/productos', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            const listaDeProductos = document.querySelector('#lista-de-productos')
            if(data.length > 0){
                data.reverse()
                for (let product of data) {
                    let date = new Date(product.timestamp)
                    listaDeProductos.innerHTML += `
                    <div class="col-sm-5">
                        <div class="card">
                            <img class="card-img-top" src="${product.foto}" alt="Foto del producto">
                            <div class="card-body">
                                <h5 class="card-title">${product.nombre}</h5>
                                <p class="card-subtitle">${date.toLocaleString()}</div>
                                <p class="card-text">${product.descripcion}</p>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">$${product.precio}</li>
                                    <li class="list-group-item">${product.stock} en stock</li>
                                </ul>
                                <button class="btn btn-primary" onclick="agregarAlCarrito(${product.id})" ${product.stock>0 ? null : "disabled"}>Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                    `
                }
            } else {
                listaDeProductos.innerHTML = '<h4 class="sin-productos">No hay productos</h4h>'
            }
        })
        .catch(err => console.log(err))
}


function agregarAlCarrito(id){
    const cartID = window.localStorage.getItem('cartID')
    const payload = { productos: [id] }
    fetch(`/api/carrito/${cartID}/productos`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then(res => {
            if(res.status = 200) return alert('Producto añadido')
            throw new Error(res.statusText)
        })
        .catch(err => console.error(err))
}