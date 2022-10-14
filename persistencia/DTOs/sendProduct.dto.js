export default class SendProductDTO {
    constructor(productData) {
        this.id = productData.id || productData._id;
        this.nombre = productData.nombre;
        this.timestamp = productData.timestamp;
        this.stock = productData.stock;
        this.precio = productData.precio;
        this.foto = productData.foto;
        this.codigo = productData.codigo;
        this.descripcion = productData.descripcion;
    }
}