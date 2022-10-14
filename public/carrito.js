function loadProducts() {
  fetch(`/carrito/productos`, { method: 'GET', credentials: 'include' })
    .then((res) => res.json())
    .then((data) => {
      const listaDeProductos = document.querySelector('#carrito-de-compras');
      listaDeProductos.innerHTML = '';
      if (data.length > 0) {
        data.reverse();
        for (const product of data) {
          const date = new Date(product.timestamp);
          listaDeProductos.innerHTML += `
                    <div class="row producto-carrito">
                        <div class="col-sm-8 media">
                            <img src="${product.foto}" class="img-thumbnail" width="50%" alt="Foto del producto">
                            <div class="media-body">
                                <h5 class="mt-0">${product.nombre}</h5>
                                <p>${product.descripcion}<p>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <p class="precio-carrito">$${product.precio}</p>
                        </div>
                        <button type="button" class="btn btn-danger remove-item-carrito" onclick="removeProduct('${product.id}')">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                    `;
        }
        document.querySelector('#vaciar-carrito').disabled = false;
        document.querySelector('#comprar').disabled = false;
      } else {
        listaDeProductos.innerHTML =
          '<h4 class="sin-productos">No hay productos</h4h>';
        document.querySelector('#vaciar-carrito').disabled = true;
        document.querySelector('#comprar').disabled = true;
      }
    })
    .catch((err) => alert(err.message));
}

function removeProduct(productId) {
  fetch(`/carrito/productos/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((res) => {
      if (res.ok) return loadProducts();
      throw new Error(res.statusText);
    })
    .catch((err) => alert(err.message));
}

function emptyCart() {
  fetch(`/carrito`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((res) => {
      if (res.ok) {
        return (window.location.href = '/');
      }
      throw new Error(res.statusText);
    })
    .catch((err) => console.error(err));
}

function checkout() {
  fetch('/carrito/checkout', {
    method: 'POST',
    credentials: 'include',
  }).then(() => {
    window.location.reload();
  });
}

window.onload = loadProducts;
