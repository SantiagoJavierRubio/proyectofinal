window.onload = loadProducts

function loadProducts(){
    const listaDeProductos = document.querySelector('#lista-de-productos')
    listaDeProductos.innerHTML = ''
    fetch('/api/productos', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            if(data.length > 0){
                data.reverse()
                for (let product of data) {
                    let date = new Date(product.timestamp)
                    listaDeProductos.innerHTML += `
                    <form data-id=${product.id} class="col-sm-5 product-edit-form">
                        <div class="card">
                            <img class="card-img-top" src="${product.foto}" alt="Foto del producto">
                            <input class="form-control" type="text" name="foto" value="${product.foto}" />
                            <div class="card-body">
                                <h5 class="card-title">
                                    <input class="form-control" type="text" name="nombre" value="${product.nombre}" />
                                </h5>
                                <p class="card-subtitle">${date.toLocaleString()}</div>
                                <p class="card-text">
                                    <textarea class="form-control" name="descripcion">${product.descripcion}</textarea>
                                </p>
                                <ul class="list-group list-group-flush input-group">
                                    <li class="list-group-item">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">
                                                $
                                            </div>
                                            <input class="form-control" name="precio" type="number" step=0.01 value="${product.precio}" />
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group-prepend">
                                            <input class="form-control" name="stock" type="number" step=1 min=0 value="${product.stock}" /> en stock
                                        </div>
                                    </li>
                                </ul>
                                <div class="card-footer">
                                    <button type="submit" class="btn btn-success">Actualizar</button>
                                    <button type="button" class="btn btn-danger" onclick="deleteProduct(${product.id})">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                        </form>
                    `
                }
                listenToForms()
            } else {
                listaDeProductos.innerHTML = '<h4 class="sin-productos">No hay productos</h4h>'
            }
        })
        .catch(err => console.log(err))
}
function listenToForms() {
    const forms = document.querySelectorAll('.product-edit-form')
    for(let f of forms){
        f.addEventListener('submit', event => {
            event.preventDefault()
            const formData = new FormData(event.target)
            const jsonForm = Object.fromEntries(formData)
            fetch(`/api/productos/${event.target.dataset.id}`, {
                method: 'PUT',
                body: JSON.stringify(jsonForm),
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => {
                    if(res.ok) return loadProducts()
                    throw new Error(res.statusText)
                })
                .catch(err => console.error(err)
            )
        })
    }
}

function deleteProduct(prod_id) {
    fetch(`/api/productos/${prod_id}`, {
        method: "DELETE"
    })
        .then(res => {
            if(res.ok) return loadProducts()
            throw new Error(res.statusText)
        })
        .catch(err => console.error(err))
}

document.querySelector('#new-product-form').addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const jsonForm = Object.fromEntries(formData)
    event.target.reset()
    fetch(`/api/productos`, {
        method: 'POST',
        body: JSON.stringify(jsonForm),
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => {
            if(res.ok) return loadProducts()
            throw new Error(res.statusText)
        })
        .catch(err => console.error(err)
    )
})