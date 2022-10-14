export default class ProductoCarritoDTO {
  constructor(productData) {
    this.id = productData._id || productData.id;
    this.nombre = productData.nombre;
    this.precio = productData.precio;
    this.foto = productData.foto;
    this.descripcion = productData.descripcion;
    this.codigo = productData.codigo;
  }
}
